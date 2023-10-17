export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignInInfo {
  userId: string;
  password: string;
}

export interface SignUpInfo {
  name: string;
  userId: string;
  password: string;
}
