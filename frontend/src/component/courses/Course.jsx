import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { getAllCourses } from "../../Redux/Actions/course";
import { toast } from "react-hot-toast";
import { addToPlaylist } from "../../Redux/Actions/profile";

const Course = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { loading, courses, error, message } = useSelector(
    (state) => state.course
  );
  console.log("courses", typeof courses);
  console.log("courses", courses);

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, keyword, category, error, message]);

  const addToPlaylistHandler = (courseId) => {
    console.log("courseid", courseId);
    dispatch(addToPlaylist(courseId));
  };

  const Course = ({
    views,
    title,
    imageSrc,
    id,
    addToPlaylistHandler,
    creator,
    description,
    lectureCount,
    loading,
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
            <Button isLoading={loading} colorScheme={"yellow"}>
              Watch Now
            </Button>
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
          {courses?.length > 0 ? (
            courses &&
            courses.map((item) => (
              <Course
                key={item._id}
                views={item.views}
                title={item.title}
                description={item.description}
                imageSrc={item.poster.url}
                creator={item.createdBy}
                lectureCount={item.numOfVideos}
                id={item._id}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            ))
          ) : (
            <Heading mt={"12"} children={"Courses Not Found"} />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Course;
