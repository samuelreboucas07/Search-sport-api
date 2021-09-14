import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import process from 'process'

export const auth = (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Token não encontrado.');
    }
    
    if (!process.env.SECRET) {
      throw new Error('Impossível validar token.')
    }

    const decodeToken: any = jwt.verify(token, process.env.SECRET);

    const userIdToken = decodeToken.user_id;

    if (request.body.userId && request.body.userId !== userIdToken) {
      throw new Error('Impossível enviar mensagem, por favor realize o login novamente.');
    }

    next();

  } catch (err: any) {
    response.status(401).send(err.message);
  }
};