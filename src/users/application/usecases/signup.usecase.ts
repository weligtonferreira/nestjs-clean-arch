import type { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserEntity } from '@/users/domain/entities/user.entity';
import type { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../errors/bad-request-error';

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export type SignupOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export class SignupUseCase {
  constructor(
    private userRespository: UserRepository.Repository,
    private hashProvider: HashProvider,
  ) {}

  async execute(input: SignupInput): Promise<SignupOutput> {
    const requiredFields: (keyof SignupInput)[] = ['name', 'email', 'password'];

    const missing = requiredFields.filter(field => !input[field]);

    if (missing.length > 0) {
      throw new BadRequestError(`Missing fields: ${missing.join(', ')}`);
    }

    await this.userRespository.findByEmail(input.email);

    const hashPassword = await this.hashProvider.generateHash(input.password);

    const entity = new UserEntity({ ...input, password: hashPassword });

    await this.userRespository.insert(entity);

    return entity.toJSON();
  }
}
