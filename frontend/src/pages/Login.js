import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../api/api";
import { Navigate, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginHandler = (data) => {
    console.log(data);
    login(data, navigate);
  };
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <Box bg="blue.50" h={"100vh"}>
      <Flex h="100%" justify="center" align="center">
        <Box flex={0.5}></Box>
        <Box boxShadow="md" width="md" px={10} py={10} rounded="md" bg="white">
          <Heading textAlign={"center"} fontSize="3xl">
            Login
          </Heading>
          <FormControl isInvalid={errors}>
            <Flex gap={5} direction={"column"}>
              <Box h={20}>
                <FormLabel>Name:</FormLabel>
                <Input
                  errorBorderColor={errors.name ? "red.500" : "none"}
                  type="text"
                  id="name"
                  placeholder="name"
                  {...register("name", {
                    required: {
                      value: true,
                    },
                  })}
                />
                {errors?.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </Box>
              <Box h={20}>
                <FormLabel>Email:</FormLabel>
                <Input
                  errorBorderColor={errors.email ? "red.500" : "none"}
                  type="email"
                  id="email"
                  placeholder="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email address is required.",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                {errors?.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </Box>

              <Button
                onClick={handleSubmit(loginHandler)}
                mt={5}
                colorScheme={"facebook"}
                type="submit"
              >
                Login
              </Button>
            </Flex>
          </FormControl>
        </Box>
      </Flex>
    </Box>
  );
};

export default Index;
