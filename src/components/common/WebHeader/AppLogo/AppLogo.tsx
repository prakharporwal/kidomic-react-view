import { Link as ReactLink } from "react-router-dom";
import { Image, Link } from "@chakra-ui/react";
interface IProps {
  dark?: boolean;
}
export const AppLogo: React.FunctionComponent<IProps> = ({ dark }) => {
  return (
    <Link
      as={ReactLink}
      href="/"
      display={"flex"}
      flexDirection={"row"}
      alignItems={"flex-end"}
      gap={1}
      textUnderlineOffset={0}
    >
      <Image
        src={!!dark ? "/dark-storyplanet-logo.png" : "/storyplanet-logo.png"}
        alt="Logo"
        w={28}
        h={12}
      />
      {/* <Box p={2} px={1} pb={0} border={"1px solid white"} background={"#F80"}>
        <Text
          color="white"
          fontSize="2xl"
          fontWeight={"bold"}
          fontFamily={"fantasy"}
          lineHeight={4}
        >
          K
        </Text>
      </Box> */}
      {/* <Text
        color="white"
        fontSize="xl"
        fontWeight={"extrabold"}
        fontFamily={"fantasy"}
        lineHeight={4}
      >
        idomic
      </Text> */}
    </Link>
  );
};
