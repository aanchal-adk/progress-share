require('dotenv').config();
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

import { getJwt } from  '../helpers/jwt.helper';
import UserService from '../services/user.service';
import { UserInfo } from '../interfaces/user.interface';

class UserController {
  async createUser (req: Request, res: Response) {

    const {first_name, last_name, username, email, password} = req.body;

    try {
      const id = await UserService.createUser(first_name, last_name, username, email, password);

      const userId = id;

      const confirmationCode = getJwt({userId});
      const confirmUrl = process.env.BASE_URL + `/confirmation-code/${confirmationCode}`;

      const mailOptions: nodemailer.SendMailOptions = {
        to: email,
        subject: 'Progress Share: Confirm Email',
        html: `<p>Please click this link to confirm your email: <a href="${confirmUrl}">${confirmUrl}</a></p>`,
      };
      
      res.locals.transporter.sendMail(mailOptions);
      
      res.status(201).json(id);

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error creating user account.";
      res.status(500).json(message);
    }
  }

  async confirmUserEmail (req: Request, res: Response) {

    const {token} = req.params;
    try {
      const result = await UserService.confirmUserEmailAndActivate(token);

      // res.status(200).json();
      res.status(200);
      res.set('Content-Type', 'text/html');
      res.send(Buffer.from('<h2>Your email has been confirmed successfully. You can now go to our signin page and login.</h2>'));

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error updating user account.";
      res.status(500);
      res.set('Content-Type', 'text/html');
      res.send(Buffer.from('<h2>Your email could not be confirmed.</h2>'));
    }
  }

  async login (req: Request, res: Response) {

    const {email,  password} = req.body;
    
    try {
      const result = await UserService.login(email, password);

      res.status(200).json(result);

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error logging in to the account.";
      res.status(500).json(message);
    }
  }

  async refreshToken (req: Request, res: Response) {
    const { refreshToken } = req.body;

    try {
      const token = await UserService.refreshToken(refreshToken);

      res.status(200).json({
        accessToken: token
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error refreshing the token.";

      res.status(401).json(message);
    }

  }

  async getUserInfo (req: Request, res: Response) {
    try {
      const result = await UserService.getUserInfo(res.locals.userEmail as string);

      const responseData: UserInfo = {
        firstName: result.first_name,
        lastName: result.last_name,
        username: result.username,
        email: result.email,
        userid: result.id,
        points: result.points
      }

      return res.status(200).json(responseData);

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error fetching user info.";
      res.status(500).json(message);
    }
  }
}

export default new UserController();
