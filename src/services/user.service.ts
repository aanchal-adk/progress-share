import UserModel from '../models/user.model';
import { verifyJwt } from  '../helpers/jwt.helper';
import { getHashForText } from '../helpers/encrypt.helper';

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
}

export default new UserService();
