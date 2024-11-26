import { Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import AudioProgressBar from "../../components/common/VideoPlayer/PlayerControls/AudioProgressBar";
import { RiReplay10Fill, RiForward10Fill } from "react-icons/ri";
import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";

const SEEK_TIME = 10;

export const VideoControls: React.FunctionComponent<any> = (props) => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const playing: boolean = props.playing;
  const PlayIconComp = playing ? FiPauseCircle : FiPlayCircle;

  // function togglePlayState() {
  //   if (videoPlayerRef.current) {
  //     console.log("audio ref is ready");
  //   } else console.log("audio ref is not ready");
  //   if (playing) {
  //     videoPlayerRef.current?.pause();
  //   } else {
  //     videoPlayerRef.current?.play().catch((error) => {
  //       console.error("Playback error:", error);
  //     });
  //   }
  //   props.toggleAudioPlay(!playing);
  // }

  function seekVideo(time: number) {
    if (videoPlayerRef.current)
      videoPlayerRef.current.currentTime =
        videoPlayerRef.current?.currentTime + time;
  }

  useEffect(() => {
    if (videoPlayerRef.current && props.playerCurrentVideo.uri) {
      playing ? videoPlayerRef.current.play() : videoPlayerRef.current.pause();
    }
  }, [props.playerCurrentVideo.uri, playing]);

  const iconSize = props.isOpen ? 32 : 28;
  const { name, videoId, image, uri: audioUri } = props.playerCurrentVideo;
  return (
    <Flex
      flexDirection={props.isOpen ? "column" : "row"}
      gap={2}
      mt={props.isOpen ? 0 : 2}
      alignItems={"center"}
    >
      <Flex
        h={props.isOpen ? "66vh" : "60px"}
        w={props.isOpen ? "94vw" : "100px"}
        justifyContent={"center"}
      >
        <video
          id={videoId}
          ref={videoPlayerRef}
          controlsList="nodownload noremoteplayback"
          preload="metadata"
          height={"100%"}
          poster={image}
          src={audioUri}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
          onLoadStart={() => {
            setVideoLoading(true);
          }}
          onError={(e) => {
            // toast({
            //   id: "audio-load-failed",
            //   status: "error",
            //   title: "Loading audio failed!",
            // });
            setVideoLoading(false);
          }}
          onCanPlay={() => {
            console.log("can play song");
            setVideoLoading(false);
          }}
          onAbort={() => {
            setVideoLoading(false);
          }}
          onEnded={() => {
            props.toggleAudioPlay(false);
          }}
        />
      </Flex>
      {videoLoading ? (
        <Flex p={1} justifyContent={"center"}>
          <Spinner size={"sm"} color="orange.300" />
        </Flex>
      ) : (
        <Flex
          flexDirection={props.isOpen ? "column" : "row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={props.isOpen ? "90vw" : "80vw"}
          gap={2}
        >
          {name && (
            <Text
              fontSize={props.isOpen ? "lg" : "md"}
              color={"white"}
              noOfLines={2}
              width={props.isOpen ? "" : "100px"}
            >
              {name}
            </Text>
          )}
          <AudioProgressBar
            currentTime={currentTime}
            duration={
              videoPlayerRef.current ? videoPlayerRef.current.duration : 0
            }
            isPlayerOpen={props.isOpen}
          />
          <Flex className="play-controls-buttons" flexDirection={"row"} gap={2}>
            {props.isOpen && (
              <IconButton
                icon={<RiReplay10Fill color="black" size={24} />}
                aria-label="previous audio"
                onClick={() => {
                  seekVideo(-1 * SEEK_TIME);
                }}
              />
            )}
            <IconButton
              size={"md"}
              onClick={(e) => {
                props.toggleAudioPlay(!props.playing);
                e.stopPropagation();
              }}
              icon={<PlayIconComp color="black" size={iconSize} />}
              aria-label="play/pause"
            />
            {props.isOpen && (
              <IconButton
                icon={
                  <RiForward10Fill
                    direction={"right"}
                    color="black"
                    size={24}
                  />
                }
                aria-label="next audio"
                onClick={() => {
                  seekVideo(SEEK_TIME);
                }}
              />
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
