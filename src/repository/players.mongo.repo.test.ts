import { Players } from '../entities/players';
import { PlayersModel } from './players.mongo.models';
import { PlayersMongoRepo } from './players.mongo.repo';

jest.mock('./players.mongo.models');

describe('Given the repository PlayersMongoRepo', () => {
  const repo = new PlayersMongoRepo();

  const mockPopulateFunction = (mockPopulateValue: unknown) => ({
    populate: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(mockPopulateValue),
    })),
  });

  describe('When the repository is instanced', () => {
    test('Then, the repo should be instance of UsersMongoRepo', () => {
      expect(repo).toBeInstanceOf(PlayersMongoRepo);
    });
  });

  describe('When the query method is used', () => {
    test('Then it should return the mock result of the users', async () => {
      const mockPopulateValue = [{ id: '1' }, { id: '2' }];

      (PlayersModel.find as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockPopulateValue)
      );

      const result = await repo.query();
      expect(result).toEqual([{ id: '1' }, { id: '2' }]);
    });
  });

  describe('When the queryId method is used', () => {
    test('Then if the findById method resolve value to an object, it should return the object', async () => {
      const mockPopulateValue = { id: '1' };

      (PlayersModel.findById as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockPopulateValue)
      );

      const result = await repo.queryId('1');
      expect(PlayersModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });

    test('Then if the findById method resolve value to null, it should throw an Error', async () => {
      const mockPopulateValue = null;

      (PlayersModel.findById as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockPopulateValue)
      );

      expect(async () => repo.queryId('')).rejects.toThrow();
    });
  });

  describe('When the create method is used', () => {
    let mockExecValue: unknown;
    const mockExec = () => ({
      exec: jest.fn().mockResolvedValue(mockExecValue),
    });

    test('Then if it has an object to create with its ID, the findByIdAndDelete function should be called', async () => {
      mockExecValue = {};

      (PlayersModel.create as jest.Mock).mockResolvedValue({});
      await repo.create({});
      expect(PlayersModel.create).toHaveBeenCalled();
    });

    test('Then if the findByIdAndDelete method resolve value to undefined, it should throw an Error', async () => {
      mockExecValue = null;

      (PlayersModel.create as jest.Mock).mockImplementation(mockExec);
    });
  });
  describe('When the update method is used', () => {
    const mockUser = {
      position: 'test',
    } as Partial<Players>;

    test('Then if the findByIdAndUpdate method resolve value to an object, it should return the object', async () => {
      const mockPopulateValue = { position: 'test' };

      (PlayersModel.findByIdAndUpdate as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockPopulateValue)
      );

      const result = await repo.update(mockUser);
      expect(result).toEqual({ position: 'test' });
    });

    test('Then if the findByIdAndUpdate method resolve value to null, it should throw an Error', async () => {
      const mockPopulateValue = null;

      (PlayersModel.findByIdAndUpdate as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockPopulateValue)
      );

      expect(async () => repo.update(mockUser)).rejects.toThrow();
    });
  });

  describe('When the delete method is used', () => {
    let mockExecValue: unknown;
    const mockExec = () => ({
      exec: jest.fn().mockResolvedValue(mockExecValue),
    });

    test('Then if it has an object to delete with its ID, the findByIdAndDelete function should be called', async () => {
      mockExecValue = {};

      (PlayersModel.findByIdAndDelete as jest.Mock).mockImplementation(
        mockExec
      );
      await repo.delete('1');
      expect(PlayersModel.findByIdAndDelete).toHaveBeenCalled();
    });

    test('Then if the findByIdAndDelete method resolve value to undefined, it should throw an Error', async () => {
      mockExecValue = null;

      (PlayersModel.findByIdAndDelete as jest.Mock).mockImplementation(
        mockExec
      );
    });
  });

  describe('When the search method is used', () => {
    test('Then if it has an mock query object, it should return find resolved value', async () => {
      const mockPopulateValue = [{ id: '1' }];

      (PlayersModel.find as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockPopulateValue)
      );

      const mockQuery = { key: 'test', value: 'test' };
      const result = await repo.search(mockQuery);
      expect(result).toEqual([{ id: '1' }]);
    });
  });
});
