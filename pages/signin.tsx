import {NextPage} from "next";
import {SignIn} from "../components/Auth/SignIn";
import {authService} from "../lib/services";

export const getServerSideProps = async function (context : any) {
    // console.log(req);
    return await authService.authMiddleware(context);
}
const Home: NextPage = () => {
    return (
        <>
            <SignIn/>
        </>
    )
}

export default Home