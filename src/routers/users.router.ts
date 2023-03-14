import { Router as router } from 'express';
import { UsersController } from '../controller/users.controller.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

const debug = createDebug('RM:router');

export const usersRouter = router();
const repoUsers = UsersMongoRepo.getInstance();
const controller = new UsersController(repoUsers);

debug('Users Router');
// TEMP usersRouter.get('/', logged, controller.getAll.bind(controller));
usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
// TEMP usersRouter.patch('/addfav/:id', controller.addFav.bind(controller));
// TEMP usersRouter.patch('/deletefav/:id', controller.deleteFav.bind(controller));
