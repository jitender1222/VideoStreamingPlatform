import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Container h={"90vh"}>
    <VStack justifyContent={"center"} h={"full"} spacing={"4"}>
      <Heading textTransform={"uppercase"} children="Payment Failed" my={"8"} />
      <RiErrorWarningFill size={"5rem"} />
      <Link to={"/subscribe"}>
        <Button variant={"ghost"} colorScheme="yellow">
          Try Again
        </Button>
      </Link>
    </VStack>
  </Container>
);

export default NotFound;
