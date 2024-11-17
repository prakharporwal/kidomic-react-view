import { IconButton } from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

export const ShortsActionButtonList = () => {
  return (
    <div
      style={{
        position: "absolute",
        right: "8px",
        bottom: "168px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <IconButton
        aria-label={"like video"}
        rounded={"full"}
        icon={<FiHeart color="white" size={24} />}
        bg={"#0f0f0f88"}
      />
      <IconButton
        aria-label={"like video"}
        rounded={"full"}
        icon={<FaShare color="white" size={24} />}
        bg={"#0f0f0f88"}
      />
    </div>
  );
};
