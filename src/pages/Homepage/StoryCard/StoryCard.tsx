import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { StoryReponse } from "../../../apimodels/homepage";
import SquareImage from "../../../components/ui/SquareImage";

interface IProps {
  story: StoryReponse;
}

export const StoryCard: React.FunctionComponent<IProps> = ({ story }) => {
  const isKOriginal = story.author?.toLowerCase() === "Kidomic".toLowerCase();
  //   const isTrending = story.is_trending;

  return (
    <Link as={ReactLink} to={"/story/" + story.documentId}>
      <Flex
        m={2}
        alignItems="center"
        justifyContent="center"
        direction={"column"}
        width={"32"}
      >
        <Box w={32} h={32} position={"relative"}>
          {/* {isTrending && (
            <Box
              borderBottomLeftRadius={8}
              borderBottomRightRadius={8}
              position={"absolute"}
              right={0}
              bg={"white"}
              px={1}
              background={"orange.500"}
            >
              <Text
                height={4}
                lineHeight={4}
                fontSize={"sm"}
                fontWeight={"bold"}
                color={"white"}
              >
                Trending
              </Text>
            </Box>
          )} */}
          {isKOriginal && (
            <Box position={"absolute"} top={1} left={1}>
              <Image w={4} h={4} src={"/logo.png"} />
            </Box>
          )}
          <SquareImage data={story.thumbnail} />
        </Box>
        <Text
          display="block"
          fontSize="md"
          fontWeight={"bold"}
          color="white"
          overflowWrap={"break-word"}
          noOfLines={2}
          textAlign={"center"}
        >
          {story.title}
        </Text>
      </Flex>
    </Link>
  );
};
