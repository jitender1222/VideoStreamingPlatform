import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  return (
    <Container py={"16"} minH={"90vh"}>
      <form>
        <Heading
          textTransform={"uppercase"}
          children="Change Password"
          my={"16"}
          textAlign={["center", "left"]}
        />
        <VStack spacing={"10"}>
          <Input
            required
            type={"password"}
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            placeholder="Old Password"
            focusBorderColor="yellow.500"
          />
          <Input
            required
            type={"password"}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder="New Password"
            focusBorderColor="yellow.500"
          />
          <Button colorScheme="yellow" w={"full"} type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
