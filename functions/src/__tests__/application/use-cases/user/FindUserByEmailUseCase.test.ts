import { FindUserByEmailUseCase } from
  '../../../../application/use-cases/user/FindUserByEmailUseCase';
import { IUserRepository } from '../../../../domain/repositories/IUserRepository';
import { User } from '../../../../domain/entities/User';

describe('FindUserByEmailUseCase', () => {
  let findUserByEmailUseCase: FindUserByEmailUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
    };

    findUserByEmailUseCase = new FindUserByEmailUseCase(mockUserRepository);
  });

  it('should return user if found', async () => {
    const email = 'test@example.com';
    const expectedUser: User = {
      id: '123',
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUserRepository.findByEmail.mockResolvedValue(expectedUser);

    const result = await findUserByEmailUseCase.execute(email);

    expect(result).toEqual(expectedUser);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should return null if user not found', async () => {
    const email = 'nonexistent@example.com';

    mockUserRepository.findByEmail.mockResolvedValue(null);

    const result = await findUserByEmailUseCase.execute(email);

    expect(result).toBeNull();
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
  });
});
