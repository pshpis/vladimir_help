import type {NextPage} from 'next'
import {authService} from "../lib/services";
import {MainPage} from "../components/MainPage/MainPage";

export const getServerSideProps = async function (context : any) {
    return await authService.authMiddleware(context);
}

const Home: NextPage = () => {
  return (
      <>
        <MainPage/>
      </>
  )
}

export default Home