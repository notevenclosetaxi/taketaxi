import {JwtTokens} from '../../auth.interface';
import {User} from '../../user.interface';

export type SignInResponse = JwtTokens;

export type SignUpResponse = User;

export type GetUserResponse = User;
