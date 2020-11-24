/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AuthToken {
  @Field((type) => String)
  accessToken: string;

  @Field((type) => String)
  refreshToken: string;

  @Field((type) => String)
  kind: string;
}
