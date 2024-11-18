import { Box, Flex, Image } from "@chakra-ui/react";

interface IProps {
  size: number;
  src: string;
  alt?: string;
}

export const SquareImage: React.FunctionComponent<IProps> = ({
  size,
  src,
  alt,
}) => {
  return (
    <Flex alignItems="center" justifyContent="center" direction={"column"}>
      <Box w={size} h={size} position={"relative"}>
        <Image
          overflow={"hidden"}
          fit="cover"
          height={"100%"}
          w={"100%"}
          src={src || "/placeholder.jpeg"}
          alt={alt || "sqr img"}
        />
      </Box>
    </Flex>
  );
};
