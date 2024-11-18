import { Text, chakra } from "@chakra-ui/react";
import RecommendedStoryHorizontalList from "../RecommendedStoryHorizontalList";
import { HomeRecommendationResponse } from "../../../apimodels/homepage";

interface IProps {
  recommendations: HomeRecommendationResponse[];
}

export const Recommendations = ({ recommendations }: IProps) => {
  return (
    <div>
      {recommendations.map((recommendation: HomeRecommendationResponse) => {
        if (recommendation.stories.length === 0) {
          return null; // skip rendering if no videos
        }
        return (
          <chakra.div key={recommendation.id}>
            <Text
              display={"inline"}
              pl={2}
              pr={4}
              mb={4}
              color={"InfoBackground"}
              fontWeight={"bold"}
              fontSize={"xl"}
            >
              {recommendation.title}
            </Text>
            <RecommendedStoryHorizontalList
              storyList={recommendation.stories}
            />
          </chakra.div>
        );
      })}
    </div>
  );
};
