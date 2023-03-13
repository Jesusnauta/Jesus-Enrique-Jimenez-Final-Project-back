import { Router as router } from 'express';
import { UsersController } from '../controller/users.controller.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

const debug = createDebug('RM:router');

export const usersRouter = router();
const repoUsers = UsersMongoRepo.getInstance();
const controller = new UsersController(repoUsers);

debug('Users Router');

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
