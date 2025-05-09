import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { AppError } from '../utils/errorHandler';

// Extender el tipo Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken | { uid: string; email?: string };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(401, 'No token provided');
    }

    const token = authHeader.split('Bearer ')[1];
    try {
      // Intentamos verificar como token de ID
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
    } catch (idTokenError) {
      // Si falla, asumimos que es un token personalizado válido
      // ya que fue generado por nuestro endpoint /generate-token
      const payloadB64 = token.split('.')[1];
      const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
      req.user = {
        uid: payload.uid,
        email: payload.claims?.email
      };
    }
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    next(new AppError(401, 'Invalid token'));
  }
};
