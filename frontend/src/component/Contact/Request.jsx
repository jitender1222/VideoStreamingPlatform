import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Request = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [course, setCourse] = useState();

  return (
    <Container my={"16"} h={"70vh"}>
      <VStack spacing={"10"}>
        <Heading children="Request New Course" />
        <form style={{ width: "100%" }}>
          <Box my="4">
            <FormLabel htmlFor="name" children={"Name"} />
            <Input
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter you Name"
              focusBorderColor="yellow.500"
            />
            <FormLabel htmlFor="email" children={"Email"} my={"4"} />

            <Input
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter you Email"
              focusBorderColor="yellow.500"
              my={"-4"}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="course" children="Course" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              focusBorderColor="yellow.400"
              placeholder="Explain your course.."
            />
          </Box>
          <Button type="submit" my="4" colorScheme="yellow">
            Send Mail
          </Button>

          <Box my="4">
            See Available Courses ?{" "}
            <Link to="/courses">
              <Button colorScheme={"yellow"} fontSize={"sm"} variant={"link"}>
                Click
              </Button>{" "}
            </Link>
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
