import {useCallback, useMemo, useState} from "react";
import {useToast} from "@chakra-ui/react";
import {authService} from "../services";
import {CreateUserDto, LoginResult, LoginUserDto, RegistrationResult} from "../types/auth_types";
import Cookies from "js-cookie"
import {useRouter} from "next/router";
import {routes} from "../settings";

export function useAuthData() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [secondPassword, setSecondPassword] = useState<string>('')
    const toastId = ''
    const toast = useToast({
        id: toastId,
        status: 'warning',
        position: 'top',
        isClosable: true,
        duration: 1500,
    });

    const router = useRouter();

    const isEmailCorrect = useMemo(() => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(email);
    },[email])
    const isPasswordCorrect = useMemo(() => {
        return password.length >= 6;
    },[password])
    const isSecondPasswordCorrect = useMemo(() => {
        return secondPassword.length >= 6;
    },[secondPassword])
    const isPasswordsMatch = useMemo(() => {
        return password === secondPassword;
    }, [password, secondPassword])

    const onSignIn = useCallback(async () => {
        if (!isEmailCorrect && !toast.isActive(toastId)) {
            toast({
                title: `Неверный формат почты`,
            })
        }
        else if (!isPasswordCorrect && !toast.isActive(toastId)) {
            toast({
                title: `Пароль должен содержать не менее 6 символов`,
            });
        }
        const loginRes : LoginResult = await authService.login({email, password} as LoginUserDto);
        if ("statusCode" in loginRes){
            /*
            TODO: handle login exception
             */
            switch (loginRes.message) {
                case "invalid_credentials": {
                    toast({
                        title: `Неверные параметры входа (почта или пароль)`,
                    })
                    break;
                }
            }
        }
        else {
            Cookies.set('currentUser', JSON.stringify(loginRes.data));
            Cookies.set('Authorization', loginRes.Authorization);
            await router.push(routes.mainProtectedRoute);
        }

    }, [toast, email, password, isPasswordCorrect, isEmailCorrect]);

    const onSignUp = useCallback(async () => {
        if (!isEmailCorrect && !toast.isActive(toastId)) {
            toast({
                title: `Неверный формат почты`,
            })
            return;
        }
        else if (!isPasswordCorrect && !toast.isActive(toastId)) {
            toast({
                title: `Пароль должен содержать не менее 6 символов`,
            });
            return;
        }
        else if (secondPassword !== undefined) {
            if (!isSecondPasswordCorrect && !toast.isActive(toastId)) {
                toast({
                    title: `Пароль должен содержать не менее 6 символов`,
                });
                return;
            }
            if (!isPasswordsMatch && !toast.isActive(toastId)) {
                    toast({
                        title: `Пароли должны совпадать`,
                    });
                    return;
                }
        }

        const registrationRes : RegistrationResult = await authService.register({email, password} as CreateUserDto);
        if ("status" in registrationRes){
            /*
            TODO: handle registration exception
             */
            switch (registrationRes.message) {
                case "user_already_exist": {
                    toast({
                        title: `Пользователь с такой почтой уже существует`,
                    })
                    break;
                }
            }
        }
        else {
            await onSignIn();
        }
    },[toast, email, password, secondPassword, onSignIn, isEmailCorrect, isPasswordCorrect, isPasswordsMatch]);



    return {
        email, setEmail,
        password, setPassword,
        secondPassword, setSecondPassword,
        onSignUp, onSignIn
    }
}