import { Router as router } from 'express';
import { PlayersController } from '../controller/players.controller.js';
import createDebug from 'debug';
import { PlayersMongoRepo } from '../repository/players.mongo.repo.js';
import { Interceptors } from '../interceptors/interceptors.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

const debug = createDebug('RM:router:players');
debug('players-router');

export const playersRouter = router();
const playersRepo = new PlayersMongoRepo();
const usersRepo = new UsersMongoRepo();
const controller = new PlayersController(playersRepo, usersRepo);

playersRouter.get('/', controller.getAll.bind(controller));
playersRouter.get('/:id', controller.get.bind(controller));
playersRouter.post(
  '/create',
  Interceptors.logged,
  controller.create.bind(controller)
);
playersRouter.patch(
  '/edit',
  Interceptors.logged,
  controller.patch.bind(controller)
);
playersRouter.delete(
  '/:id',
  Interceptors.logged,
  controller.delete.bind(controller)
);
