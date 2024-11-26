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
import { lazy } from "react";
import "./style.css";
import { Helmet } from "react-helmet-async";

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
  const showButton = false;

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
    isPlayingSongPage("audioUrl", props.playerCurrentVideo.uri) && playing
      ? FiPauseCircle
      : FiPlayCircle;

  const story = data.story;
  const imageUrl =
    story?.thumbnail?.formats?.medium?.url ||
    story?.thumbnail?.formats?.thumbnail?.url ||
    "/placeholder.png";

  if (!story) {
    const ErrorBox = lazy(
      () => import(/* webpackChunkName: "errorBox" */ "../ErrorBox")
    );
    return <ErrorBox />;
  }

  const isKOriginal: boolean =
    data.story.author?.toLowerCase() === "Kidomic".toLowerCase();

  return (
    <div className="page">
      <Helmet>
        <title>{story.title + ": Storyplanet"}</title>
        <meta
          name="description"
          content={"Storyplanet :" + story.title + " " + story.description}
        />
      </Helmet>
      <Image
        maxH={{ base: 96, md: "400px" }}
        maxW={{ base: 96, md: "600px" }}
        m={1}
        mt={8}
        // h={80}
        // w="calc(100% - 32px)"
        // fit="cover"
        src={imageUrl}
        alt="cover img"
      />
      <Box mx="8" gap={"1"}>
        {story.title && (
          <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
            {story.title}
          </Text>
        )}
        {isKOriginal && (
          <Flex
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Image src="/logo.png" alt="Logo" w={4} h={4} />
            <chakra.span fontSize="sm">{"Originals"}</chakra.span>
          </Flex>
        )}
        {story.description && (
          <Text fontSize={"sm"} my={1} textAlign={"justify"} noOfLines={3}>
            {story.description}
          </Text>
        )}
      </Box>
      {showButton && (
        <div className="video-controls" style={{ marginTop: "16px" }}>
          <div className="action-buttons">
            {/* Todo make a play story button functional */}
            {/* <Button
            rounded={"md"}
            size={"md"}
            color={"black"}
            onClick={() => {}}
            leftIcon={<PlayIcon color="black" size={24} />}
            title={"play story"}
            aria-label="play/pause"
          >
            Play Story
          </Button> */}
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
