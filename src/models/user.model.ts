import db from '../db/db';
import { DB_ERROR_DUP_KEY } from '../constants';
import { UserInterface } from '../interfaces/user.interface';

class UserModel {
  async createUser (first_name: string, last_name:string, username: string, email: string, hashedPassword: string): Promise<number> {
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

      return result[0];
      
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
    
      return result;

    } catch (err: any) {

        throw new Error("Error updating user account. Please try again later.");
    }
    
  }

  async getUserInfo (userEmail: string): Promise<UserInterface> {
    let result: UserInterface[];

    try {
      result = await db('users')
      .select('*')
      .where({email: userEmail});

      if (result.length === 0) {
        throw new Error("Couldn't find matching account");
      }

      return result[0];

    } catch (err: any) {
      throw new Error("Error finding matching account");
    }
  }
}

export default new UserModel();
