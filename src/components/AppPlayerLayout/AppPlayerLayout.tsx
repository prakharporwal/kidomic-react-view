import { Outlet } from "react-router-dom";
import WebHeader from "../WebHeader";
import AudioPlayer from "../common/AudioPlayer";
import "./applayout.css";
import { useEffect } from "react";

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
