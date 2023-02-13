export interface CreateUserDto{
    type: "dto",
    email: string,
    password: string,
}

export interface LoginUserDto{
    type: "dto",
    email: string,
    password: string,
}

export interface User{
    type: "model",
    id: number,
    email: string,
    role: UserRole,
    password? : string,
}

export enum UserRole {
    CLIENT = "CLIENT",
    ADMIN = "ADMIN",
    ROOT = "ROOT",
}

export interface RegistrationStatus{
    type: "status"
    success: boolean;
    message: string;
    data?: User;
}

export interface LoginStatus{
    type: "status"
    expiresIn?: string
    Authorization: string
    data: User
}

export interface HttpException{
    type: "exception"
    statusCode: number,
    message: string,
}

export interface LoginException extends HttpException {}

export interface RegistrationException {
    type: "exception"
    response: string,
    status: number,
    message: string,
    name? : string
}

export type LoginResult = LoginStatus | LoginException;
export type RegistrationResult = RegistrationStatus | RegistrationException;