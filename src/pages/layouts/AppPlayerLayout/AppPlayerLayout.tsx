import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import WebHeader from "../../../components/common/WebHeader";
import AudioPlayer from "../../../components/common/AudioPlayer";

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
