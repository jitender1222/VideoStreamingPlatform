import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { fileUploadStyleCss } from "../Auth/Register";

const removeFromPlaylist = () => {
  console.log("remove");
};

const Profile = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const user = {
    name: "jitender",
    email: "jit@gmail.com",
    createdAt: String(new Date().toISOString()),
    role: "user",
    subscription: {
      status: "undefined",
    },
    playlist: [
      {
        poster: "Sone",
        course: "scbdskch",
      },
    ],
  };
  const changeImageHandler = (e, image) => {
    e.preventDefault();
    console.log(image);
  };
  return (
    <Container minH={"95vh"} maxW={"container.lg"} py={"8"}>
      <Heading children={"Profile"} m={"8"} textTransform={"uppercase"} />
      <Stack
        justifyContent={"flex-start"}
        direction={["column", "row"]}
        alignItems={"center"}
        spacing={["8", "16"]}
        padding={"8"}
      >
        <VStack>
          <Avatar boxSize={"48"} />
          <Button colorScheme="yellow" variant={"ghost"} onClick={onOpen}>
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
          <HStack>
            <Text children="Name:" fontWeight={"bold"} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children="Email:" fontWeight={"bold"} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="Created At:" fontWeight={"bold"} />
            <Text children={user.createdAt.split("T")[0]} />
          </HStack>
          {user.role !== "admin" && (
            <HStack>
              <Text children="Subscription:" fontWeight={"bold"} />
              {user.subscription.status === "active" ? (
                <Button variant={"unstyled"} color={"yellow.500"}>
                  Cancel Subscription
                </Button>
              ) : (
                <Link to={"/subscribe"}>
                  <Button colorScheme="yellow">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={["column", "row"]} alignItems={"center"}>
            <Link to={"/updateprofile"}>
              <Button>Update Profile</Button>
            </Link>
            <Link to={"/changepassword"}>
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children="Playlist" size={"md"} my={"8"} />
      {user.playlist.length > 0 && (
        <Stack
          direction={["column", "row"]}
          alignItems={"center"}
          flexWrap={"wrap"}
          p={"4"}
        >
          {user.playlist.map((element, index) => (
            <VStack w={"48"} m={"2"} key={element.course}>
              <Image
                boxSize={"full"}
                objectFit={"contain"}
                src={element.poster}
              />

              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={"ghost"} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button onClick={() => removeFromPlaylist(element.course)}>
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhotoBox
        changeImageHandler={changeImageHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageHandler }) {
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState("");
  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const closeHandler = () => {
    onClose();
    setImagePrev("");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent>
        <ModalCloseButton />
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={(e) => changeImageHandler(e, image)}>
              <VStack>
                {imagePrev ? (
                  <Avatar src={imagePrev} boxSize={"48"} />
                ) : (
                  <Avatar src={imagePrev} boxSize={"48"} />
                )}
                <Input
                  type="file"
                  css={{ "&::file-selector-button": fileUploadStyleCss }}
                  onChange={changeImage}
                />
                <Button w="fill" colorScheme="yellow" type="submit">
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter onClick={closeHandler}>
          <Button>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
