/* eslint-disable arrow-parens */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line max-classes-per-file
import { InputType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { GraphQLUpload } from 'graphql-upload';
import { IsEmail } from 'class-validator';
import { ObjectIdScalar } from '../../../../Scalars/ObjectId.scalars';
import { SortOrderInput } from '../../../../Scalars/Sort.type';

@InputType()
export class UserInputType {
  @Field(() => ObjectIdScalar, { nullable: true })
  id: ObjectId;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  password: string;
}
