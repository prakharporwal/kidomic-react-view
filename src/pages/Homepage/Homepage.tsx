import { Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoadingShell from "../../components/ui/LoadingShell";
import CarouselSimple from "../../components/CarouselSimple";
import "./styles.css";
import Recommendations from "./Recommendations";
import {
  HomeCarouselResponse,
  HomeRecommendationResponse,
} from "../../apimodels/homepage";

export const HomePage: React.FunctionComponent<any> = () => {
  const [recommendations, setRecommendations] = useState<
    HomeRecommendationResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [carouselImages, setCarouselImages] = useState<
    HomeCarouselResponse[] | null
  >(null);

  function fetchStories() {
    setLoading(true);
    fetch(
      process.env.REACT_APP_PROD_API + "/v1/home-recommendations?populate=*"
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setRecommendations(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function fetchCarouselDetails() {
    fetch(process.env.REACT_APP_PROD_API + "/v1/home-carousels?populate=*")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setCarouselImages(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCarouselDetails();
    fetchStories();
  }, []);

  if (!carouselImages) {
    return null;
  }

  return (
    <div className="page-wrapper">
      <CarouselSimple images={carouselImages} />
      {loading ? (
        <LoadingShell />
      ) : (
        <Recommendations recommendations={recommendations} />
      )}
      <Spacer h={108}></Spacer>
    </div>
  );
};
