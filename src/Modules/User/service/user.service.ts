import { AuthTokenCollection, IAuthToken } from './auth.model';
import UserCollection, { IUser } from './user.model';
import authUtils from '../../../Utils/auth';

class UserService {
  async list() {
    const users = await UserCollection.find();
    return users;
  }

  async find(input: any) {
    const user = await UserCollection.findOne({
      user: input,
    });
    if (!user) {
      const err: Error = new Error();
      err.message = 'User not found';
      err.name = 'Error';
      throw err;
    }
    return user;
  }

  async detail(input: IUser) {
    const findUser = await UserCollection.findOne({
      user: input.user,
    });
    if (!findUser) {
      const err: Error = new Error();
      err.message = 'NOT_FOUND';
      err.name = 'Error';
      throw err;
    }

    let token: any;
    if (input.password) {
      const isMatch: any = await findUser.comparePassword(input.password);
      if (!isMatch) {
        const err: Error = new Error();
        err.message = 'NOT_MATCH';
        err.name = 'Error';
        throw err;
      }
    }
    // Create Token
    const newAccessToken = await authUtils.generateAccessToken(input);
    const newRefreshToken = await authUtils.generateRefreshToken(input);
    // let kind = find.getService();
    const authToken = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      kind: '',
    };
    return AuthTokenCollection.findOne({ user: findUser.id }).then(
      async (existingUser: IAuthToken | null) => {
        if (existingUser) {
          token = await AuthTokenCollection.findOneAndUpdate(
            { user: findUser.id },
            authToken
          );
        } else {
          token = await AuthTokenCollection.create({
            user: findUser.id,
            ...authToken,
          });
        }
        return {
          user: findUser.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };
      }
    );
  }

  async create(input: IUser) {
    await UserCollection.findOne({
      user: input.user,
    }).then((user) => {
      if (user) {
        const err: Error = new Error();
        err.message = 'USER_EXIST';
        err.name = 'Error';
        throw err;
      }
    });
    const userCreate = new UserCollection({
      user: input.user,
      password: input.password,
      email: input.email,
    });
    await userCreate.save();
    return userCreate;
  }

  async update(input: IUser) {
    const user = await UserCollection.findOne({
      user: input.user,
    });
    if (!user) {
      const error = new Error();
      error.message = ' User not found';
      throw error;
    }
    if (input.password) {
      user.password = input.password;
    }
    await user.save();

    return user;
  }
}

export default UserService;
