import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Link, Text } from "@chakra-ui/react";

export const AppLogo = () => {
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
      <Image src="/kidomic-logo-long.png" alt="Logo" w={"96px"} h={8} />
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
