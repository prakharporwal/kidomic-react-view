import { useMemo } from "react";
import { Text, chakra } from "@chakra-ui/react";
import { formatTime } from "../../../../../utils/timeutils/formatTime";
import "./style.css";

interface IProps {
  currentTime: number;
  duration: number;
  isPlayerOpen: boolean;
}

export const AudioProgressBar: React.FunctionComponent<IProps> = ({
  currentTime,
  duration,
  isPlayerOpen,
}) => {
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);
  const formattedCurrentTime = formatTime(currentTime);
  if (!duration) {
    // if duration is 0 or undefined
    // could be due to failed audio loading
    return null;
  }
  return (
    <chakra.div
      className="progress-bar"
      width={{ base: isPlayerOpen ? "100%" : "", md: "100%" }}
    >
      <chakra.div
        className="slider"
        display={{ base: isPlayerOpen ? "block" : "none", md: "block" }}
      >
        <chakra.div
          className="slider-thumb"
          display={{ base: isPlayerOpen ? "block" : "none", md: "block" }}
          style={{ width: getProgress(currentTime, duration) + "%" }}
        ></chakra.div>
      </chakra.div>
      <Text
        as={"span"}
        className="timer-text"
        color={"white"}
        fontSize={"sm"}
        textAlign={"end"}
        width={"90px"}
        overflow={"hidden"}
      >
        {formattedCurrentTime}
        {" / "}
        {formattedDuration}
      </Text>
    </chakra.div>
  );
};

const getProgress = (current: number, total: number) => {
  return (current / total) * 100;
};
