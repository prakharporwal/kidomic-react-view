import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";

export const CarouselSimple = (props) => {
  const slides = props.images;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 3000;
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
      w={"calc(100vw - 24px)"}
      bg="#1a1a1a"
      _dark={{
        bg: "#3e3e3e",
      }}
      my={4}
      mx={2}
      borderRadius={8}
      borderWidth={1}
      alignItems="center"
      justifyContent="center"
      overflow={"hidden"}
    >
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h="200px" w="full" {...carouselStyle}>
          {slides.map((image, sid) => (
            <Box
              key={`slide-${image.id}`}
              flex="none"
              boxSize="full"
              shadow="md"
            >
              <Link as={ReactLink} to={"/story/" + image.id}>
                <Image
                  src={image.url}
                  alt="carousel image"
                  boxSize="full"
                  backgroundSize="cover"
                />
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
