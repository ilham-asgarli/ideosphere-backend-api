import express, { Application } from 'express'
import path from 'path'
import loaders from './loaders'
import routes from './routes'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

const app: Application = express()

app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', routes)

loaders()

const PORT: Number = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})