import { Response, Request } from 'express';
import { PlayersController } from './players.controller';
import { UsersMongoRepo } from '../repository/users.mongo.repo';
import { PlayersMongoRepo } from '../repository/players.mongo.repo';

describe('Given PlayersController', () => {
  const repo: PlayersMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    search: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const userRepo = {} as UsersMongoRepo;

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new PlayersController(repo, userRepo);

  describe('When getAll is called', () => {
    const req = {
      body: {},
      params: { id: '' },
    } as unknown as Request;
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should ... if there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When get is called', () => {
    const req = {
      body: {},
      params: { id: '' },
    } as unknown as Request;
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When post is called', () => {
    const req = {
      body: {},
      params: { id: '' },
    } as unknown as Request;
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.post(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When patch is called', () => {
    const req = {
      body: {},
      params: { id: '' },
    } as unknown as Request;
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When delete is called', () => {
    const req = {
      body: {},
      params: { id: '' },
    } as unknown as Request;
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.delete as jest.Mock).mockRejectedValue(new Error());
      await controller.delete(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
