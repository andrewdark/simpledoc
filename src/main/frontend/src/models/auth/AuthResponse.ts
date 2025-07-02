import {IUser} from "../IUser";

export interface AuthResponse {
    userId: number;
    user: IUser;
    accessToken: string;
    refreshToken: string;
}
