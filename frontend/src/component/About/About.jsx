import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import video from "../../assests/Videos/streaming.webm";
import { RiSecurePaymentFill } from "react-icons/ri";
import termsandcondition from "../../assests/docs/termsAndCondition";

const Founder = () => (
  <Stack direction={["column", "row"]} spacing={["4", "16"]} padding={"8"}>
    <VStack>
      <Avatar
        src="https://avatars.githubusercontent.com/u/93830004?v=4"
        boxSize={["40", "48"]}
      />
      <Text children="Co-Founder" opacity={0.7} />
    </VStack>

    <VStack justifyContent={"center"} alignItems={["center", "flex-start"]}>
      <Heading children="Jitender Singh" size={["sm", "xl"]} />
      <Text
        textAlign={["center", "left"]}
        children={
          "Hi, I m a full stack developer. Our mission is to provide quality content at a reasonable Price."
        }
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      src={video}
      autoPlay
      loop
      muted
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
    ></video>
  </Box>
);

const TandC = ({ termsandcondition }) => (
  <Box>
    <Heading
      size={"md"}
      textAlign={["center", "left"]}
      children="Terms and Condtion"
      my={"4"}
    />
    <Box h={"200"} p={"4"} overflowY={"scroll"}>
      <Text
        fontFamily={"heading"}
        letterSpacing={"widest"}
        textAlign={["center", "left"]}
      >
        {termsandcondition}
      </Text>
      <Heading
        my={"4"}
        size={"xs"}
        children="Refund only applicable for cancellation within 7days"
      />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW={"container.lg"} padding={"16"} boxShadow={"lg"}>
      <Heading children="About Us" textAlign={["center", "left"]} />
      <Founder />
      <Stack m={"8"} direction={["column", "row"]} alignItems={"center"}>
        <Text
          fontFamily={"cursive"}
          m={["", "8"]}
          textAlign={["center", "left"]}
        >
          We are a video streaming platform with some premium courses available
          for only premium users
        </Text>
        <Link to="/subscribe">
          <Button variant={"ghost"} colorScheme="yellow">
            Checkout our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />

      <TandC termsandcondition={termsandcondition} />

      <HStack my={"10"} p={"4"}>
        <RiSecurePaymentFill />
        <Heading
          size={"xs"}
          fontFamily={"sans-serif"}
          textTransform={"uppercase"}
          children="Payment is Secured by Razorpay"
        />
      </HStack>
    </Container>
  );
};

export default About;
