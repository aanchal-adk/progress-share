import {Request, Response, NextFunction} from 'express';

import { verifyJwt } from '../helpers/jwt.helper';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token found in the request.');
    }

    const decodedData = verifyJwt(token);

    if (!decodedData) {
      throw new Error('Invalid token in the request.');
    }

    if (typeof decodedData === 'string') {
      throw new Error(decodedData);
    }

    const {userid, email} = decodedData;
    // add userid and email to res.locals so that it can be accessed in the next middlewares
    res.locals.userid = userid;
    res.locals.userEmail = email;
    next();

  } catch (err) {
    const message = err instanceof Error ? err.message : "Error authenticating.";

    res.status(401).json(message);
  }
}

export default authenticate;
