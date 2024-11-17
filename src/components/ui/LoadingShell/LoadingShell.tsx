import { Spinner } from "@chakra-ui/react";

const LoadingShell = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "75vh",
        width: "100vw",
        margin: "4px",
        padding: "8px",
        color: "white",
      }}
    >
      <Spinner size={"md"} color={"colorPalette.600"} />
    </div>
  );
};
export { LoadingShell };
