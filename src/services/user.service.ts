import UserModel from '../models/user.model';
import { getJwt, verifyJwt } from  '../helpers/jwt.helper';
import { getHashForText, comparePlainAndHash } from '../helpers/encrypt.helper';
import UserInterface, { LoginResponseInterface } from '../interfaces/user.interface';

class UserService {
  async createUser (first_name: string, last_name: string, username: string, email: string, password: string) {
    const hashedPassword = await getHashForText(password);

    return UserModel.createUser(first_name, last_name, username, email, hashedPassword);
  }

  async confirmUserEmailAndActivate (token: string) {
    try {
      const decodedPayload = verifyJwt(token);
      
      if (typeof decodedPayload === 'string') {
        throw new Error(`Could not verify the confirmation code. ${decodedPayload}`);
      }

      const {userId} = decodedPayload;

      return UserModel.updateUserVerifiedActivatedInfo(userId, true, true);
    } catch {
      throw new Error('Could not verify the confirmation code. Please resend the confirmation code.');
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

      const tokenPayload = {
        userId: userInfo.id,
        email: userInfo.email
      };
      
      const accessToken = getJwt(tokenPayload, '1h');
      const refreshToken = getJwt(tokenPayload, '30d');

      return {
        accessToken,
        refreshToken
      };
      
    } catch (err) {
      throw new Error('Could not log in successfully. ' + (err instanceof Error && err.message ? err.message: ''));
    }
  }

}

export default new UserService();
