import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { VideoResponse } from "../../../../apimodels/homepage";
import SquareImage from "../../../../components/ui/SquareImage";
import { VideoDataState } from "../../../../redux/reducer/audioPlayerReducer";
import { extractImageUrl } from "../../../../utils/imageUtils";
interface IProps {
  episode: VideoResponse;
  updatePlayerCurrentVideo: (playerCurrentVideo: VideoDataState) => void;
}

export const EpisodeItem: React.FunctionComponent<IProps> = (props) => {
  const { title, description, video_uri, cover_image } = props.episode;

  return (
    <Card
      p={2}
      bg={"#292929"}
      w={"calc(100vw - 32px)"}
      onClick={() => {
        if (video_uri?.url)
          props.updatePlayerCurrentVideo({
            uri: video_uri?.url,
            image: extractImageUrl(cover_image),
            name: title,
          });
      }}
    >
      <Flex flexDirection={"row"} gap={2} justifyContent={"flex-start"}>
        <Flex className={"image-wrapper"} justifyContent={"center"}>
          <Box w={24} h={24}>
            <SquareImage alt={"episode image"} data={cover_image} />
          </Box>
        </Flex>
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
