import {
  Resolver, Query, Extensions, Ctx, Arg, Mutation,
} from 'type-graphql';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { UserPayload, UserPayloads } from './type/user.type';
import UserHandler from '../../service/user.service';
import {
  UserInputType,
} from './type/user.input';
import { AWSS3Uploader } from '../../../../App/AWS';
import { IUser } from '../../service/user.model';

@Resolver()
export class UserResolver {
  @Query(() => UserPayload)
  @Extensions({
    authenticate: true,
  })
  async findUser(
    @Arg('data', { nullable: true }) input: UserInputType,
      @Ctx() { userService }: { userService: UserHandler }
  ): Promise<UserPayload> {
    const { username } = input;
    const user = await userService.find(username);

    return {
      user: null,
      errors: null,
    };
  }

  @Mutation(() => UserPayload)
  @Extensions({
    authenticate: true,
    authenCustomer: false,
    validationSchema: yup.object().shape({
      data: yup.object().shape({
        email: yup
          .string()
          .trim()
          .required('Email is a required field.')
          .email('Email field should contain a valid email.'),
        username: yup
          .string()
          .trim()
          .required('Username is a required field.')
          .min(8, 'Username should at least be 8 characters.')
          .max(20, 'Username should be 20 characters at most.'),
        password: yup
          .string()
          .trim()
          .required('Password is a required field.')
          .min(8, 'Password should at least be 8 characters.')
          .max(50, 'Password should be 50 characters at most.'),
      }),
    }),
  })
  async createUser(
    @Arg('data') input: UserInputType,
      @Ctx() {
        userService, logger, s3Uploader, user,
      }: { userService: UserHandler; logger: any;
        s3Uploader: AWSS3Uploader; user: IUser;
      }
  ): Promise<UserPayload> {
    // if (input.profile.picture) {
    //   const { url }: { url: string } = await s3Uploader.fileUploadResolver('user/picture', input.profile.picture);
    //   profile.setPicture(url);
    // }
    return {
      user: null,
      errors: null,
    };
  }
}
