import { IconButton, Image, Text } from "@chakra-ui/react";
import "./style.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingShell from "../../components/ui/LoadingShell";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPauseCircle,
  FiPlayCircle,
} from "react-icons/fi";
import AudioPlayer from "../../components/common/AudioPlayer";

const DEFAULT_AUDIO_URL = "/audio/audio-masha.mp3";

export const StoryViewPage: React.FunctionComponent<any> = (props) => {
  const routeParams = useParams();
  const storyId = routeParams.storyId;
  const [video, setVideo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>(DEFAULT_AUDIO_URL);
  const playing = props.isPlaying;

  function fetchVideo() {
    setLoading(true);
    fetch(process.env.REACT_APP_PROD_API + `/v1/videos/${storyId}?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((body) => {
        setVideo(body.data);
        console.log("fetched data", body.data.video_uri?.url);

        if (body.data.video_uri?.url) {
          props.setCurrentSong(
            process.env.REACT_APP_CDN_ENDPOINT + body.data.video_uri?.url
          );
        } else {
          // default audio
          props.setCurrentSong("");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchVideo();

    return () => {
      props.toggleAudioPlay(false);
    };
  }, []);

  if (loading) {
    return <LoadingShell />;
  }

  return (
    <div className="page">
      <Image
        w="calc(100% - 32px)"
        h={80}
        m={4}
        fit="cover"
        src={
          video.cover_image?.url
            ? process.env.REACT_APP_CDN_ENDPOINT + video.cover_image?.url
            : "/placeholder.jpeg"
        }
        alt="avatar"
      />
      <Text
        color="white"
        fontSize={"2xl"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        {video.title}
      </Text>
      {false && (
        <div className="video-controls" style={{ marginTop: "16px" }}>
          <div className="action-buttons">
            <IconButton
              size={"lg"}
              icon={<FiChevronLeft color="white" size={30} />}
              aria-label="back"
            />
            <IconButton
              rounded={"md"}
              size={"lg"}
              p={4}
              onClick={() => {
                props.toggleAudioPlay(!playing);
              }}
              icon={
                playing ? (
                  <FiPauseCircle color="white" size={36} />
                ) : (
                  <FiPlayCircle color="white" size={36} />
                )
              }
              aria-label="play/pause"
            />
            <IconButton
              size={"lg"}
              icon={<FiChevronRight color="white" size={30} />}
              aria-label="next"
            />
          </div>
        </div>
      )}
      <AudioPlayer />
    </div>
  );
};
