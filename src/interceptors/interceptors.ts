import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/errors.js';
import { Auth, TokenPayload } from '../helpers/auth.js';
import createDebug from 'debug';

const debug = createDebug('RM:interceptors');

export interface RequestPlus extends Request {
  info?: TokenPayload;
}

export abstract class Interceptors {
  static logged(req: RequestPlus, _resp: Response, next: NextFunction) {
    try {
      debug('Logged');

      const authHeader = req.get('Authorization');

      if (!authHeader)
        throw new HTTPError(498, 'Invalid Token', 'Not value in auth header');

      if (!authHeader.startsWith('Bearer'))
        throw new HTTPError(498, 'Invalid Token', 'Not Bearer in auth header');

      const token = authHeader.slice(7);

      const payload = Auth.verifyJWT(token);

      req.info = payload;

      next();
    } catch (error) {
      next(error);
    }
  }
}
