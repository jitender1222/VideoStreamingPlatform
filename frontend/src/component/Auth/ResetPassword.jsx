import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  return (
    <Container py={"16"} h={"90vh"}>
      <form>
        <Heading
          children="Reset Password"
          my={"16"}
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />
        <VStack>
          <Input
            required
            id="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            type="email"
            focusBorderColor="yellow.500"
          />
          <Button type="submit" w="full" colorScheme="yellow">
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
