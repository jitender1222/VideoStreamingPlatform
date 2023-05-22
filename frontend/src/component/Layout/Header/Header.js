import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LinkButton = ({ url = "/", title = "Home" }) => (
  <Link to={url}>
    <Button variant="ghost">{title}</Button>
  </Link>
);

const Header = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isAuthenticated = true;
  const user = {
    role: "admin",
  };

  const logoutHandler = () => {
    console.log("logout ");
  };
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="yellow"
        rounded="xl"
        position="fixed"
        top="6"
        left="6"
        width="12"
        height="12"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Course Bundler</DrawerHeader>

          <DrawerBody>
            <VStack spacing="4" alignItems={"flex-start"}>
              <LinkButton url="/" title="Home" />
              <LinkButton url="/courses" title="Browse All Courses" />
              <LinkButton url="/request" title="Request a Course" />
              <LinkButton url="/contact" title="Contact Us" />
              <LinkButton url="/about" title="About" />
            </VStack>

            <HStack
              justifyContent="space-evenly"
              position="absolute"
              mb="2rem"
              height="100%"
            >
              {isAuthenticated ? (
                <>
                  <VStack>
                    <HStack>
                      <Link to="/profile">
                        <Button variant="ghost" colorScheme="yellow">
                          Profile
                        </Button>
                      </Link>

                      <Button
                        variant="ghost"
                        colorScheme="yellow"
                        onClick={logoutHandler}
                      >
                        <RiLogoutBoxLine /> LogOut
                      </Button>
                    </HStack>
                    {user && user.role === "admin" && (
                      <Link to="/admin/dashboard">
                        <Button colorScheme="purple" variant="ghost">
                          <RiDashboardFill style={{ margin: "4px" }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button colorScheme="yellow">Login</Button>
                  </Link>
                  <p>OR</p>
                  <Link to="/register">
                    <Button colorScheme="yellow">Sign Up</Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
