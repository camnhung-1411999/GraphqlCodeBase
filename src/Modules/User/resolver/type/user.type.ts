/* eslint-disable arrow-parens */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/semi */
import { Field, ObjectType } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { ObjectId } from 'mongodb';
import { AuthToken } from './authToken.type';
import { ObjectIdScalar } from '../../../../Scalars/ObjectId.scalars';
import { SortOrder } from '../../../../Scalars/Sort.type';
import { Error } from '../../../../Scalars/Error.type';

@ObjectType()
export class User {
  @Field(() => ObjectIdScalar)
  readonly id: ObjectId;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => AuthToken, { nullable: true })
  tokens: AuthToken;

  @Field(() => User)
  createdBy: User;

  @Field(() => User)
  updatedBy: User;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class UserPayload {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => [Error], { nullable: true })
  errors: [Error] | null
}

@ObjectType()
export class UserPayloads {
  @Field(() => [User], { nullable: true })
  users: [User];

  @Field(() => SortOrder)
  sortOrder: SortOrder;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null
}

@ObjectType()
export class DeleteUserPayload {
  @Field(() => Number)
  count: number;

  @Field(() => [Error], { nullable: true })
  errors: [Error] | null;
}
