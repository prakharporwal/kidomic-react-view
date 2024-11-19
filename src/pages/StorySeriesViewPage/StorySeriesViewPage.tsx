import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  chakra,
} from "@chakra-ui/react";
import "./style.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingShell from "../../components/ui/LoadingShell";
import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import EpisodeList from "./EpisodeList";
import { StoryReponse } from "../../apimodels/homepage";

const DEFAULT_AUDIO_URL = "/audio/audio-masha.mp3";

export const StorySeriesViewPage: React.FunctionComponent<any> = (props) => {
  const routeParams = useParams();
  const storyId = routeParams.storyId;
  const [story, setStory] = useState<StoryReponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>(DEFAULT_AUDIO_URL);
  const playing = props.playing;

  function fetchStory() {
    setLoading(true);
    fetch(process.env.REACT_APP_PROD_API + `/v1/stories/${storyId}?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((body) => {
        setStory(body.data);
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
    fetchStory();
  }, [storyId]);

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

  if (!story) {
    return null;
  }

  const isKOriginal: boolean =
    story.author?.toLowerCase() === "Kidomic".toLowerCase();

  return (
    <div className="page">
      <Image
        w="calc(100% - 32px)"
        h={80}
        m={4}
        fit="cover"
        src={story.thumbnail?.url ? story.thumbnail?.url : "/placeholder.jpeg"}
        alt="cover img"
      />
      <Box mx="8" gap={"2"}>
        <Text
          color="white"
          fontSize={"2xl"}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          {story.title}
        </Text>
        {isKOriginal && (
          <Flex
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Image src="/logo.png" alt="Logo" w={4} h={4} />
            <chakra.span fontSize="sm" fontWeight={""} color="white">
              {"Originals"}
            </chakra.span>
          </Flex>
        )}
        <Text
          color="white"
          fontSize={"sm"}
          my={2}
          textAlign={"justify"}
          noOfLines={3}
        >
          {story.description}
        </Text>
      </Box>
      {audioUrl && (
        <div className="video-controls" style={{ marginTop: "16px" }}>
          <div className="action-buttons">
            {/* <IconButton
              size={"lg"}
              icon={<FiChevronLeft color="white" size={30} />}
              aria-label="back"
            /> */}
            {false && (
              <Button
                rounded={"md"}
                size={"md"}
                background={"#f80"}
                color={"white"}
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
                leftIcon={<PlayIcon color="white" size={24} />}
                title={"play story"}
                aria-label="play/pause"
              >
                Play Story
              </Button>
            )}
            {/* <IconButton
              size={"lg"}
              icon={<FiChevronRight color="white" size={30} />}
              aria-label="next"
            /> */}
          </div>
        </div>
      )}
      {story.videos && <EpisodeList episodes={story.videos} />}
      <Spacer h={108} />
    </div>
  );
};

function isPlayingSongPage(pageAudioUrl: string, globalAudioUrl: string) {
  return globalAudioUrl === pageAudioUrl;
}
