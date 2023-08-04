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
import React, { useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import cursor from "../../../assests/Images/mouse-cursor.png";
import { RiDeleteBin7Fill } from "react-icons/ri";
import CourseModel from "./CourseModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../Redux/Actions/course";

const AdminCourses = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { courses } = useSelector((state) => state.course);

  const dispatch = useDispatch();

  const courseHandler = () => {
    onOpen();
  };
  const deleteHandler = (userId) => {
    console.log(userId);
  };

  const delLectureBtnhandler = ({ courseId, LecId }) => {
    console.log(courseId);
    console.log(LecId);
  };

  const addLectureHandler = ({ e, courseId, title, description, video }) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
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
          id={"wvdcjwvwv"}
          delLectureBtnhandler={delLectureBtnhandler}
          addLectureHandler={addLectureHandler}
          courseTitle="React Course"
        />
      </Box>
      <SideBar />
    </Grid>
  );
};

function Row({ item, courseHandler, deleteHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.title}</Td>
      <Td>
        {
          <Image src="https://www.datocms-assets.com/45470/1631110818-logo-react-js.png" />
        }
      </Td>
      <Td textTransform={"uppercase"}>{item.category}</Td>
      <Td>{item.CreatedBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => courseHandler(item._id)}
            variant={"outline"}
            color={"purple.500"}
          >
            View Lectures
          </Button>
          <Button
            onClick={() => deleteHandler(item._id)}
            variant={"outline"}
            color={"purple.600"}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
