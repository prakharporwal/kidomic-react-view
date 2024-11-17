import { Box, IconButton, Spinner, Text, useToast } from "@chakra-ui/react";
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
  playerCurrentAudio,
  toggleAudioPlay,
}) => {
  const [audioLoading, setAudioLoading] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const toast = useToast();

  useEffect(() => {
    if (audioPlayerRef.current && playerCurrentAudio) {
      playing ? audioPlayerRef.current.play() : audioPlayerRef.current.pause();
    }
  }, [playerCurrentAudio, playing]);

  return (
    <div className="audio-controls">
      <audio
        controlsList="nodownload noremoteplayback"
        ref={audioPlayerRef}
        src={playerCurrentAudio}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
        preload="metadata"
        onLoadStart={() => {
          console.log("loading audio start");
          setAudioLoading(true);
        }}
        onError={(e) => {
          // toast({
          //   id: "audio-load-failed",
          //   status: "error",
          //   title: "Loading audio failed!",
          // });
          console.error(e);
          setAudioLoading(false);
        }}
        onCanPlay={() => {
          console.log("can play song");
          setAudioLoading(false);
        }}
        onAbort={() => {
          toast({
            id: "audio-load-failed",
            status: "error",
            title: "Loading audio abort!",
          });
          setAudioLoading(false);
        }}
        onEnded={() => {
          toggleAudioPlay(false);
        }}
      />
      {audioLoading ? (
        <Box p={1}>
          <Spinner size={"sm"} color="orange.300" />
        </Box>
      ) : (
        <div className="actions">
          <AudioProgressBar
            currentTime={currentTime}
            duration={
              audioPlayerRef.current ? audioPlayerRef.current.duration : 0
            }
          />
          <div className="play-controls-buttons">
            {/* <IconButton
              icon={<FiArrowLeft color="white" size={24} />}
              aria-label="previous audio"
            /> */}
            <IconButton
              onClick={() => {
                if (audioPlayerRef.current) {
                  console.log("audio ref is ready");
                } else console.log("audio ref is not ready");
                if (playing) {
                  audioPlayerRef.current?.pause();
                } else {
                  audioPlayerRef.current?.play().catch((error) => {
                    console.error("Playback error:", error);
                  });
                }
                toggleAudioPlay(!playing);
              }}
              icon={
                playing ? (
                  <FiPauseCircle color="white" size={24} />
                ) : (
                  <FiPlayCircle color="white" size={24} />
                )
              }
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
