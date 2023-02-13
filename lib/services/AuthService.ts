import axios, {AxiosInstance} from "axios";
import {
    CreateUserDto, HttpException,
    LoginException, LoginResult, LoginStatus,
    LoginUserDto, RegistrationException, RegistrationResult,
    RegistrationStatus, User,
} from "../types/auth_types";
import {authService} from "./index";
import {routes} from "../settings";

export class AuthService {
    protected readonly instance : AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 3000,
            timeoutErrorMessage: "Time out!",
            validateStatus: () => true,
        });
    }

    public getInstance(){
        return this.instance;
    }

    public async login(userDto: LoginUserDto) : Promise<LoginResult>{
        const res = await this.instance.post('/auth/login', userDto);
        const {data} = await res;
        if (data.data === undefined){
            return data as LoginException;
        }
        return data as LoginStatus;
    }

    public async register(userDto: CreateUserDto) : Promise<RegistrationResult> {
        const res = await this.instance.post('/auth/register', userDto);
        const {data} = await res;
        if (data.data === undefined){
            return data as RegistrationException;
        }
        return data as RegistrationStatus;
    }

    public setAuthToken(token: string): void {
        if (token){
            this.instance.defaults.headers.common['Authorization']= `bearer ${token.trim()}`;
            axios.defaults.headers.common['Authorization'] = `bearer ${token.trim()}`;
        }
        else{
            delete axios.defaults.headers.common["Authorization"];
            delete this.instance.defaults.headers.common["Authorization"];
        }
    }

    public async getMe(): Promise<User | HttpException> {
        let res = await this.instance.get('/user/me');
        const {data} = await res;
        if (data.statusCode) return data as HttpException;
        return data as User;
    }

    public async authMiddleware(context: any) {
        // remove on prod
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = String(0);
        let Authorization = context.req.cookies['Authorization'];
        console.log(Authorization);
        await authService.setAuthToken(Authorization);
        const me = await authService.getMe();
        console.log(me);
        let is_authorized = false;
        if ("statusCode" in me){
            delete context.req.cookies['currentUser'];
        }
        else {
            is_authorized=true;
            context.req.cookies['currentUser'] = JSON.stringify(me);
        }

        if (routes.protectedRoutes.includes(context.resolvedUrl) && !is_authorized){
            delete context.req.cookies['currentUser'];
            return {
                redirect: {
                    destination: routes.mainAuthRoute,
                    permanent: false,
                },
            };
        }

        if (routes.authRoutes.includes(context.resolvedUrl) && is_authorized){
            return {
                redirect: {
                    destination: routes.mainProtectedRoute,
                    permanent: false,
                },
            };
        }

        return {props: {}};
    }
}