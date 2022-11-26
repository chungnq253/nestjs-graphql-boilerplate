import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      email: 'john@gmail.com',
      password: 'changeme',
    },
    {
      id: 2,
      email: 'maria@gmail.com',
      password: 'guess',
    },
    {
      id: 2,
      email: 'chungnq253@gmail.com',
      password: 'depzailuan',
    },
  ];

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
  }

  findOne(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
