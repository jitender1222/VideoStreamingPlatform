import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import streaming from "../../assests/Videos/streaming.webm";

const CourseDetail = () => {
  const [lectureNumber, setLectureNumber] = useState("0");

  const lectures = [
    {
      _id: "wdjbe",
      title: "sample",
      description: "sample kbckendlclwkcwl",
      video: {
        url: "sacw",
      },
    },
    {
      _id: "wdjbe",
      title: "sample",
      description: "sample kbckendlclwkcwl",
      video: {
        url: "sacw",
      },
    },
    {
      _id: "wdjbe",
      title: "sample",
      description: "sample kbckendlclwkcwl",
      video: {
        url: "sacw",
      },
    },
    {
      _id: "wdjbe",
      title: "sample",
      description: "sample kbckendlclwkcwl",
      video: {
        url: "sacw",
      },
    },
    {
      _id: "wdjbe",
      title: "sample",
      description: "sample kbckendlclwkcwl",
      video: {
        url: "sacw",
      },
    },
  ];
  return (
    <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
      <Box>
        <video
          src={streaming}
          width={"100%"}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
        <Heading
          m={"4"}
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
        />
        <Heading m={"4"} children="Description" />
        <Text m={"4"} children={lectures[lectureNumber].description} />
        <Heading />
      </Box>
      <VStack>
        {lectures.map((el, index) => (
          <button
            key={index}
            onClick={() => setLectureNumber(index)}
            style={{
              width: "100%",
              padding: "1rem",
              textAlign: "center",
              margin: "0",
              borderBottom: "1px solid rgba(0 0 0 0.2)",
            }}
          >
            <Text>
              #{index + 1}
              {el.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CourseDetail;
