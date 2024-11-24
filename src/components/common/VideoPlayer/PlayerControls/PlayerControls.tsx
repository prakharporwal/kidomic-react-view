import { chakra, Flex, IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiPauseCircle,
  FiPlayCircle,
} from "react-icons/fi";
import "./style.css";
import AudioProgressBar from "./AudioProgressBar";

export const PlayerControls: React.FunctionComponent<any> = ({
  playing,
  playerCurrentVideo,
  toggleAudioPlay,
}) => {
  const [audioLoading, setAudioLoading] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (playerRef.current && playerCurrentVideo.uri) {
      playing ? playerRef.current.play() : playerRef.current.pause();
    }
  }, [playerCurrentVideo.uri, playing]);

  const PlayIconComp = playing ? FiPauseCircle : FiPlayCircle;

  const propsX = {
    hidden: false,
    "aria-hidden": false,
    controlsList: "nodownload noremoteplayback",
    src: playerCurrentVideo.uri,
    onTimeUpdate: (e: any) => {
      setCurrentTime(e.currentTarget.currentTime);
    },
    preload: "metadata",
    loop: true,
    onLoadStart: () => {
      console.log("loading audio start");
      setAudioLoading(true);
    },
    onError: (e: any) => {
      setAudioLoading(false);
    },
    onCanPlay: () => {
      console.log("can play song now");
      setAudioLoading(false);
    },
    onAbort: () => {
      setAudioLoading(false);
    },
    onEnded: () => {
      toggleAudioPlay(false);
    },
  };
  return (
    <div className="audio-controls">
      <video ref={playerRef} {...propsX} />
      {audioLoading ? (
        <Flex p={1} justifyContent={"center"}>
          <Spinner size={"sm"} color="orange.300" />
        </Flex>
      ) : (
        <div className="actions">
          {/* <AudioProgressBar
            currentTime={currentTime}
            duration={playerRef.current ? playerRef.current.duration : 0}
          /> */}
          <div className="play-controls-buttons">
            {/* <IconButton
              icon={<FiArrowLeft color="white" size={24} />}
              aria-label="previous audio"
            /> */}
            <IconButton
              size={"md"}
              onClick={() => {
                if (playerRef.current) {
                  console.log("audio ref is ready");
                } else console.log("audio ref is not ready");
                if (playing) {
                  playerRef.current?.pause();
                } else {
                  playerRef.current?.play().catch((error) => {
                    console.error("Playback error:", error);
                  });
                }
                toggleAudioPlay(!playing);
              }}
              icon={<PlayIconComp color="white" size={30} />}
              aria-label="play/pause"
            />
            {/* <IconButton
              icon={<FiArrowRight color="white" size={24} />}
              aria-label="next audio"
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};
