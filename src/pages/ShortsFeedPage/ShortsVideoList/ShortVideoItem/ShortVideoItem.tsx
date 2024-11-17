import { useRef, useState, VideoHTMLAttributes } from "react";
import "./styles.css";
import { Box, IconButton } from "@chakra-ui/react";
import ShortsActionButtonList from "./ShortsActionButtonList";
import { FiPauseCircle, FiVolume2, FiVolumeX } from "react-icons/fi";
import { useNavigate } from "react-router";

export interface ShortVideoItemProps
  extends VideoHTMLAttributes<typeof ShortVideoItem> {
  nextId: string;
  channelId?: string;
  description?: string;
}

export const ShortVideoItem = (props: ShortVideoItemProps) => {
  const { src } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
  //         if (videoRef.current) {
  //           videoRef.current.play().catch((error) => {
  //             console.error("Playback error:", error);
  //           });
  //           setIsPlaying(true);
  //           videoRef.current.scrollIntoView();
  //         }
  //       } else {
  //         if (videoRef.current) {
  //           setIsPlaying(false);
  //           videoRef.current.pause();
  //         }
  //       }
  //     },
  //     { threshold: 0.4 }
  //   );

  //   if (videoRef.current) {
  //     observer.observe(videoRef.current);
  //   }

  //   return () => {
  //     if (videoRef.current) {
  //       observer.unobserve(videoRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "black",
        overflowX: "hidden",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "32px",
          zIndex: 4,
        }}
      >
        <IconButton
          aria-label="volume"
          rounded={"full"}
          p={1}
          background={"#0f0f0f88"}
          onClick={(e) => {
            setIsMuted(!isMuted);
            e.stopPropagation();
          }}
        >
          {isMuted ? (
            <FiVolumeX size={24} color="white" />
          ) : (
            <FiVolume2 size={24} color="white" />
          )}
        </IconButton>
      </div>
      <Box
        id={props.id}
        width={{ base: "100%", md: "400px" }}
        height={{ base: "100%", md: "600px" }}
        borderRadius={"12px"}
        position={"relative"}
        onClick={() => {
          if (isPlaying) {
            videoRef.current?.pause();
          } else {
            videoRef.current?.play().catch((error) => {
              console.error("Playback error:", error);
            });
          }
          setIsPlaying(!isPlaying);
        }}
      >
        {!isPlaying && (
          <Box
            width={"100%"}
            height={"100%"}
            position={"absolute"}
            display={"grid"}
            placeItems={"center"}
            bg={"#0f0f0f88"}
          >
            <IconButton
              p={1}
              aria-label={isPlaying ? "pause" : "play"}
              rounded={"full"}
              h={"auto"}
            >
              <FiPauseCircle color="white" size={54} />
            </IconButton>
          </Box>
        )}
        <video
          ref={videoRef}
          src={src}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
          muted={isMuted}
          onEnded={() => {
            // console.log("Video ended");
            // const nextVideo = document.getElementById(props.nextId);
            // nextVideo?.scrollIntoView();
            navigate("/shorts/" + props.nextId);
          }}
        ></video>
      </Box>
      <div
        style={{
          position: "absolute",
          background: "linear-gradient(bottom to top, #000000)",
          left: 0,
          bottom: "54px",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {props.channelId && (
          <span style={{ paddingLeft: "32px" }}>
            <span>@</span>
            {props.channelId}
          </span>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "32px",
          color: "white",
          fontSize: "16px",
        }}
      >
        {props.description}
      </div>
      <ShortsActionButtonList />
    </div>
  );
};
