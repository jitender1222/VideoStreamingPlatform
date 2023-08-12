import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileUploadStyleCss } from "../../Auth/Register";

const CourseModel = ({
  isOpen,
  onOpen,
  onClose,
  id,
  delLectureBtnhandler,
  addLectureHandler,
  lectures = [],
  courseTitle,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setVideo("");
    setVideoPrev("");
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      size={"full"}
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={["1fr", "3fr 1fr"]}>
            <Box px={["0", "16"]}>
              <Box my={"5"}>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={"sm"} opacity={"0.4"} />
              </Box>
              <Heading children="Lectures" size={"lg"} />
              {lectures.map((item, i) => (
                <VideoCart
                  key={item._id}
                  num={i + 1}
                  delLectureBtnhandler={delLectureBtnhandler}
                  isLoading={loading}
                />
              ))}
            </Box>
            <Box>
              <form
                onSubmit={(e) =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={"4"}>
                  <Heading
                    children="Add Lectures"
                    size={"md"}
                    textTransform={"uppercase"}
                  />
                  <Input
                    placeholder="Title"
                    focusBorderColor="purple.300"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input
                    placeholder="Description"
                    focusBorderColor="purple.300"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Input
                    accept="video/mp4"
                    required
                    type="file"
                    focusBorderColor="purple.300"
                    css={{
                      "&::file-selector-button": {
                        ...fileUploadStyleCss,
                        color: "purple",
                      },
                    }}
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}
                  <Button
                    isLoading={loading}
                    type="submit"
                    w={"full"}
                    colorScheme="purple"
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModel;

function VideoCart({
  title,
  desc,
  num,
  lecId,
  courseId,
  delLectureBtnhandler,
}) {
  return (
    <Stack
      direction={["column", "row"]}
      my={"8"}
      borderRadius={"lg"}
      boxShadow={"0 0 10px rgba(107,70,193,0.5)"}
      justifyContent={["flex-start", "space-between"]}
      p={["4", "8"]}
    >
      <Box>
        <Heading size={"sm"} children={`#${num} ${title}`} />
        <Text children={desc} />
      </Box>
      <Button
        color="purple.600"
        onClick={() => delLectureBtnhandler(courseId, lecId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
