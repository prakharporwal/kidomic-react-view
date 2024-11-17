import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer/rootReducer";
import { AudioPlayer } from "./AudioPlayer";

const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state: RootState) => ({
  playing: state.audioplayer.playing,
  playerCurrentAudio: state.audioplayer.playerCurrentAudio,
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
