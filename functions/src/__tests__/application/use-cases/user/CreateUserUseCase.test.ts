import { CreateUserUseCase } from '../../../../application/use-cases/user/CreateUserUseCase';
import { IUserRepository } from '../../../../domain/repositories/IUserRepository';
import { User } from '../../../../domain/entities/User';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  it('should create a new user successfully', async () => {
    const email = 'test@example.com';
    const expectedUser: User = {
      id: '123',
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(expectedUser);

    const result = await createUserUseCase.execute(email);

    expect(result).toEqual(expectedUser);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(mockUserRepository.create).toHaveBeenCalledWith({ email });
  });

  it('should throw error if user already exists', async () => {
    const email = 'existing@example.com';
    const existingUser: User = {
      id: '123',
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(createUserUseCase.execute(email)).rejects.toThrow('User already exists');
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});
