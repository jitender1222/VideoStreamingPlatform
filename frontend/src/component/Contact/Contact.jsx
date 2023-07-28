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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../../Redux/Actions/other";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const {
    loading,
    error,
    message: otherMessage,
  } = useSelector((state) => state.other);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (error) {
      console.log("inside error");
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (otherMessage) {
      console.log("update pass");
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, otherMessage]);

  return (
    <Container my={"16"} h={"70vh"}>
      <VStack>
        <Heading children="Contact Us" />
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
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
          <Button isLoading={loading} type="submit" my="4" colorScheme="yellow">
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
