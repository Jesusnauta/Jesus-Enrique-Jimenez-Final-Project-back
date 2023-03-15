import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { usersRouter } from './routers/users.router.js';
import createDebug from 'debug';
import { middleware } from './middlewares/middlewares.js';
import { playersRouter } from './routers/players.router.js';

const debug = createDebug('RM:app');

export const app = express();

const corsOptions = {
  origin: '*',
};

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

// Tapp.use(express.static(path.resolve('public')));

app.use('/users', usersRouter);
app.use('/players', playersRouter);

app.use(middleware);

app.use('*', (_req, resp, next) => {
  resp.status(404).send(`<h1>Sorry, the path is not valid<h1>`);
  next();
});
