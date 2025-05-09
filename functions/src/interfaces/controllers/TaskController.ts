import { Request, Response } from 'express';
import { GetTasksUseCase } from '../../application/use-cases/task/GetTasksUseCase';
import { CreateTaskUseCase } from '../../application/use-cases/task/CreateTaskUseCase';
import { UpdateTaskUseCase } from '../../application/use-cases/task/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/use-cases/task/DeleteTaskUseCase';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class TaskController {
  private getTasksUseCase: GetTasksUseCase;
  private createTaskUseCase: CreateTaskUseCase;
  private updateTaskUseCase: UpdateTaskUseCase;
  private deleteTaskUseCase: DeleteTaskUseCase;

  constructor(taskRepository: ITaskRepository) {
    this.getTasksUseCase = new GetTasksUseCase(taskRepository);
    this.createTaskUseCase = new CreateTaskUseCase(taskRepository);
    this.updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    this.deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      console.log('Getting tasks for user:', userId);
      const tasks = await this.getTasksUseCase.execute(userId);
      console.log('Tasks found:', tasks);
      res.json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { userId, title, description } = req.body;

      if (!userId || !title || !description) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const task = await this.createTaskUseCase.execute({
        userId,
        title,
        description,
      });

      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const task = await this.updateTaskUseCase.execute(id, {
        title,
        description,
        completed,
      });

      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteTaskUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting task:', error);
      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
