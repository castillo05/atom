import { ITaskRepository } from '../../../domain/repositories/ITaskRepository';
import { Task } from '../../../domain/entities/Task';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: {
    userId: string;
    title: string;
    description: string;
  }): Promise<Task> {
    return this.taskRepository.create({
      ...data,
      completed: false,
    });
  }
}
