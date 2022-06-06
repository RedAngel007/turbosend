import { ILoginDto } from "../../Types/ILogin";
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).required('Required'),
    password: Yup.string().min(3).required('Required')
});

export const initialValues = {
    username: '',
    password: ''
} as ILoginDto;