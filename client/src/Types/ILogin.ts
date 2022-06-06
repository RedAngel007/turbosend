export interface ILoginDto {
    username: string;
    password: string;
}

export interface IAutheticateUserResponse {
    token: string;
    expiresIn: number;
    email: string;
    name: string;
}