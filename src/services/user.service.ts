require('dotenv').config();
import UserModel from '../models/user.model';
import { getJwt, verifyJwt } from  '../helpers/jwt.helper';
import { getHashForText, comparePlainAndHash } from '../helpers/encrypt.helper';
import { 
  UserInterface,
  TokenPayloadInterface,
  LoginResponseInterface,
  DecodedTokenPayloadInterface
} from '../interfaces/user.interface';

class UserService {
  async createUser (first_name: string, last_name: string, username: string, email: string, password: string): Promise<number> {
    const hashedPassword = await getHashForText(password);

    return UserModel.createUser(first_name, last_name, username, email, hashedPassword);
  }

  async confirmUserEmailAndActivate (token: string) {
    try {
      const decodedPayload = verifyJwt(token);
      
      if (typeof decodedPayload === 'string') {
        throw new Error(decodedPayload);
      }

      const {userId} = decodedPayload;

      return UserModel.updateUserVerifiedActivatedInfo(userId, true, true);

    } catch (err) {
      throw new Error('Could not verify the confirmation code.' + (err instanceof Error ? err.message : ''));
    }

  }

  async login (email: string, password: string): Promise<LoginResponseInterface> {
    try {
      const userInfo: UserInterface = await UserModel.getUserInfo(email);

      const doesMatch = await comparePlainAndHash(password, userInfo.password);
      
      if (!doesMatch) {
        throw new Error('The password doesn not match');
      }

      if (!userInfo.is_email_verified) {
        throw new Error("User's email is not verified yet.")
      }

      if (!userInfo.is_active) {
        throw new Error('User is inactive');
      }

      const tokenPayload: TokenPayloadInterface = {
        userid: userInfo.id,
        email: userInfo.email
      };
      
      const accessToken = getJwt(tokenPayload, process.env.ACCESS_TOKEN_EXPIRES_IN);
      const refreshToken = getJwt(tokenPayload, process.env.REFRESH_TOKEN_EXPIRES_IN);

      return {
        accessToken,
        refreshToken
      };
      
    } catch (err) {
      throw new Error('Could not log in successfully. ' + (err instanceof Error && err.message ? err.message: ''));
    }
  }

  refreshToken (refreshToken: string): string {
    try {
      const decodedPayload = verifyJwt(refreshToken) as DecodedTokenPayloadInterface | string;

      if (typeof decodedPayload === 'string') {
        throw new Error('Could not decode the payload');
      }

      const tokenPayload: TokenPayloadInterface = {
        email: decodedPayload.email,
        userid: decodedPayload.userid
      };

      const newAccessToken = getJwt(tokenPayload, process.env.ACCESS_TOKEN_EXPIRES_IN);

      return newAccessToken;
      

    } catch (err) {
      throw new Error('Could not refresh token. ' + (err instanceof Error && err.message ? err.message: ''));
    }
  }

}

export default new UserService();
