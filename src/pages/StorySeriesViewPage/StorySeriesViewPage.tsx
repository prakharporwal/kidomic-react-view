import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  chakra,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import LoadingShell from "../../components/ui/LoadingShell";
import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import EpisodeList from "./EpisodeList";
import { useQuery, gql } from "@apollo/client";
import "./style.css";
import { lazy } from "react";

const GQL_QUERY_GET_STORIES = gql`
  query StoryDetails($documentId: ID!) {
    story(documentId: $documentId) {
      documentId
      title
      description
      author
      videos {
        documentId
        title
        description
        cover_image {
          documentId
          url
          mime
          formats
        }
        video_uri {
          url
          previewUrl
          mime
          documentId
          alternativeText
        }
      }
      thumbnail {
        documentId
        url
        mime
        formats
      }
    }
  }
`;

export const StorySeriesViewPage: React.FunctionComponent<any> = (props) => {
  const routeParams = useParams();
  const storyId = routeParams.storyId;
  const playing = props.playing;

  const { loading, error, data } = useQuery(GQL_QUERY_GET_STORIES, {
    variables: { documentId: storyId },
  });

  if (loading) {
    return (
      <div className="page">
        <LoadingShell />
      </div>
    );
  }

  if (error) {
    const ErrorBox = lazy(() => import("../ErrorBox"));
    return <ErrorBox />;
  }

  // center play/pause icon
  const PlayIcon =
    isPlayingSongPage("audioUrl", props.playerCurrentAudio) && playing
      ? FiPauseCircle
      : FiPlayCircle;

  const story = data.story;
  const imageUrl =
    story?.thumbnail?.formats?.medium?.url ||
    story?.thumbnail?.formats?.thumbnail?.url ||
    "/placeholder.png";

  if (!story) {
    return (
      <Text color={"red.600"} fontSize={"lg"} fontWeight={"bold"}>
        No Data
      </Text>
    );
  }

  const isKOriginal: boolean =
    data.story.author?.toLowerCase() === "Kidomic".toLowerCase();

  return (
    <div className="page">
      <Image
        w="calc(100% - 32px)"
        maxW={96}
        h={80}
        m={4}
        fit="cover"
        src={imageUrl}
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
      <div className="video-controls" style={{ marginTop: "16px" }}>
        <div className="action-buttons">
          {/* <IconButton
              size={"lg"}
              icon={<FiChevronLeft color="white" size={30} />}
              aria-label="back"
            /> */}
          <Button
            rounded={"md"}
            size={"md"}
            colorScheme={"brand"}
            color={"white"}
            onClick={() => {
              console.log("chal hat");
              // todo: use id for comparison
              // if (!isPlayingSongPage(audioUrl, props.playerCurrentAudio)) {
              //   props.toggleAudioPlay(false);
              //   props.updatePlayerCurrentAudio(audioUrl);
              //   props.toggleAudioPlay(true);
              // } else {
              //   // else just pause and play the current audio
              //   props.toggleAudioPlay(!playing);
              // }
            }}
            leftIcon={<PlayIcon color="white" size={24} />}
            title={"play story"}
            aria-label="play/pause"
          >
            Play Story
          </Button>
          {/* <IconButton
              size={"lg"}
              icon={<FiChevronRight color="white" size={30} />}
              aria-label="next"
            /> */}
        </div>
      </div>
      {story.videos && <EpisodeList episodes={story.videos} />}
      <Spacer h={108} />
    </div>
  );
};

function isPlayingSongPage(pageAudioUrl: string, globalAudioUrl: string) {
  return globalAudioUrl === pageAudioUrl;
}
