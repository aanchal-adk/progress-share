import UserModel from '../models/user.model';
import { getHashForText } from '../helpers/encrypt.helper';

class UserService {
  async createUser (first_name: string, last_name: string, username: string, email: string, password: string) {
    const hashedPassword = await getHashForText(password);

    return UserModel.createuser(first_name, last_name, username, email, hashedPassword);
  }
}

export default new UserService();
