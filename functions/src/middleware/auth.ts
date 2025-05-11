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

    // Intentamos verificar como token de ID
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      Object.assign(req, { user: decodedToken });
      next();
      return;
    } catch (idTokenError) {
      // Si falla, intentamos verificar como token personalizado
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new AppError(401, 'Invalid token format');
        }

        const payloadB64 = parts[1];
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());

        if (!payload.uid) {
          throw new AppError(401, 'Invalid token payload');
        }

        Object.assign(req, {
          user: {
            uid: payload.uid,
            email: payload.claims?.email
          }
        });
        next();
        return;
      } catch (customTokenError) {
        if (customTokenError instanceof AppError) {
          throw customTokenError;
        }
        throw new AppError(401, 'Invalid token');
      }
    }
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(401, 'Invalid token'));
    }
  }
};
