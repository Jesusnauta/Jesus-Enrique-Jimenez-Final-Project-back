import { Users } from '../entities/users';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface';
import { UserModel } from './users.mongo.models.js';
import createDebug from 'debug';

const debug = createDebug('GW:users-repo');

export class UsersMongoRepo implements Repo<Users> {
  constructor() {
    debug('users-repo-instanced');
  }

  async query(): Promise<Users[]> {
    debug('query-method');
    const data = await UserModel.find().populate('players').exec();
    return data;
  }

  async queryId(id: string): Promise<Users> {
    debug('queryID-method');
    const data = await UserModel.findById(id).populate('players').exec();
    if (!data) throw new HTTPError(404, 'Not found', 'ID not found in queryID');
    return data;
  }

  async create(user: Partial<Users>): Promise<Users> {
    debug('create-method');
    const data = await UserModel.create(user);
    return data;
  }

  async update(user: Partial<Users>): Promise<Users> {
    debug('update-method');
    const data = await UserModel.findByIdAndUpdate(user.id, user, {
      new: true,
    })
      .populate('players')
      .exec();
    if (!data) throw new HTTPError(404, 'Not found', 'ID not found in update');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('delete-method');
    const data = await UserModel.findByIdAndDelete(id).exec();
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: ID not found'
      );
  }

  async search(query: { key: string; value: unknown }) {
    debug('search-method');
    const data = await UserModel.find({ [query.key]: query.value })
      .populate('players')
      .exec();
    return data;
  }
}
