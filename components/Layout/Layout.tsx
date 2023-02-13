import {Box} from "@chakra-ui/react";
import {Header} from "./Header/Header";
import {ReactNode} from "react";
import useWindowSize from "../../lib/hooks/useWindowSize";

interface Props {
    children?: ReactNode;
}

const Layout = ({children} : Props) => {
    const size = useWindowSize();
    return <Box paddingTop="64px" paddingX="120px">
        <Header/>
        <Box minHeight={(size.height - 64) + "px"}>
            {children}
        </Box>
    </Box>
}

export default Layout;