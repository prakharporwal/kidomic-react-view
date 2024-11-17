import WebHeader from "../WebHeader";
import AudioPlayer from "../common/AudioPlayer";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./applayout.css";

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
      <AudioPlayer />
    </div>
  );
};
