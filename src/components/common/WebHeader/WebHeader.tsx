import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiChevronLeft, FiMenu } from "react-icons/fi";
import AppLogo from "./AppLogo";
import { RiCloseFill } from "react-icons/ri";
function shouldShowBackButton(path: string): boolean {
  switch (path) {
    case "/":
      return false;
  }
  return true;
}

export default function WebHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = shouldShowBackButton(location.pathname);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Icon = showBackButton ? FiChevronLeft : isOpen ? RiCloseFill : FiMenu;

  function iconButtonClickHandler() {
    if (showBackButton) {
      if (location.key !== "default") navigate(-1);
      else navigate("/");
      return;
    }

    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }

  return (
    <Box as={"header"}>
      <Flex
        position={"fixed"}
        height={"14"}
        w={"full"}
        zIndex={1000}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={1}
      >
        <Box mx={2}>
          <Icon strokeWidth={1.6} size={32} onClick={iconButtonClickHandler} />
        </Box>
        <AppLogo />
        <Box marginLeft={"auto"} mr={4}>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/user/signin");
            }}
          >
            Login
          </Button>
        </Box>
      </Flex>
      {/* Fix: make desktop compatible responsive: compatible warning */}
      {false && (
        <Flex
          position={"absolute"}
          display={{ base: "none", lg: "block" }}
          top={{ base: 0, lg: 14 }}
          textAlign={"center"}
          color={"white"}
          zIndex={{ base: -10, lg: 1000 }}
          background={"gray.500"}
          height={6}
          width={"100vw"}
        >
          we currently support mobile device. view in mobile for best experience
        </Flex>
      )}
      <MobileSideDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

const MobileSideDrawer: React.FunctionComponent<any> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      closeOnOverlayClick
    >
      <DrawerOverlay />
      <DrawerContent>
        <Box m={4}>
          <DrawerCloseButton />
          <AppLogo />
          <DrawerBody>
            <List my={4}>
              <ListItem onClick={() => navigate("/")}>
                <Text fontSize={"xl"}>Home</Text>
              </ListItem>
            </List>
          </DrawerBody>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};
