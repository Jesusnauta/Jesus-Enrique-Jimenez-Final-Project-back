import createDebug from 'debug';
import { UserStructure } from '../entities/users';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface';
import { UserModel } from './users.mongo.models.js';
const debug = createDebug('RM:repo:users');

export class UsersMongoRepo implements Repo<UserStructure> {
  private static instance: UsersMongoRepo;

  public static getInstance(): UsersMongoRepo {
    if (!UsersMongoRepo.instance) {
      UsersMongoRepo.instance = new UsersMongoRepo();
    }

    return UsersMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiate');
  }

  async query(): Promise<UserStructure[]> {
    debug('query');
    const data = await UserModel.find().populate('players', { creator: 0 });
    return data;
  }

  async queryId(id: string): Promise<UserStructure> {
    debug('queryId');
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async search(query: {
    key: string;
    value: unknown;
  }): Promise<UserStructure[]> {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }

  async create(info: Partial<UserStructure>): Promise<UserStructure> {
    debug('create');
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<UserStructure>): Promise<UserStructure> {
    debug('update');
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('destroy');
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(404, 'Not found', 'Delete not posible: id not found');
  }
}
