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

export interface LoginResponseInterface {
  accessToken: string;
  refreshToken: string;
};

export interface TokenPayloadInterface {
  userId: number,
  email: string
};

export interface DecodedTokenPayloadInterface {
  userId: number,
  email: string,
  iat: number;
  exp: number;
};
