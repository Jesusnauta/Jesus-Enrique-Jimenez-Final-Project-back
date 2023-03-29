import createDebug from 'debug';
import { NextFunction, Response } from 'express';
import { HTTPError } from '../errors/errors.js';
import { PlayersMongoRepo } from '../repository/players.mongo.repo.js';
import { RequestPlus } from './interceptors.js';

const debug = createDebug('RM:interceptor-authorized');

export async function authorized(
  req: RequestPlus,
  _resp: Response,
  next: NextFunction,
  playersRepo: PlayersMongoRepo
) {
  debug('Authorization...');
  try {
    if (!req.info)
      throw new HTTPError(
        498,
        'Token not found',
        'Token not found in Authorized interceptor'
      );

    const userId = req.info.id;
    const playerId = req.params.id;
    const player = await playersRepo.queryId(playerId);

    debug('Player', player.creator);
    debug('User', userId);
    if (player.creator.id !== userId)
      throw new HTTPError(401, 'Not authorized', 'Not authorized');
    next();
  } catch (error) {
    next(error);
  }
}
