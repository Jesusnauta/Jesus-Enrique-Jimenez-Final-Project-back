import { Router as router } from 'express';
import { UsersController } from '../controller/users.controller.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

const debug = createDebug('RM:router');
debug('users-router');

export const usersRouter = router();
const repoUsers = new UsersMongoRepo();
const controller = new UsersController(repoUsers);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));

// TEMP usersRouter.patch('/addfav/:id', controller.addFav.bind(controller));
// TEMP usersRouter.patch('/deletefav/:id', controller.deleteFav.bind(controller));
