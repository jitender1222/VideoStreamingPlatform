import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <Container h={"90vh"} p={"20"}>
      <Heading children="You have a Pro Pack" my={"8"} textAlign={"center"} />
      <VStack
        boxShadow={"lg"}
        textAlign={"center"}
        alignItems={"stretch"}
        borderRadius={"lg"}
        spacing={"0"}
      >
        <Box bg={"yellow.400"} p={"4"} css={{ borderRadius: "8px 8px 0 0" }}>
          <Text color={"black"} children={"Payment Success"} />
        </Box>
        <Box>
          <VStack textAlign={"center"} px={"8"} mt={"4"} spacing={"8"}>
            <Text color={"black"}>
              Congratulations you are a pro member. You have an access to all
              the premium content.
            </Text>
            <Heading size={"4xl"} children={<RiCheckboxCircleFill />} />
          </VStack>
        </Box>
        <Link to={"/profile"}>
          <Button variant={"ghost"} colorScheme="yellow">
            Go to Profile
          </Button>
        </Link>
        <Heading p={"4"} size={"xs"}>
          Reference:wkdcbwdkcwbk
        </Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
