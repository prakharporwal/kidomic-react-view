import { Card, Flex, Text } from "@chakra-ui/react";
import { VideoResponse } from "../../../../apimodels/homepage";
import SquareImage from "../../../../components/ui/SquareImage";
interface IProps {
  episode: VideoResponse;
  updatePlayerCurrentAudio: (playerCurrentAudio: string) => void;
}

export const EpisodeItem: React.FunctionComponent<IProps> = (props) => {
  const { title, description, video_uri, cover_image } = props.episode;
  const { medium, thumbnail } = cover_image?.formats;
  const imageUrl = medium?.url || thumbnail?.url;

  return (
    <Card
      p={2}
      bg={"#292929"}
      w={"calc(100vw - 32px)"}
      onClick={() => {
        props.updatePlayerCurrentAudio(video_uri?.url ?? "");
      }}
    >
      <Flex flexDirection={"row"} gap={2} justifyContent={"flex-start"}>
        <SquareImage alt={"episode image"} src={imageUrl} size={24} />
        <Flex flexDirection={"column"} gap={1} w={"full"}>
          <Text fontSize={"md"} color={"white"}>
            {title}
          </Text>
          <Text
            fontSize={"sm"}
            color={"white"}
            noOfLines={2}
            overflowWrap={"break-word"}
          >
            {description}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
