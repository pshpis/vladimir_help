import Layout from "../Layout/Layout";
import {useCurrentUser} from "../../lib/hooks/useCurrentUser";
import {useEffect} from "react";
import {Link} from "@chakra-ui/react";

export const MainPage = () => {
    const {currentUser} = useCurrentUser();
    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);
    return <Layout>
        <Link href='/profile'>Мой профиль</Link>
    </Layout>
}