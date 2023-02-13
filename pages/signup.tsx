import type { NextPage } from 'next'
import {SignUp} from "../components/Auth/SignUp";
import {authService} from "../lib/services";

export const getServerSideProps = async function (context : any) {
    // console.log(req);
    return await authService.authMiddleware(context);
}
const Home: NextPage = () => {
    return (
        <>
            <SignUp/>
        </>
    )
}

export default Home