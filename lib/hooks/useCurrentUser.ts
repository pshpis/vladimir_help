import useCookie from 'react-use-cookie';
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {routes} from "../settings";

export function useCurrentUser(){
    const router = useRouter();
    const [userCookie, setUserCookie] = useCookie('currentUser');
    const [authCookie, setAuthCookie] = useCookie('Authorization');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        try {
            setCurrentUser(JSON.parse(userCookie));
        }
        catch (e) {
            setCurrentUser(null);
        }
    }, [userCookie])

    const onLogout = useCallback(async () => {
        setUserCookie('');
        setAuthCookie('');
        await router.push(routes.mainAuthRoute);
    }, [userCookie, setUserCookie])

    return {
        authCookie,
        userCookie,
        setUserCookie,
        currentUser,
        onLogout
    }
}