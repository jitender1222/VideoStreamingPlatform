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

const Contact = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();

  return (
    <Container my={"16"} h={"70vh"}>
      <VStack>
        <Heading children="Contact Us" />
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
            <FormLabel htmlFor="email" children={"Email"} />

            <Input
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter you Email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              required
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              focusBorderColor="yellow.400"
              placeholder="Your Message.."
            />
          </Box>
          <Button type="submit" my="4" colorScheme="yellow">
            Send Mail
          </Button>

          <Box my="4">
            Request for a new course ?{" "}
            <Link to="/request">
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

export default Contact;
