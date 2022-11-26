import { Entity, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
// import { Base } from '../../common/entities/base';

@ObjectType()
@Entity()
export class Auth {
  @Field({ nullable: true })
  @Column()
  userId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;
}
