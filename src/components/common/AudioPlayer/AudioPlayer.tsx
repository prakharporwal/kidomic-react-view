import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import VideoPlayer from "../../../pages/VideoPlayer";
import { FiChevronDown } from "react-icons/fi";
import "./style.css";

export const AudioPlayer: React.FunctionComponent<any> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="audio-player"
      style={{
        display: props.playerCurrentAudio ? "block" : "none",
        height: isOpen ? "calc(100vh - 56px)" : "",
        borderRadius: "12px 12px 0 0",
        borderTop: "1px solid white",
        transition: "width 2s",
      }}
      onClick={onOpen}
    >
      {isOpen && (
        <Box>
          <IconButton
            icon={<FiChevronDown size={24} color="white" />}
            aria-label="open full player"
            ref={btnRef}
            variant="ghost"
            onClick={(e) => {
              console.log("closing");
              onClose();
              e.stopPropagation();
            }}
            animation={`translate infinite 20s linear`}
          ></IconButton>
        </Box>
      )}
      {/* <PlayerControls /> */}
      <VideoPlayer isOpen={isOpen} />
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
