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
        _hover={{ transform: "scale(1.1)", transition: "transform 0.3s" }}
        _active={{
          border: "2px solid white",
          borderRadius: "12px",
          backgroundColor: "white",
          color: "black",
          lineHeight: "40px",
        }}
      >
        <Box
          w={{ base: 32, md: 40 }}
          h={{ base: 32, md: 40 }}
          borderRadius={12}
          overflow={"hidden"}
          position={"relative"}
        >
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
          <SquareImage data={story.thumbnail_url} />
        </Box>
        <Text
          display="block"
          fontSize="md"
          fontWeight={"bold"}
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
