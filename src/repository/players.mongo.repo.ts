import { Players } from '../entities/players';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface';
import { PlayersModel } from './players.mongo.models.js';
import createDebug from 'debug';
const debug = createDebug('RM:repo:players');

export class PlayersMongoRepo implements Repo<Players> {
  constructor() {
    debug('players-repo-instanced');
  }

  async query(): Promise<Players[]> {
    debug('query');
    const data = await PlayersModel.find()
      .populate('creator', { players: 0 })
      .exec();
    return data;
  }

  async queryId(id: string): Promise<Players> {
    debug('queryId');
    const data = await PlayersModel.findById(id)
      .populate('creator', { players: 0 })
      .exec();
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async search(query: { key: string; value: unknown }): Promise<Players[]> {
    debug('search');
    const data = await PlayersModel.find({ [query.key]: query.value })
      .populate('creator', { players: 0 })
      .exec();
    return data;
  }

  async create(player: Partial<Players>): Promise<Players> {
    debug('create');
    const data = await PlayersModel.create(player);
    return data;
  }

  async update(info: Partial<Players>): Promise<Players> {
    debug('update');
    const data = await PlayersModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });

    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in update');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('delete');
    const data = await PlayersModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(404, 'Not found', 'Delete not posible: id not found');
  }
}
