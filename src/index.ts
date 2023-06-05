import 'reflect-metadata';
import express from 'express';
import expressWs from 'express-ws';
const app = express();
const { getWss } = expressWs(app);
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import xss from 'xss-clean';
import loaders from './api/v1/loaders';
import routes from './api/v1/routes';
import rateLimiter from 'express-rate-limit';
import { errorHandlerMiddleware } from './api/v1/middlewares/errors/error_handler.middleware';
import NotFoundError from './api/v1/errors/not_found.error';

/*app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
);*/

app.use(helmet());
app.use(cors());
app.use(xss());

app.use(morgan('tiny'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
    (req as any).getWss = getWss;
    next();
});
app.use('/v1', routes);
app.use('*', () => {
    throw new NotFoundError();
});
app.use(errorHandlerMiddleware);

const PORT: Number = Number(process.env.PORT) || 3000;
app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);

    try {
        await loaders();
    } catch (e) {
        //console.log(e);
    }
});