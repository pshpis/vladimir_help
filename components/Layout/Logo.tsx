import {Image} from "@chakra-ui/image";
import logo from "../../public/logo.svg"
import {ResponsiveValue} from "@chakra-ui/react";

export const Logo = ({boxSize} : {boxSize: ResponsiveValue<string>}) => {
    return <Image src={logo.src} color="#09c" boxSize={boxSize}/>
}