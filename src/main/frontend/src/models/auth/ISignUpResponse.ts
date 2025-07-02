import {IUser} from "../IUser";

export interface ISignUpResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
    userId: number;
}
