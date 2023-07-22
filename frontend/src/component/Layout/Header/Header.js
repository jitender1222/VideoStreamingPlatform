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
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/Actions/user";

const LinkButton = ({ url = "/", title = "Home", onClose }) => (
  <Link to={url} onClick={onClose}>
    <Button variant="ghost">{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    onClose();
    dispatch(logout());
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
              <LinkButton onClose={"onClose"} url="/" title="Home" />
              <LinkButton
                onClose={"onClose"}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={"onClose"}
                url="/request"
                title="Request a Course"
              />
              <LinkButton
                onClose={"onClose"}
                url="/contact"
                title="Contact Us"
              />
              <LinkButton onClose={"onClose"} url="/about" title="About" />
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
                      <Link onClick={onClose} to="/profile">
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
                      <Link to="/admin/dashboard" onClick={onClose}>
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
                  <Link to="/login" onClick={onClose}>
                    <Button colorScheme="yellow">Login</Button>
                  </Link>
                  <p>OR</p>
                  <Link to="/register" onClick={onClose}>
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
