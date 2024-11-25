import { Box, Card, Flex, IconButton, Text } from "@chakra-ui/react";
import { VideoResponse } from "../../../../apimodels/homepage";
import SquareImage from "../../../../components/ui/SquareImage";
import { VideoDataState } from "../../../../redux/reducer/audioPlayerReducer";
import { extractImageUrl } from "../../../../utils/imageUtils";
import { FiPlayCircle } from "react-icons/fi";
interface IProps {
  episode: VideoResponse;
  updatePlayerCurrentVideo: (playerCurrentVideo: VideoDataState) => void;
}

export const EpisodeItem: React.FunctionComponent<IProps> = (props) => {
  const { title, description, documentId, video_uri, cover_image } =
    props.episode;

  return (
    <Card
      p={2}
      background={"#3a3a3a"}
      color={"white"}
      w={"calc(100vw - 32px)"}
      onClick={() => {
        if (video_uri?.url)
          props.updatePlayerCurrentVideo({
            videoId: documentId,
            uri: video_uri?.url,
            image: extractImageUrl(cover_image),
            name: title,
          });
      }}
      _hover={{ background: "#5f5f5f" }}
    >
      <Flex flexDirection={"row"} gap={2} justifyContent={"flex-start"}>
        <Flex className={"image-wrapper"} justifyContent={"center"}>
          <Box w={24} h={24}>
            <SquareImage alt={"episode image"} data={cover_image} />
          </Box>
        </Flex>
        <Flex flexDirection={"column"} gap={1} w={"full"}>
          <Text fontSize={"md"}>{title}</Text>
          <Text fontSize={"sm"} noOfLines={2} overflowWrap={"break-word"}>
            {description}
          </Text>
        </Flex>
        <IconButton
          icon={<FiPlayCircle size={28} color="black" />}
          aria-label="play episode"
          visibility="visible"
          mt={4}
          mr={4}
        />
      </Flex>
    </Card>
  );
};
