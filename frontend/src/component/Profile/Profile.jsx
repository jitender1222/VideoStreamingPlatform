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
import React, { useEffect, useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { fileUploadStyleCss } from "../Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfilePicture } from "../../Redux/Actions/profile";
import { toast } from "react-hot-toast";
import { deleteCourse } from "../../Redux/Actions/admin";

const Profile = ({ user }) => {
  // console.log("user", user);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  // const { loading, message, error } = useSelector((state) => state.Profile);
  const { loading, error, message } = useSelector((state) => state.profile);

  const removeFromPlaylist = (courseId) => {
    console.log("remove");
  };

  const changeImageHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", image);
    await dispatch(UpdateProfilePicture(myForm));
  };

  useEffect(() => {
    if (error) {
      console.log("inside error");
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      console.log("update pass");
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);
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
          <Avatar boxSize={"48"} src={user?.avatar?.url} />
          <Button colorScheme="yellow" variant={"ghost"} onClick={onOpen}>
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
          <HStack>
            <Text children="Name:" fontWeight={"bold"} />
            <Text children={user?.name} />
          </HStack>
          <HStack>
            <Text children="Email:" fontWeight={"bold"} />
            <Text children={user?.email} />
          </HStack>
          <HStack>
            <Text children="Created At:" fontWeight={"bold"} />
            <Text children={user?.createdAt.split("T")[0]} />
          </HStack>
          {user?.role !== "admin" && (
            <HStack>
              <Text children="Subscription:" fontWeight={"bold"} />
              {user?.subscription && user.subscription.status === "active" ? (
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
            <Link to={"/updateProfile"}>
              <Button>Update Profile</Button>
            </Link>
            <Link to={"/changePassword"}>
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children="Playlist" size={"md"} my={"8"} />
      {user?.playlist?.length > 0 && (
        <Stack
          direction={["column", "row"]}
          alignItems={"center"}
          flexWrap={"wrap"}
          p={"4"}
        >
          {user?.playlist.map((element, index) => (
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
        loading={loading}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageHandler, loading }) {
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
                <Button
                  w="fill"
                  colorScheme="yellow"
                  type="submit"
                  isLoading={loading}
                >
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
