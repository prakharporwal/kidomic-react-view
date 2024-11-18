import { Outlet } from "react-router-dom";
import WebHeader from "../../../components/common/WebHeader";

export const AuthPageLayout: React.FunctionComponent<any> = (props) => {
  return (
    <div className="app-layout">
      <WebHeader />
      <Outlet />
    </div>
  );
};
