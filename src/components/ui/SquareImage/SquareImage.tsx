import { Box, Image } from "@chakra-ui/react";
import { extractImageUrl } from "../../../utils/imageUtils";

interface IProps {
  data: any;
  alt?: string;
}

export const SquareImage: React.FunctionComponent<IProps> = ({ data, alt }) => {
  const src = extractImageUrl(data);

  return (
    <Image
      overflow={"hidden"}
      fit="cover"
      h={"full"}
      w={"full"}
      src={src || "/placeholder.png"}
      alt={alt || "sqr img"}
    />
  );
};
