import express, { Application } from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import xss from 'xss-clean'
import loaders from './api/v1/loaders'
import routes from './api/v1/routes'
import rateLimiter from 'express-rate-limit'
import { errorHandlerMiddleware } from './api/v1/middlewares/errors/error_handler.middleware'

loaders()

const app: Application = express()

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
);

app.use(helmet());
app.use(cors());
app.use(xss());

app.use(morgan('tiny'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', routes);
app.use(errorHandlerMiddleware);

const PORT: Number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});