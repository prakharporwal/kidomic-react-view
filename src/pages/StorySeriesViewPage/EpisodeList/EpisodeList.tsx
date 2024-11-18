import { List, ListItem } from "@chakra-ui/react";
import EpisodeItem from "./EpisodeItem";
import { VideoResponse } from "../../../apimodels/homepage";

interface IProps {
  episodes: VideoResponse[];
}

export const EpisodeList: React.FunctionComponent<IProps> = ({ episodes }) => {
  return (
    <List display={"flex"} flexDir={"column"} gap={6} mx={4} my={8}>
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
