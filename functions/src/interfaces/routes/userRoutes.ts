import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { userValidators } from '../../utils/validators';
import { validateRequest } from '../../utils/validateRequest';
import { authenticate } from '../../middleware/auth';
import * as admin from 'firebase-admin';

export const createUserRoutes = (userRepository: IUserRepository): Router => {
  const router = Router();
  const userController = new UserController(userRepository);

  // Ruta para generar token de prueba
  router.post('/generate-token', async (req: Request, res: Response): Promise<void> => {
    try {
      const { uid, email } = req.body;
      if (!uid || !email) {
        res.status(400).json({
          error: 'Se requieren los campos uid y email'
        });
        return;
      }

      const token = await admin.auth().createCustomToken(uid, {
        email: email
      });

      res.json({ token });
    } catch (error) {
      console.error('Error detallado al generar token:', error);
      res.status(500).json({
        error: 'Error al generar el token de autenticación',
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  });

  router.post(
    '/find',
    authenticate,
    userValidators.findByEmail,
    validateRequest,
    (req: Request, res: Response) => userController.findByEmail(req, res)
  );

  router.post(
    '/',
    authenticate,
    userValidators.create,
    validateRequest,
    (req: Request, res: Response) => userController.create(req, res)
  );

  return router;
};
