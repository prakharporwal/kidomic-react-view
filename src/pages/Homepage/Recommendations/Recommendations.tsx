import { Text, chakra } from "@chakra-ui/react";
import RecommendedStoryHorizontalList from "../RecommendedStoryHorizontalList";
import { HomeRecommendationResponse } from "../../../apimodels/homepage";
import LoadingShell from "../../../components/ui/LoadingShell";
import { useEffect, useState } from "react";
import "./style.css";

export const Recommendations = () => {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<HomeRecommendationResponse[]>([]);

  function fetchRecommendations() {
    setLoading(true);

    fetch(
      process.env.REACT_APP_PROD_API + "/v1/home-recommendations?populate=*"
    )
      .then((res) => {
        if (!res.ok) throw new Error("failed fetching recommendations");
        return res.json();
      })
      .then((data) => {
        setData(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (loading) return <LoadingShell />;

  console.log("data", data);
  const recommendations = data;

  if (!recommendations) return null;
  return (
    <section className="recommendation-section">
      {recommendations.map((recommendation: HomeRecommendationResponse) => {
        if (recommendation.stories && recommendation.stories.length === 0) {
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
