import { IconButton, Image, Spacer, Text } from "@chakra-ui/react";
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

const DEFAULT_AUDIO_URL = "/audio/audio-masha.mp3";

export const StoryViewPage: React.FunctionComponent<any> = (props) => {
  const routeParams = useParams();
  const storyId = routeParams.storyId;
  const [video, setVideo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>(DEFAULT_AUDIO_URL);
  const playing = props.playing;

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
          setAudioUrl(body.data.video_uri?.url);
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
  }, []);

  if (loading) {
    return (
      <div className="page">
        <LoadingShell />
      </div>
    );
  }

  // center play/pause icon
  const PlayIcon =
    isPlayingSongPage(audioUrl, props.playerCurrentAudio) && playing
      ? FiPauseCircle
      : FiPlayCircle;

  return (
    <div className="page">
      <Image
        w="calc(100% - 32px)"
        h={80}
        m={4}
        fit="cover"
        src={
          video.cover_image?.url ? video.cover_image?.url : "/placeholder.jpeg"
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
      <Text
        color="white"
        fontSize={"md"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        {video.author}
      </Text>
      {audioUrl && (
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
                // todo: use id for comparison
                if (!isPlayingSongPage(audioUrl, props.playerCurrentAudio)) {
                  props.toggleAudioPlay(false);
                  props.updatePlayerCurrentAudio(audioUrl);
                  props.toggleAudioPlay(true);
                } else {
                  // else just pause and play the current audio
                  props.toggleAudioPlay(!playing);
                }
              }}
              icon={<PlayIcon color="white" size={36} />}
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
      <Spacer h={108} />
    </div>
  );
};

function isPlayingSongPage(pageAudioUrl: string, globalAudioUrl: string) {
  return globalAudioUrl === pageAudioUrl;
}
