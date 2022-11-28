import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../common/graphql/BaseResolver';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver extends BaseResolver(User) {
  constructor(readonly service: UserService) {
    super(service);
  }
}
