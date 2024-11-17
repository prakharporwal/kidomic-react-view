import PlayerControls from "./PlayerControls";
import "./style.css";

export const AudioPlayer: React.FunctionComponent<any> = (props) => {
  console.log(props);
  return (
    <div
      className="audio-player"
      style={{ display: props.playerCurrentAudio ? "block" : "none" }}
    >
      <PlayerControls />
    </div>
  );
};
