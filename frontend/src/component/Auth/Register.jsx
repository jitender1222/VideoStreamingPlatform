import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registration } from "../../Redux/Actions/user";

export const fileUploadStyleCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  border: "none",
  width: "110%",
  height: "100%",
  color: "#ECC94B",
  backgroundColor: "white",
};

const fileUploadStyle = {
  "&::file-selector-button": fileUploadStyleCss,
};

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imagePrev, setImagePrev] = useState();
  const [image, setImage] = useState();

  console.log(image);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", image);

    dispatch(registration(myForm));
  };

  return (
    <Container h={"95vh"}>
      <VStack h={"full"} justifyContent={"center"}>
        <Heading textTransform={"uppercase"} children={"Registration"} />

        <form onSubmit={SubmitHandler} style={{ width: "100%" }}>
          <Box my={"4"} display={"flex"} justifyContent="center">
            <Avatar src={imagePrev} size={"2xl"} />
          </Box>
          <Box my="4">
            <FormLabel htmlFor="name" children={"UserName"} />
            <Input
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="Enter you Name"
              focusBorderColor="yellow.500"
            />
          </Box>
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
            <FormLabel htmlFor="avatar" children={"Choose Avatar"} />

            <Input
              required
              id="chooseAvatar"
              // value={}
              type={"file"}
              placeholder="Enter you Password"
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button type="submit" my="4" colorScheme="yellow">
            Sign Up
          </Button>

          <Box my="4">
            <Link to="/login">
              Already Registered ?{" "}
              <Button colorScheme={"yellow"} fontSize={"sm"} variant={"link"}>
                Login
              </Button>{" "}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
