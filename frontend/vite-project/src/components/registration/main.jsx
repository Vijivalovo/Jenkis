import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import reg_fetch from "./fetch";

export default function Registration() {
  const navigate = useNavigate();
  return (
    <Flex bg="gray.100" align="center" justify="center" h={800}>
      <Box bg="white" p={6} rounded="md" w={400}>
        <Formik
          initialValues={{
            lastname: "",
            firstname: "",
            patronymic: "",
            datebirth: "",
            password: "",
            wallet: "",
          }}
          onSubmit={(values) => {
            console.log(JSON.stringify(values, null, 2));
            reg_fetch(values, navigate);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={7} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="lastname">Имя</FormLabel>
                  <Field
                    as={Input}
                    id="lastname"
                    name="lastname"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="firstname">Фамилия</FormLabel>
                  <Field
                    as={Input}
                    id="firstname"
                    name="firstname"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="patronymic">Отчество</FormLabel>
                  <Field
                    as={Input}
                    id="patronymic"
                    name="patronymic"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="datebirth">Дата рождения</FormLabel>
                  <Field
                    as={Input}
                    id="datebirth"
                    name="datebirth"
                    type="date"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="wallet">Баланс</FormLabel>
                  <Field
                    as={Input}
                    id="wallet"
                    name="wallet"
                    type="number"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Пароль</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value) => {
                      let error;

                      if (value.length < 4) {
                        error = "Password must contain at least 4 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="teal" width="full">
                  Зарегистрироваться
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}