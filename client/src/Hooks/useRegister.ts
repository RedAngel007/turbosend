import { register } from '../Services/Auth.service';
import { useMutation } from 'react-query';
import { IUserDto } from '../Types/IUser';

export const useRegister =() => {
    return useMutation((data: IUserDto) => register(data));
}