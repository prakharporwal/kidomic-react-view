import PlayerControls from "./PlayerControls";
import "./style.css";

export const AudioPlayer: React.FunctionComponent<any> = (props) => {
  return (
    <div className="audio-player">
      <PlayerControls />
    </div>
  );
};
