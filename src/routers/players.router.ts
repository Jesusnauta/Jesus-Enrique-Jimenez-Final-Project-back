import { Router as router } from 'express';
import { PlayersController } from '../controller/players.controller.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';
import createDebug from 'debug';
import { PlayersMongoRepo } from '../repository/players.mongo.repo.js';

const debug = createDebug('RM:router:players');
debug('players-router');

export const playersRouter = router();
const repoPlayers = new PlayersMongoRepo();
const repoUsers = new UsersMongoRepo();
const controller = new PlayersController(repoPlayers, repoUsers);

playersRouter.post('/create', controller.post.bind(controller));
