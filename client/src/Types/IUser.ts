import { string } from "yup";

export interface IUserDto {
    firstName: string;
    email: string;
    lastName: string;
    userName: string;
    password: string;
    accessToken: string;
    phoneNumber: string;
    address: string;
    confirmPassword: string;
}