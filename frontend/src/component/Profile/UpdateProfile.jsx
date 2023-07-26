import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Redux/Actions/profile";

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
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
            type={"text"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            focusBorderColor="yellow.500"
          />
          <Input
            type={"email"}
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
