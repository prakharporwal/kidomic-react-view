import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer/rootReducer";
import { VideoPlayer } from "./VideoPlayer";

const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state: RootState) => ({
  playing: state.audioplayer.playing,
  playerCurrentVideo: state.audioplayer.playerCurrentVideo,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
