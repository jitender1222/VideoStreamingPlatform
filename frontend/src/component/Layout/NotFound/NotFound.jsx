import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Container h={"90vh"}>
    <VStack justifyContent={"center"} h={"full"} spacing={"4"}>
      <Heading children="Page Not found" my={"8"} />
      <RiErrorWarningFill size={"5rem"} />
      <Link to={"/"}>
        <Button variant={"ghost"} colorScheme="yellow">
          Go to Home
        </Button>
      </Link>
    </VStack>
  </Container>
);

export default NotFound;
