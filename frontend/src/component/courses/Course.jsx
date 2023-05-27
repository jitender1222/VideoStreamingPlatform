import React, { useState } from "react";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const Course = () => {
  const [keyword, setKeyword] = useState();
  const [category, setCategory] = useState();

  const Course = ({
    views,
    title,
    imageSrc,
    id,
    addToPlaylistHandler,
    creator,
    description,
    lectureCount,
  }) => {
    return (
      <VStack className="course" alignItems={["center", "flex-start"]}>
        <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
        <Heading
          textAlign={["center", "left"]}
          maxW="200px"
          size={"sm"}
          fontFamily={"sans-serif"}
          noOfLines={3}
          children={title}
        />
        <Text noOfLines={2} children={description} />
        <HStack>
          <Text
            fontWeight={"bold"}
            textTransform={"uppercase"}
            children={"creator"}
          />
          <Text
            fontWeight={"body"}
            textTransform={"uppercase"}
            children={creator}
          />
        </HStack>
        <Heading
          textAlign={"center"}
          size="xs"
          children={`Lectures -${lectureCount}`}
          textTransform={"uppercase"}
        />
        <Heading
          textAlign={"center"}
          size="xs"
          children={`Views -${views}`}
          textTransform={"uppercase"}
        />

        <Stack direction={["column", "row"]} alignItems={"center"}>
          <Link to={`/course/$id`}>
            <Button colorScheme={"yellow"}>Watch Now</Button>
            <Button
              variant={"ghost"}
              colorScheme={"yellow"}
              onClick={() => addToPlaylistHandler(id)}
            >
              Add to Playlist
            </Button>
          </Link>
        </Stack>
      </VStack>
    );
  };
  const categories = [
    "Web Development",
    "Data Structure And Algorithm",
    "Machine Learning",
    "Data Science",
    "Java",
    "C++",
  ];
  return (
    <>
      <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
        <Heading children="All Courses" m={"8"} />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for a course"
          type="text"
          focusBorderColor="yellow "
        />
        <HStack overflowX={"auto"} paddingY={"8"}>
          {categories.map((item, index) => (
            <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
              <Text children={item} />
            </Button>
          ))}
        </HStack>

        <Stack
          direction={["column", "row"]}
          flexWrap="wrap"
          justifyContent={["flex-start", "space-evenly"]}
          alignItems={["center", "flex-start"]}
        >
          <Course
            views={2}
            title={"Sample"}
            description={"Sample"}
            imageSrc={"Sample"}
            creator={"Sample"}
            lectureCount={2}
          />
        </Stack>
      </Container>
    </>
  );
};

export default Course;
