import { login } from "../Services/Auth.service";
import { useMutation } from "react-query";
import { ILoginDto } from "../Types/ILogin";

export const useLogin = () => {
    return useMutation((data: ILoginDto) => login(data));
}