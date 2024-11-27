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

  function fetchCarouselDetails() {
    setLoading(true);
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
  }, []);

  if (!carouselImages) {
    return null;
  }

  return (
    <div className="page-wrapper">
      {/* {loading ? <LoadingShell /> : <CarouselSimple images={carouselImages} />} */}
      <Recommendations />
      <Spacer h={108}></Spacer>
    </div>
  );
};
