import axios from "axios";
import { getApiENV } from "./Config";

export const reqClient  = axios.create({
    baseURL: getApiENV('dev'),
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
})