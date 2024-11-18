import { Box, Flex, Image, Link, Text, chakra } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { StoryReponse } from "../../../apimodels/homepage";

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
          <Image
            overflow={"hidden"}
            fit="cover"
            height={"100%"}
            w={"100%"}
            src={
              story?.thumbnail_url ? story?.thumbnail_url : "/placeholder.jpeg"
            }
            alt="avatar"
          />
        </Box>
        <Link
          display="block"
          fontSize="md"
          fontWeight={"bold"}
          color="gray.800"
          _dark={{
            color: "white",
          }}
        >
          {story.title}
        </Link>
        {isKOriginal && (
          <Flex
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Image src="/logo.png" alt="Logo" w={4} h={4} />
            <chakra.span
              fontSize="sm"
              fontWeight={""}
              color="gray.700"
              _dark={{
                color: "white",
              }}
            >
              {"Originals"}
            </chakra.span>
          </Flex>
        )}
      </Flex>
    </Link>
  );
};
