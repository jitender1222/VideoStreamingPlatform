import { Box, HStack, Heading, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import {
  TiSocialLinkedinCircular,
  TiSocialTwitterCircular,
} from "react-icons/ti";
import { DiGithub } from "react-icons/di";

const Footer = () => {
  return (
    <Box padding={4} bg="blackAlpha.900" minH={"10vh"}>
      <Stack direction={["column", "row"]}>
        <VStack alignItems={["center", "flex-start"]} width="full">
          <Heading children="All rights reserved" color="white" />
          <Heading
            fontFamily={"body"}
            fontSize={"sm"}
            children="Made by @Jitender singh"
            color="yellow.400"
          />
        </VStack>
        <HStack
          spacing={["2", "10"]}
          justifyContent={"center"}
          color={"white"}
          fontSize={"50"}
        >
          <a
            href="https://www.linkedin.com/in/jitender22/"
            rel="noreferrer"
            target={"_blank"}
          >
            <TiSocialLinkedinCircular />
          </a>
          <a
            href="https://twitter.com/jitende13410127"
            rel="noreferrer"
            target={"_blank"}
          >
            <TiSocialTwitterCircular />
          </a>
          <a
            href="https://github.com/jitender1222"
            rel="noreferrer"
            target={"_blank"}
          >
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
