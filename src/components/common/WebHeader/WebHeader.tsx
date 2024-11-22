import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import AppLogo from "./AppLogo";
function shouldShowBackButton(path: string): boolean {
  console.log(path);
  switch (path) {
    case "/":
      return false;
  }
  return true;
}

export default function WebHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = shouldShowBackButton(location.pathname);

  return (
    <Box>
      <Flex
        position={"fixed"}
        height={"14"}
        w={"full"}
        bg={"black"}
        zIndex={1000}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={1}
      >
        {showBackButton ? (
          <Box>
            <FiChevronLeft
              color="white"
              strokeWidth={1.2}
              size={32}
              onClick={() => {
                console.log(location);
                if (location.key !== "default") navigate(-1);
                else navigate("/");
              }}
            />
          </Box>
        ) : (
          <Box marginLeft={4}></Box>
        )}
        <AppLogo />
      </Flex>
      {/* Fix: make desktop compatible responsive: compatible warning */}
      <Flex
        position={"absolute"}
        display={"block"}
        top={14}
        textAlign={"center"}
        color={"white"}
        zIndex={{ md: -1000, lg: 1000 }}
        background={"red.500"}
        height={6}
        width={"100vw"}
      >
        we currently support mobile device. view in mobile for best experience
      </Flex>
    </Box>
  );
}
