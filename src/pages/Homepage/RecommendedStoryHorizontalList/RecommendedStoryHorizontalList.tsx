import { List, ListItem } from "@chakra-ui/react";
import StoryCard from "../StoryCard";
import { StoryReponse } from "../../../apimodels/homepage";

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
      py={2}
      gap={4}
      css={{
        "&::-webkit-scrollbar": {
          width: "2px",
          height: "1px",
        },
        "&::-webkit-scrollbar-track": {
          width: "0px",
          height: "1px",
        },
        "&::-webkit-scrollbar-thumb": {
          height: "1px",
          borderRadius: "12px",
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
