import { List, ListItem, Text } from "@chakra-ui/react";
import EpisodeItem from "./EpisodeItem";
import { VideoResponse } from "../../../apimodels/homepage";

interface IProps {
  episodes: VideoResponse[];
}

export const EpisodeList: React.FunctionComponent<IProps> = ({ episodes }) => {
  return (
    <List display={"flex"} flexDir={"column"} gap={4} mx={4} my={4}>
      <Text fontSize={"md"} textAlign={"left"} fontWeight={"bold"} mb={2}>
        Episodes -
      </Text>
      {episodes.map((episode: VideoResponse) => {
        return (
          <ListItem>
            <EpisodeItem episode={episode} />
          </ListItem>
        );
      })}
    </List>
  );
};
