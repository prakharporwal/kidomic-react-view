import {
  Box,
  chakra,
  Flex,
  Image,
  Link,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoadingShell from "../../components/ui/LoadingShell";
import { Link as ReactLink } from "react-router-dom";
import CarouselSimple from "../../components/CarouselSimple";
import "./styles.css";

type StoryReponse = {
  id: string;
  title: string;
  description?: string;
  videos: VideoResponse[];
  author?: string;
};

type VideoResponse = {
  id: string;
  title: string;
  cover_image: any;
  video_uri: any;
  thumbnail_url: string;
};

export const Homepage: React.FunctionComponent<any> = () => {
  const [stories, setStories] = useState<StoryReponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [carouselImages, setCarouselImages] = useState<any>([]);

  function fetchStories() {
    setLoading(true);
    fetch(process.env.REACT_APP_PROD_API + "/v1/stories?populate=*")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setStories(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function fetchCarouselDetails() {
    fetch(process.env.REACT_APP_PROD_API + "/v1/home-carousel?populate=*")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setCarouselImages(data.data.images);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchStories();
    fetchCarouselDetails();
  }, []);

  return (
    <div className="page-wrapper">
      <CarouselSimple images={carouselImages} />
      {loading ? <LoadingShell /> : <StorySuggestions stories={stories} />}
      <Spacer h={108}></Spacer>
    </div>
  );
};

const StorySuggestions = ({ stories }: { stories: StoryReponse[] }) => {
  return (
    <div>
      {stories.map((story: StoryReponse) => {
        if (story.videos.length === 0) {
          return null; // skip rendering if no videos
        }
        return (
          <chakra.div>
            <Text
              display={"inline"}
              pl={2}
              pr={4}
              mb={4}
              color={"InfoBackground"}
              fontWeight={"bold"}
              fontSize={"xl"}
            >
              {story.title}
            </Text>
            <VideoSuggestionList videoList={story.videos} />
          </chakra.div>
        );
      })}
    </div>
  );
};

const VideoSuggestionList: React.FunctionComponent<any> = ({ videoList }) => {
  return (
    <List
      display={"flex"}
      flexDirection={"row"}
      overflowX={"auto"}
      mb={10}
      gap={4}
      css={{
        "&::-webkit-scrollbar": {
          width: "2px",
          height: "0px",
        },
        "&::-webkit-scrollbar-track": {
          width: "0px",
          height: "1px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "red",
          borderRadius: "24px",
        },
      }}
    >
      {videoList.map((video: any) => {
        return (
          <ListItem key={video.id}>
            <VideoCard data={video} />
          </ListItem>
        );
      })}
    </List>
  );
};

const VideoCard: React.FunctionComponent<any> = ({ data }) => {
  const isKOriginal = data.author?.toLowerCase() === "Kidomic".toLowerCase();
  const isTrending = data.is_trending;
  return (
    <Link as={ReactLink} to={"/story/" + data.documentId}>
      <Flex
        m={2}
        alignItems="center"
        justifyContent="center"
        direction={"column"}
      >
        <Box w={32} h={32} position={"relative"}>
          {isTrending && (
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
          )}
          <Image
            overflow={"hidden"}
            fit="cover"
            height={"100%"}
            w={"100%"}
            src={
              data?.thumbnail_url
                ? process.env.REACT_APP_CDN_ENDPOINT + data?.thumbnail_url
                : "/placeholder.jpeg"
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
          {data.title}
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
