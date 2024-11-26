import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import WebHeader from "../../../components/common/WebHeader";
import VideoPlayer from "../../../components/common/VideoPlayer";

export const AppPlayerLayout: React.FunctionComponent<any> = (props) => {
  useEffect(() => {
    return () => {
      props.toggleAudioPlay(false);
    };
  });

  return (
    <div className="app-layout">
      <WebHeader />
      <Outlet />
      <VideoPlayer />
    </div>
  );
};
