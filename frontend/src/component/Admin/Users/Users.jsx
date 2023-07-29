import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import cursor from "../../../assests/Images/mouse-cursor.png";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../Redux/Actions/admin";
import Loader from "../../Layout/Loader/Loader";

const Users = () => {
  const { users, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const updateHandler = (userId) => {
    console.log(userId);
  };
  const deleteHandler = (userId) => {
    console.log(userId);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <Grid
      minH={"90vh"}
      css={{ cursor: `url(${cursor}),default)` }}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      {loading ? (
        <Loader color="purple.500" />
      ) : (
        <Box p={["0", "16"]} overflowX={"auto"}>
          <Heading
            textTransform={"uppercase"}
            children={"All Users"}
            my={"16"}
            textAlign={["center", "left"]}
          />
          <TableContainer w={["100vw", "full"]}>
            <Table variant={"simple"} size={"lg"}>
              <TableCaption>All available users in the database </TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Subscription</Th>
                  <Th>Role</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users &&
                  users.map((item) => (
                    <Row
                      updateHandler={updateHandler}
                      deleteHandler={deleteHandler}
                      key={item._id}
                      item={item}
                    />
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <SideBar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>
        {item.subscription && item.subscription.status === "active"
          ? "Active"
          : "Not Active"}
      </Td>
      <Td>{item.role}</Td>
      <Td>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={"outline"}
            color={"purple.500"}
          >
            Change Role
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
