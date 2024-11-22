import { Text } from "@chakra-ui/react";

export const ErrorBox = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Text color={"red.600"} fontSize={"lg"} fontWeight={"bold"}>
        Something Went Wrong
      </Text>
    </div>
  );
};
