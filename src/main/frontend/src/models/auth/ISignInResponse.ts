import {IUser} from "../IUser";

export interface ISignInResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
    userId: number;
}
