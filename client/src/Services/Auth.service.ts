import axios from "axios";
import { reqClient } from "../Api/ReqClient";
import { routes } from "../Api/Routes";
import { IAutheticateUserResponse, ILoginDto } from "../Types/ILogin";
import { IUserDto } from "../Types/IUser"

export const login = async (loginDto: ILoginDto): Promise<IAutheticateUserResponse> => {
    console.log("loginDto", loginDto)
    return await reqClient.post(routes.login, loginDto).then(res => {

        if (res.data.token) {
            console.log(res.data)

            localStorage.setItem("user", JSON.stringify(res.data))
        }

        return res.data;
    })
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const register = async (userDto: IUserDto) => {
    console.log('userDto', userDto)
    return await reqClient.post(routes.register, userDto).then(res => {

        if (res.data.token) {
            console.log(res.data)

            localStorage.setItem("user", JSON.stringify(res.data))
        }

        return res.data;
    });
}

