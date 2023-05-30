import { Box, Button, Grid, VStack } from "@chakra-ui/react";
import React from "react";
import SideBar from "../SideBar/SideBar";
import cursor from "../../../assests/Images/mouse-cursor.png";

const CreateCourses = () => {
  return (
    <Grid
      minH={"90vh"}
      css={{ cursor: `url(${cursor}),default)` }}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box></Box>
      <SideBar />
    </Grid>
  );
};

export default CreateCourses;
