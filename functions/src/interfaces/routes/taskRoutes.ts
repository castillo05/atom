import { Router, Request, Response } from 'express';
import { TaskController } from '../controllers/TaskController';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { taskValidators } from '../../utils/validators';
import { validateRequest } from '../../utils/validateRequest';
import { authenticate } from '../../middleware/auth';

export const createTaskRoutes = (taskRepository: ITaskRepository): Router => {
  const router = Router();
  const taskController = new TaskController(taskRepository);

  router.get(
    '/user/:userId',
    authenticate,
    taskValidators.getTasks,
    validateRequest,
    (req: Request, res: Response) => taskController.getTasks(req, res)
  );

  router.post(
    '/',
    authenticate,
    taskValidators.create,
    validateRequest,
    (req: Request, res: Response) => taskController.createTask(req, res)
  );

  router.put(
    '/:id',
    authenticate,
    taskValidators.update,
    validateRequest,
    (req: Request, res: Response) => taskController.updateTask(req, res)
  );

  router.delete(
    '/:id',
    authenticate,
    taskValidators.delete,
    validateRequest,
    (req: Request, res: Response) => taskController.deleteTask(req, res)
  );

  return router;
};
