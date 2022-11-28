import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import * as argon2 from 'argon2';
import { Entity, Index, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from '../../common/entity/base';

@ObjectType('User')
@Entity()
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @FilterableField()
  @Column()
  email: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
