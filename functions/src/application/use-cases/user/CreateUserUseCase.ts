import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    return this.userRepository.create({ email });
  }
}
