import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Spacer,
    Text
} from '@chakra-ui/react'
import Layout from "../Layout/Layout";
import styles from "../../styles/signup.module.scss"
import {PasswordField} from "./PasswordField";
import React from "react";
import {useAuthData} from "../../lib/hooks/useAuthData";

export const SignUp = () => {
    const authDataObj = useAuthData()
    const {setEmail, setPassword, setSecondPassword, onSignUp} = authDataObj

    return <Layout>
        <Box className={styles.signup} borderRadius="xl" boxShadow="md">
            <Text className={styles.title}>Введите почту</Text>
            <Text className={styles.comment}>Ваша почта будет использоваться для входа в аккаунт</Text>
            <Divider marginY="10px" border="1px"/>
            <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={(event: any) => setEmail(event.target.value)}/>
            </FormControl>
            <Spacer height="10px"/>
            <PasswordField onChange={(event: any) => setPassword(event.target.value)} title="Пароль"/>
            <Spacer height="10px"/>
            <PasswordField onChange={(event: any) => setSecondPassword(event.target.value)} title="Повторите пароль"/>
            <Spacer height="10px"/>
            <HStack justify="space-between">
                <Checkbox defaultChecked>Запомнить меня</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                    Восстановить пароль
                </Button>
            </HStack>
            <Spacer height="10px"/>
            <Button colorScheme='blue' width="100%" onClick={onSignUp}>Зарегистрироваться</Button>
        </Box>
    </Layout>
}