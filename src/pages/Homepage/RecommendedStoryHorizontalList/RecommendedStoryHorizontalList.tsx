import { List, ListItem } from "@chakra-ui/react";
import StoryCard from "../StoryCard";
import { StoryReponse } from "../../../apimodels/homepage";
import { VerticalRectangleHorizontalList } from "./viewType/VerticalRectangleHorizontalList";

interface IProps {
  storyList: StoryReponse[] | undefined;
  viewType?: string;
}

export const RecommendedStoryHorizontalList: React.FunctionComponent<
  IProps
> = ({ storyList, viewType }) => {
  if (!storyList) {
    return null;
  }

  // switch (viewType) {
  //   case "VERTICAL_RECTANGLE":
  //     return <VerticalRectangleHorizontalList storyList={storyList} />;
  // }

  return (
    <List
      display={"flex"}
      flexDirection={"row"}
      overflowX={"auto"}
      mb={8}
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
      {storyList.map((story: any) => {
        return (
          <ListItem key={story.id}>
            <StoryCard story={story} />
          </ListItem>
        );
      })}
    </List>
  );
};
