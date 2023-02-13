import {Box, Button, HStack, Link} from "@chakra-ui/react";
import styles from "../../../styles/header.module.scss"
import {Logo} from "../Logo";
import {useCurrentUser} from "../../../lib/hooks/useCurrentUser";

export const Header = () => {
    const {currentUser, onLogout} = useCurrentUser();
    return <Box className={styles.header}>
        <HStack height="inherit" spacing="auto">
            <Link href="/"><Logo boxSize="48px"/></Link>
            {currentUser ? <Button onClick={onLogout}>Выйти</Button>
            : <Link href="/signin">Войти</Link>}
        </HStack>
    </Box>
}