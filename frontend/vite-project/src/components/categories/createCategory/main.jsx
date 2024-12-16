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
import createCategory_fetch from "./fetch";
import React, { useState, useEffect } from "react";
import listCategories_fetch from '../../categories/listCategories/fetch';

export default function CreateSlot() {
  const navigate = useNavigate();

    return (
      <Flex bg="gray.100" align="center" justify="center" p={10}>
        <Box bg="white" p={6} rounded="md" w={400}>
          <Formik
            initialValues={{
              title: ""
            }}
            onSubmit={(values) => {
                createCategory_fetch(values, navigate);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel htmlFor="title">Категория</FormLabel>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="text"
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
