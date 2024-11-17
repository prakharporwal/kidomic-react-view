import { Spinner } from "@chakra-ui/react";
import "./loadingshell.css";

const LoadingShell = () => {
  return (
    <div className="loading-shell">
      <Spinner size={"md"} color={"orange.300"} />
    </div>
  );
};
export { LoadingShell };
