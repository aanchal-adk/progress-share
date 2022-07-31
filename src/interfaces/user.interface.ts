export interface UserInterface {
  id: number;
  first_name: string; 
  last_name: string; 
  username: string; 
  email: string;
  password: string;
  is_email_verified: boolean;
  is_active: boolean;
  points: number;
};

export interface UserInfo {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  userid: number;
  points: number;
}

export interface LoginResponseInterface {
  accessToken: string;
  refreshToken: string;
};

export interface TokenPayloadInterface {
  userid: number,
  email: string
};

export interface DecodedTokenPayloadInterface {
  userid: number,
  email: string,
  iat: number;
  exp: number;
};
