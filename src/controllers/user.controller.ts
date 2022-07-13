import UserService from '../services/user.service';
import { Request, Response } from 'express';

class UserController {
  async createUser (req: Request, res: Response) {

    const {first_name, last_name, username, email, password} = req.body;
    try {
      const result = await UserService.createUser(first_name, last_name, username, email, password);
      
      res.status(201).json(result);

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error creating user account.";
      res.status(500).json(message);
    }
  }
}

export default new UserController();
