import db from '../db/db';
import { DB_ERROR_DUP_KEY } from '../constants';

class UserModel {
  async createUser (first_name: string, last_name:string, username: string, email: string, hashedPassword: string) {
    let result: number[];

    try {
      result = await db('users')
      .insert({
        password: hashedPassword,
        first_name,
        last_name,
        username,
        email,
      });
    } catch (err: any) {
      if (err.errno === DB_ERROR_DUP_KEY) {
        if (err.sqlMessage.includes('users.users_email_unique')) {
          throw new Error("An account with the same email already exists. Please use a different email.");
        } else if (err.sqlMessage.includes('users.users_username_unique')) {
          throw new Error("An account with the same username already exists. Please use a different username.");
        } else {
          throw new Error("An account with the same email or username already exists. Please make sure these are unique.");
        }
      } else {
        throw new Error("Error creating user account. Please try again later.");

      }
    }
    
    return result;
  }

  async updateUserVerifiedActivatedInfo (userId: number, isEmailVerified: boolean, isActive: boolean) {
    let result: number[];

    try {
      result = await db('users')
      .where({id: userId})
      .update({
        'is_email_verified': isEmailVerified,
        'is_active': isActive
      });

    } catch (err: any) {

        throw new Error("Error updating user account. Please try again later.");
    }
    
    return result;
  }
}

export default new UserModel();
