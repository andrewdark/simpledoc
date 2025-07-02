export interface IUser{
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    roleList: string[];
}

export const Role = {
    'ADMIN': 'ROLE_ADMIN',
    'OPERATOR': 'ROLE_OPERATOR',
    "USER": "ROLE_USER",
} as const;
