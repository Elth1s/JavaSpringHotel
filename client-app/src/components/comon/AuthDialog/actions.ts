import { Dispatch } from "react"
import http from "../../../http_comon"
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import {
    IUser,
    AuthAction,
    ILoginModel,
    IAuthResponse,
    IRegisterModel,
    AuthActionTypes,
    LoginServerError,
    RegisterServerError
} from "./types";


export const LoginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            let response = await http.post('api/auth/login', { username: data.email, password: data.password })
            const token = response.data;
            localStorage.token = token;
            AuthUser(token, dispatch);
            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<LoginServerError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}

export const RegisterUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            let response = await http.post<string>('api/auth/register', { username: data.email, password: data.password, fullName: data.fullname })
            const token = response.data;
            localStorage.token = token;
            AuthUser(token, dispatch);
            return Promise.resolve();
        }
        catch (error) {
            // dispatch({ type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error" })
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<RegisterServerError>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response);
                }
            }
            return Promise.reject(error)
        }
    }
}

export const LogoutUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({ type: AuthActionTypes.AUTH_LOGOUT });
        localStorage.removeItem("token")
    }
}

export const AuthUser = (token: string, dispatch: Dispatch<AuthAction>) => {
    const user = jwt_decode(token) as IUser;
    dispatch({
        type: AuthActionTypes.AUTH_SUCCESS,
        payload: { username: user.username, fullname: user.fullname }
    })
}