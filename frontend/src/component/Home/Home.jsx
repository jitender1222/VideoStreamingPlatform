import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import "./home.css";
import {
  AiFillAmazonSquare,
  AiFillFacebook,
  AiFillYoutube,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={["column", "row"]}
          height="100%"
          justifyContent={["center", "space-between"]}
          alignItems="center"
          spacing={["16", "48", "56"]}
        >
          <VStack width="full" alignItems={["center", "flex-end"]}>
            <Heading children="Learn From the Experts" />
            <Text
              textAlign={["center", "left"]}
              spacing="8"
              children="Find Valueable Content at reasonable price"
            />
            <Link to="/courses">
              <Button colorScheme="yellow">Explore Now</Button>
            </Link>
          </VStack>
          <Image
            className="headerImage"
            boxSize={"md"}
            rounded="xl"
            objectFit="contain"
            src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Stack>
      </div>
      <Box padding={"8"} bg="blackAlpha.800" fontFamily="body">
        <Heading textAlign="center" color="yellow" children="Our Brands" />
        <HStack
          marginTop="20"
          justifyContent="space-evenly"
          fontSize="6xl"
          cursor="pointer"
        >
          <AiFillFacebook />
          <FcGoogle />
          <AiFillYoutube />
          <AiFillAmazonSquare />
          <BsMicrosoft />
        </HStack>
      </Box>
    </section>
  );
};

export default Home;
