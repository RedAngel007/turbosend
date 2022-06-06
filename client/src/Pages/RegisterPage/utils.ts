import { ILoginDto } from "../../Types/ILogin";
import * as Yup from 'yup';
import { IUserDto } from "../../Types/IUser";

export const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3).required('Required'),
    lastName: Yup.string().min(3).required('Required'),
    password: Yup.string().min(5, 'Password is too short').required('Please enter password').oneOf([Yup.ref('confirmPassword'), 'Passwords must match']),
    email: Yup.string().email().max(255).required('Required'),
    confirmPassword: Yup.string().min(5, 'Password is too short').required('Please re-enter password').oneOf([Yup.ref('password'), 'Passwords must match']),

});

export const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
} as IUserDto;


