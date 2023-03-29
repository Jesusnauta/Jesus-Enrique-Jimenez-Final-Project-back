import { authorized } from './authorized.js';
import { HTTPError } from '../errors/errors';
import { RequestPlus } from './interceptors.js';
import { Response } from 'express';
import { PlayersMongoRepo } from '../repository/players.mongo.repo.js';

const resp = {} as Response;

const req = {
  info: { id: 'mock-user-id' },
  params: { id: 'mock-player-id' },
} as unknown as RequestPlus;

const mockRepoPlayers = {} as PlayersMongoRepo;

describe('Given Authorized Interceptor', () => {
  describe('When the user is authorized', () => {
    test('Then it should call the next function', async () => {
      mockRepoPlayers.queryId = jest.fn().mockResolvedValue({
        creator: { id: 'mock-user-id' },
      });

      const next = jest.fn();
      await authorized(req, resp, next, mockRepoPlayers);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the user is not authorized', () => {
    test('Then it should throw an HTTPError', async () => {
      mockRepoPlayers.queryId = jest.fn().mockResolvedValue({
        creator: { id: 'different-user-id' },
      });
      const next = jest.fn();
      await authorized(req, resp, next, mockRepoPlayers);
      expect(next).toHaveBeenCalledWith(expect.any(HTTPError));
    });

    describe('When the token is not found', () => {
      test('Then it should throw an HTTPError', async () => {
        const next = jest.fn();
        delete req.info;
        await authorized(req, resp, next, mockRepoPlayers);
        expect(next).toHaveBeenCalledWith(expect.any(HTTPError));
      });
    });
  });
});
