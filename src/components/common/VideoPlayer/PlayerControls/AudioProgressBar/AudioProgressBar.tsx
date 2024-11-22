import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import "./style.css";
import { formatTime } from "../../../../../utils/timeutils/formatTime";

interface IProps {
  currentTime: number;
  duration: number;
}

export const AudioProgressBar: React.FunctionComponent<IProps> = ({
  currentTime,
  duration,
}) => {
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);
  const formattedCurrentTime = formatTime(currentTime);
  if (!duration) {
    // if duration is 0 or undefined
    // could be due to failed audio loading
    return null;
  }
  return (
    <div className="progress-bar">
      <div className="slider">
        <div
          className="slider-thumb"
          style={{ width: getProgress(currentTime, duration) + "%" }}
        ></div>
      </div>
      <Text
        as={"span"}
        className="timer-text"
        color={"white"}
        fontSize={"sm"}
        textAlign={"end"}
        width={"92px"}
        overflow={"hidden"}
      >
        {formattedCurrentTime}
        {" / "}
        {formattedDuration}
      </Text>
    </div>
  );
};

const getProgress = (current: number, total: number) => {
  return (current / total) * 100;
};
