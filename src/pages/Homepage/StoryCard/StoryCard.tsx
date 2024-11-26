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
        my={2}
        alignItems="center"
        justifyContent="center"
        direction={"column"}
        position={"relative"}
        _hover={{ transform: "scale(1.1)", transition: "transform 0.3s" }}
        _active={{ transform: "scale(1.1)", transition: "transform 0.3s" }}
        _focus={{ transform: "scale(1.1)", transition: "transform 0.3s" }}
      >
        <Box
          // w={44}
          // h={56}
          w={{ base: 36, md: 48 }}
          h={{ base: 48, md: 60 }}
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
        <Box
          position={"absolute"}
          // bg={"linear-gradient(to top, black, transparent);"}
          bg={
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0) 100%)"
          }
          bottom="0"
          w={"100%"}
          py={1}
          px={2}
        >
          <Text
            display="block"
            fontSize="md"
            fontWeight={"bold"}
            overflowWrap={"break-word"}
            noOfLines={2}
            textAlign={"center"}
            color={"whitesmoke"}
          >
            {story.title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};
