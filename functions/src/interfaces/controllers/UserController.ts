import { Request, Response } from 'express';
import { FindUserByEmailUseCase } from '../../application/use-cases/user/FindUserByEmailUseCase';
import { CreateUserUseCase } from '../../application/use-cases/user/CreateUserUseCase';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UserController {
  private findUserByEmailUseCase: FindUserByEmailUseCase;
  private createUserUseCase: CreateUserUseCase;

  constructor(userRepository: IUserRepository) {
    this.findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  async findByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      const user = await this.findUserByEmailUseCase.execute(email);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      const user = await this.createUserUseCase.execute(email);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
