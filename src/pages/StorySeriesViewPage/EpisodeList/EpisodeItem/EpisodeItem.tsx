import { Card, Flex, Link, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { VideoResponse } from "../../../../apimodels/homepage";
import SquareImage from "../../../../components/ui/SquareImage";
interface IProps {
  episode: VideoResponse;
}

export const EpisodeItem: React.FunctionComponent<IProps> = ({ episode }) => {
  const { title, description } = episode;

  return (
    <Link as={ReactLink} to={`/video/${episode.documentId}`}>
      <Card p={2} bg={"#292929"}>
        <Flex flexDirection={"row"} gap={2} justifyContent={"flex-start"}>
          <SquareImage
            alt={"episode image"}
            src={episode.thumbnail_url}
            size={24}
          />
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
    </Link>
  );
};
