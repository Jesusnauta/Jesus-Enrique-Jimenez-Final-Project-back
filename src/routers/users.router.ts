import { Router as router } from 'express';
import { UsersController } from '../controller/users.controller.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';
import { PlayersMongoRepo } from '../repository/players.mongo.repo.js';

const debug = createDebug('RM:router');
debug('users-router');

export const usersRouter = router();
const usersRepo = new UsersMongoRepo();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const playersRepo = new PlayersMongoRepo();
const controller = new UsersController(usersRepo);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
