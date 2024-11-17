import { Outlet } from "react-router-dom";
import WebHeader from "../WebHeader";
import AudioPlayer from "../common/AudioPlayer";
import "./applayout.css";

export const AppPlayerLayout = () => {
  return (
    <div className="app-layout">
      <WebHeader />
      <Outlet />
      <AudioPlayer />
    </div>
  );
};
