import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Actions/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container h={"95vh"}>
      <VStack h={"full"} justifyContent={"center"}>
        <Heading children={"Welcome to Course Bundler"} />

        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Box my="4">
            <FormLabel htmlFor="email" children={"Email Address"} />
            <Input
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter you email"
              focusBorderColor="yellow.500"
            />
            <FormLabel htmlFor="password" children={"Password"} />

            <Input
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter you Password"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box>
            <Link to="/forgetPassword">
              <Button fontSize={"sm"} variant={"link"}>
                Forgot Password
              </Button>
            </Link>
          </Box>
          <Button type="submit" my="4" colorScheme="yellow">
            Login
          </Button>

          <Box my="4">
            <Link to="/register">
              New User ?{" "}
              <Button colorScheme={"yellow"} fontSize={"sm"} variant={"link"}>
                Sign Up
              </Button>{" "}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
