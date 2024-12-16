/* eslint-disable react/prop-types */
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Select } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import createSlot_fetch from "./fetch";
import React, { useState, useEffect } from "react";
import listCategories_fetch from '../../categories/listCategories/fetch';

export default function CreateSlot() {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [arrCategories, setArrCategories] = useState([]);
  
  useEffect(() => {
    listCategories_fetch(setArrCategories);
  }, []);

  const categories = (e) => {
     setCategory(e.target.value);
  }
  
  if(arrCategories != undefined)
  {
    return (
      <Flex bg="gray.100" align="center" justify="center" p={10}>
        <Box bg="white" p={6} rounded="md" w={400}>
          <Formik
            initialValues={{
              category: "",
              minPrice: "",
              redemtionPrice: "",
              saleTime: "",
              bidStep: "",
              status: "О",
            }}
            onSubmit={(values) => {
              values.category = category;
              createSlot_fetch(values, navigate);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel htmlFor="category">Категории</FormLabel>
                    <Select
                      placeholder=""
                      colorScheme="teal"
                      variant="filled"
                      w="100%"
                      p={1}
                      minWidth={120}
                      onChange={categories}
                    >
                        {arrCategories.map((cat, i) => (
                          <option key={i} value={cat.title}>
                            {cat.title}
                          </option>
                      ))}
                    </Select>
                  </FormControl>
  
                  <FormControl>
                    <FormLabel htmlFor="minPrice">Начальная ставка</FormLabel>
                    <Field
                      as={Input}
                      id="minPrice"
                      name="minPrice"
                      type="text"
                      variant="filled"
                    />
                  </FormControl>
  
                  <FormControl>
                    <FormLabel htmlFor="redemtionPrice">
                      Цена выкупа
                    </FormLabel>
                    <Field
                      as={Input}
                      id="redemtionPrice"
                      name="redemtionPrice"
                      type="number"
                      variant="filled"
                    />
                  </FormControl>
  
                  <FormControl paddingTop={10}>
                    <FormLabel htmlFor="saleTime">Время на продажу</FormLabel>
                    <Field
                      as={Input}
                      id="saleTime"
                      name="saleTime"
                      type="number"
                      variant="filled"
                    />
                  </FormControl>
  
                  <FormControl paddingTop={10}>
                    <FormLabel htmlFor="bidStep">Шаг ставок</FormLabel>
                    <Field
                      as={Input}
                      id="bidStep"
                      name="bidStep"
                      type="number"
                      variant="filled"
                    />
                  </FormControl>
  
                  <Button type="submit" colorScheme="teal" width="full">
                    Добавить
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    );
  }
}
