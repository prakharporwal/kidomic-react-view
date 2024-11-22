import { connect } from "react-redux";
import { VideoPlayer } from "./VideoPlayer";
import { RootState } from "../../redux/reducer/rootReducer";
import { Dispatch } from "redux";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleAudioPlay: (playing: boolean) => {
    dispatch({ type: "audioplayer/toggleAudioPlay", payload: { playing } });
  },
});

const mapStateToProps = (state: RootState) => ({
  playing: state.audioplayer.playing,
  playerCurrentVideo: state.audioplayer.playerCurrentVideo,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
