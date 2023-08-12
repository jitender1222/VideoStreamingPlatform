import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import cursor from "../../../assests/Images/mouse-cursor.png";
import { RiDeleteBin7Fill } from "react-icons/ri";
import CourseModel from "./CourseModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../Redux/Actions/course";
import { addLecture, deleteCourse } from "../../../Redux/Actions/admin";
import toast from "react-hot-toast";

const AdminCourses = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { courses, lectures } = useSelector((state) => state.course);
  const { loading, error, message } = useSelector((state) => state.admin);

  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const dispatch = useDispatch();

  const courseHandler = (courseId, title) => {
    console.log("course handler", courseId);
    onOpen();
    dispatch(getAllCourses(courseId));
    setCourseId(courseId);
    setCourseTitle(title);
  };
  const deleteHandler = (courseId) => {
    console.log(courseId);
    dispatch(deleteCourse(courseId));
  };

  const delLectureBtnhandler = () => {};

  const addLectureHandler = async ({
    e,
    courseId,
    title,
    description,
    video,
  }) => {
    console.log("oinsid tje add lectire");
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    await dispatch(addLecture(courseId, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success("message");
      dispatch({ type: "clearMessage" });
    }
    dispatch(getAllCourses());
  }, [dispatch, message, error]);
  return (
    <Grid
      minH={"90vh"}
      css={{ cursor: `url(${cursor}),default)` }}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box p={["0", "16"]} overflowX={"auto"}>
        <Heading
          textTransform={"uppercase"}
          children={"All Courses"}
          my={"16"}
          textAlign={["center", "left"]}
        />
        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size={"lg"}>
            <TableCaption>All available Courses in the database </TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Poster</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses?.map((item) => (
                <Row
                  courseHandler={courseHandler}
                  deleteHandler={deleteHandler}
                  key={item._id}
                  item={item}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModel
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          delLectureBtnhandler={delLectureBtnhandler}
          addLectureHandler={addLectureHandler}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
        />
      </Box>
      <SideBar />
    </Grid>
  );
};

function Row({ item, courseHandler, deleteHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.title}</Td>
      <Td>
        {
          <Image src="https://www.datocms-assets.com/45470/1631110818-logo-react-js.png" />
        }
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={"uppercase"}>{item.category}</Td>
      <Td>{item.CreatedBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => courseHandler(item._id, item.title)}
            variant={"outline"}
            color={"purple.500"}
            isLoading={loading}
          >
            View Lectures
          </Button>
          <Button
            onClick={() => deleteHandler(item._id)}
            variant={"outline"}
            color={"purple.600"}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
