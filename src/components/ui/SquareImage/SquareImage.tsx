import { Box, Image } from "@chakra-ui/react";

interface IProps {
  data: any;
  alt?: string;
}

export const SquareImage: React.FunctionComponent<IProps> = ({ data, alt }) => {
  const src =
    data?.formats?.medium?.url ||
    data?.url ||
    data?.formats?.thumbnail?.url ||
    "/placeholder.png";

  return (
    <Image
      overflow={"hidden"}
      fit="cover"
      height={"100%"}
      w={"100%"}
      src={src || "/placeholder.png"}
      alt={alt || "sqr img"}
    />
  );
};
