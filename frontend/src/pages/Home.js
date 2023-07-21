import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { fetchData, handleDataChange } from "../api/api";
import { Minus, Plus } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const [materialsData, setMaterialsData] = useState({
    rm1: 0,
    rm2: 0,
    fp1: 0,
    fp2: 0,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = async (name, value) => {
    setLoading(true);
    // setMaterialsData((prevData) => ({
    //   ...prevData,
    //   [name]: prevData[name] + value,
    // }));
    await handleDataChange({ name, value });
    setRefresh((prev) => !prev);
  };
  console.log(materialsData);
  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const data = await fetchData();
        data && setMaterialsData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAsync();
  }, [refresh]);
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <Flex
      w={"100vw"}
      h="100vh"
      border={"1px"}
      direction={{ base: "column", md: "row" }}
    >
      {loading && (
        <Center
          background={"blackAlpha.500"}
          width={"100vw"}
          height={"100vh"}
          position={"absolute"}
          zIndex={"10"}
        >
          <Heading>Loading...</Heading>
        </Center>
      )}
      <Box position={"absolute"} top="20px" right="20px">
        <Button
          colorScheme="teal"
          onClick={() => {
            localStorage.removeItem("token");
            setRefresh((prev) => !prev);
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={1}
        border={"1px"}
      >
        <Heading>Raw Material</Heading>
        <Flex gap={"1rem"} alignItems={"center"}>
          <Heading fontSize={"3xl"}>RM-1</Heading>
          <IconButton
            name="rm1"
            onClick={() => handleChange("rm1", -1)}
            icon={<Minus />}
            colorScheme="teal"
          />{" "}
          <Heading> {materialsData?.rm1}</Heading>
          <IconButton
            onClick={() => handleChange("rm1", 1)}
            name="rm1"
            icon={<Plus />}
            colorScheme="teal"
          />{" "}
        </Flex>
        <Flex gap={"1rem"} alignItems={"center"}>
          <Heading fontSize={"3xl"}>RM-2</Heading>
          <IconButton
            onClick={() => handleChange("rm2", -1)}
            icon={<Minus />}
            colorScheme="teal"
          />{" "}
          <Heading> {materialsData?.rm2}</Heading>
          <IconButton
            onClick={() => handleChange("rm2", 1)}
            icon={<Plus />}
            colorScheme="teal"
          />{" "}
        </Flex>
      </Flex>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={1}
        border={"1px"}
      >
        <Heading>Finished Product</Heading>
        <Flex gap={"1rem"} alignItems={"center"}>
          <Heading fontSize={"3xl"}>FP-1</Heading>
          <IconButton
            name="rm1"
            onClick={() => handleChange("fp1", -1)}
            icon={<Minus />}
            colorScheme="teal"
          />{" "}
          <Heading> {materialsData?.fp1}</Heading>
          <IconButton
            onClick={() => handleChange("fp1", 1)}
            name="rm1"
            icon={<Plus />}
            colorScheme="teal"
          />{" "}
        </Flex>
        <Flex gap={"1rem"} alignItems={"center"}>
          <Heading fontSize={"3xl"}>FP-2</Heading>
          <IconButton
            onClick={() => handleChange("fp2", -1)}
            icon={<Minus />}
            colorScheme="teal"
          />{" "}
          <Heading> {materialsData?.fp2}</Heading>
          <IconButton
            onClick={() => handleChange("fp2", 1)}
            icon={<Plus />}
            colorScheme="teal"
          />{" "}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
