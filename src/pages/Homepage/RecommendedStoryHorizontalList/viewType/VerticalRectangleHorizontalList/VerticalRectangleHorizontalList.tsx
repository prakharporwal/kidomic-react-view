import { List, ListItem } from "@chakra-ui/react";
import { StoryReponse } from "../../../../../apimodels/homepage";

interface IProps {
  storyList: StoryReponse[] | undefined;
  viewType?: string;
}

export const VerticalRectangleHorizontalList: React.FunctionComponent<
  IProps
> = ({ storyList }) => {
  if (!storyList) {
    return null;
  }
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
      {storyList.map((story: StoryReponse) => {
        return (
          <ListItem key={story.id}>
            <div>{story.title}</div>
          </ListItem>
        );
      })}
    </List>
  );
};
