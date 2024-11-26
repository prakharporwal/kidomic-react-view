import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { HomeCarouselResponse } from "../../apimodels/homepage";

interface IProps {
  images: HomeCarouselResponse[];
}

export const CarouselSimple: React.FunctionComponent<IProps> = (props) => {
  const slides = props.images;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;
  const carouselStyle = {
    transition: "all 0.5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 4000;
  const ANIMATION_DIRECTION = "right";
  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };
    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };
    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);

  return (
    <Flex
      w={"100vw"}
      // bg="#1f1f1f"
      mb={4}
      alignItems="center"
      justifyContent="flex-start"
      overflow={"hidden"}
    >
      <Flex overflow="hidden">
        <Flex
          pos="relative"
          w="full"
          h={"auto"}
          maxW={"720px"}
          {...carouselStyle}
        >
          {slides.map((slide, sid) => {
            return (
              <Box
                key={`slide-${slide.id}`}
                flex="none"
                boxSize="full"
                shadow="md"
              >
                <Link as={ReactLink} to={slide.redirectUrl}>
                  <Image
                    src={slide.image?.url}
                    alt="carousel image"
                    boxSize="full"
                    width={"full"}
                    objectFit={"cover"}
                  />
                </Link>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
