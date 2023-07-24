import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Redux/Actions/profile";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const SubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile(name, email));
  };
  return (
    <Container py={"16"} minH={"90vh"}>
      <form onSubmit={SubmitHandler}>
        <Heading
          textTransform={"uppercase"}
          children="Update Profile"
          my={"16"}
          textAlign={["center", "left"]}
        />
        <VStack spacing={"10"}>
          <Input
            required
            type={"name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            focusBorderColor="yellow.500"
          />
          <Input
            required
            type={"password"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            focusBorderColor="yellow.500"
          />
          <Button colorScheme="yellow" w={"full"} type="submit">
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
