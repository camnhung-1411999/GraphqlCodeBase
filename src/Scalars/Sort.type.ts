/* eslint-disable max-classes-per-file */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class SortOrder {
  @Field(() => Number, { nullable: true })
  offset: number;

  @Field(() => Number, { nullable: true })
  limit: number;

  @Field(() => String, { nullable: true })
  sortOrderBy: string;

  @Field(() => String, { nullable: true })
  typeSortBy: string;

  @Field(() => Number, { nullable: true })
  total: number;
}

@InputType()
export class SortOrderInput {
  @Field(() => Number, { nullable: true })
  offset: number;

  @Field(() => Number, { nullable: true })
  limit: number;

  @Field(() => String, { nullable: true })
  sortOrderBy: string;

  @Field(() => String, { nullable: true })
  typeSortBy: string;
}
