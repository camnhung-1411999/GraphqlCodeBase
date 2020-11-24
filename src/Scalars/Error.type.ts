/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Error {
  @Field(type => String, { nullable: true })
  field: string;

  @Field(type => [String], { nullable: true })
  message: [string];
}
