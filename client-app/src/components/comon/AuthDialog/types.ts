export enum AuthActionTypes {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_LOGOUT = "AUTH_LOGOUT"
}

export interface IUser {
    username: string,
    fullname: string,
}

export interface IAuthResponse {
    token: string,
}

export interface AuthState {
    user: IUser,
    isAuth: boolean,
}

export interface ILoginModel {
    email: string,
    password: string,
}

export interface LoginServerError {
    title: string,
    status: number,
    errors: Array<any>
}

export interface IRegisterModel {
    fullname: string,
    email: string,
    password: string
};

export interface RegisterServerError {
    title: string,
    status: number,
    errors: Array<any>,
}


export interface AuthSuccessAction {
    type: AuthActionTypes.AUTH_SUCCESS,
    payload: IUser
}

export interface AuthLogOut {
    type: AuthActionTypes.AUTH_LOGOUT
}

export type AuthAction = AuthSuccessAction | AuthLogOut;