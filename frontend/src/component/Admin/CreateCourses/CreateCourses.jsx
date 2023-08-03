import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import cursor from "../../../assests/Images/mouse-cursor.png";
import { fileUploadStyleCss } from "../../Auth/Register";
import { createCourse } from "../../../Redux/Actions/admin";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const categories = [
  "Web Development",
  "Data Structure And Algorithm",
  "Machine Learning",
  "Data Science",
  "Java",
  "C++",
];

const CreateCourses = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  // console.log(image);
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.admin);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("createdBy", createdBy);
    myForm.append("file", image);

    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);
  return (
    <Grid
      minH={"90vh"}
      css={{ cursor: `url(${cursor}),default)` }}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Container py={"20"}>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={"uppercase"}
            children="Create Course"
            my={"16"}
            textAlign={["center", "left"]}
          />
          <VStack m={"auto"} spacing={"8"}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Created By"
              type="text"
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={""}>Category</option>
              {categories.map((ele, idx) => (
                <option key={idx} value={ele}>
                  {ele}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              type="file"
              focusBorderColor="purple.300"
              css={{
                "&::file-selector-button": {
                  ...fileUploadStyleCss,
                  color: "purple",
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={"contain"} />
            )}
            <Button
              isLoading={loading}
              w={"full"}
              colorScheme="purple"
              type="submit"
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>
      <SideBar />
    </Grid>
  );
};

export default CreateCourses;
