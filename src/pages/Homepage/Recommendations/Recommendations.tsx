import { Text, chakra } from "@chakra-ui/react";
import RecommendedStoryHorizontalList from "../RecommendedStoryHorizontalList";
import { HomeRecommendationResponse } from "../../../apimodels/homepage";
import { useQuery, gql } from "@apollo/client";
import LoadingShell from "../../../components/ui/LoadingShell";
import { lazy } from "react";
import "./style.css";

const GQL_QUERY_GET_HOME_RECOMMENDATIONS = gql`
  query HomeRecommendations {
    homeRecommendations {
      documentId
      title
      stories {
        documentId
        title
        author
        thumbnail {
          formats
          mime
        }
      }
    }
  }
`;

export const Recommendations = () => {
  const { loading, error, data } = useQuery(GQL_QUERY_GET_HOME_RECOMMENDATIONS);

  if (loading) return <LoadingShell />;

  if (error) {
    const ErrorBox = lazy(() => import("../../ErrorBox"));
    return <ErrorBox />;
  }

  const recommendations = data.homeRecommendations;
  return (
    <section className="recommendation-section">
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
    </section>
  );
};
