import { Response, Request, NextFunction } from 'express';

import { Repo } from '../repository/repo.interface.js';
import { Players } from '../entities/players.js';
import createDebug from 'debug';
import { RequestPlus } from '../interceptors/interceptors.js';
import { Users } from '../entities/users.js';
const debug = createDebug('RM:controller:players');

export class PlayersController {
  constructor(public repo: Repo<Players>, public repoUsers: Repo<Users>) {
    debug('Instantiate');
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll');
      const data = await this.repo.query();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('get');
      const data = await this.repo.queryId(req.params.id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async post(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('post');
      // TEMP Const userId = req.info?.id;
      // if (!userId) throw new HTTPError(404, 'Not found', 'Not found user id');
      // const actualUser = await this.repoUsers.queryId(userId);
      // req.body.creator = userId;
      const newPlayer = await this.repo.create(req.body);
      // ActualUser.players.push(newPlayer);
      // this.repoUsers.update(actualUser);
      resp.json({
        results: [newPlayer],
      });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('patch');
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('delete');
      await this.repo.delete(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
