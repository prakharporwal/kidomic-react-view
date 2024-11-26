import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import VideoControls from "../../../pages/VideoControls";
import { FiChevronDown } from "react-icons/fi";
import AppLogo from "../WebHeader/AppLogo";
import "./style.css";

export const VideoPlayer: React.FunctionComponent<any> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="video-player"
      onClick={onOpen}
      style={{
        display: props.playerCurrentVideo.uri ? "block" : "none",
        height: isOpen ? "calc(100dvh)" : "",
      }}
    >
      {isOpen && (
        <Flex mt={4}>
          <IconButton
            icon={<FiChevronDown size={28} color="white" />}
            aria-label="open full player"
            ref={btnRef}
            variant="ghost"
            onClick={(e) => {
              console.log("closing");
              onClose();
              e.stopPropagation();
            }}
          />
          <AppLogo dark={true} />
        </Flex>
      )}
      <VideoControls isOpen={isOpen} />
      {/* <Drawer
        isOpen={false}
        closeOnOverlayClick
        closeOnEsc
        onClose={onClose}
        placement={"bottom"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={20} p={4}>
          <DrawerCloseButton />
          <div style={{ height: isOpen ? "auto" : "10vh" }}>Hello people</div>
          <VideoPlayer />
        </DrawerContent>
      </Drawer> */}
    </div>
  );
};
