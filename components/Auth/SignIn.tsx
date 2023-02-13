import Layout from "../Layout/Layout";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    HStack,
    Input, Link,
    Spacer,
    Text
} from "@chakra-ui/react";
import styles from "../../styles/signup.module.scss";
import {PasswordField} from "./PasswordField";
import {useAuthData} from "../../lib/hooks/useAuthData";
import React from "react";

export const SignIn = () => {
    const authDataObj = useAuthData();
    const {setEmail, setPassword, onSignIn} = authDataObj;

    return <Layout>
        <Box className={styles.signup} borderRadius="xl" boxShadow="md">
            <Text className={styles.title}>Войти в аккаунт</Text>
            <Text className={styles.comment}>Еще нет своего аккаунта? <Link color="#3182ce" href="/signup">
                Зарегистрируйтесь</Link>
            </Text>
            <Divider marginY="10px" border="1px"/>
            <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={(event: any) => setEmail(event.target.value)}/>
            </FormControl>
            <Spacer height="10px"/>
            <PasswordField onChange={(event: any) => setPassword(event.target.value)} title="Пароль"/>
            <Spacer height="10px"/>
            <HStack justify="space-between">
                <Checkbox defaultChecked>Запомнить меня</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                    Восстановить пароль
                </Button>
            </HStack>
            <Spacer height="10px"/>
            <Button colorScheme='blue' width="100%" onClick={onSignIn}>Войти</Button>
        </Box>
    </Layout>
}