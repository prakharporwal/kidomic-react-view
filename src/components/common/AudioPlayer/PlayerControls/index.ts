import { PlayerControls } from "./PlayerControls";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../../redux/reducer/rootReducer";
import { VideoDataState } from "../../../../redux/reducer/audioPlayerReducer";

const mapStateToProps = (state: RootState) => ({
  playing: state.audioplayer.playing,
  playerCurrentVideo: state.audioplayer.playerCurrentVideo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePlayerCurrentVideo: (playerCurrentVideo: VideoDataState) =>
    dispatch({
      type: "audioplayer/updatePlayerCurrentVideo",
      payload: { playerCurrentVideo },
    }),
  toggleAudioPlay: (playing: boolean) => {
    dispatch({ type: "audioplayer/toggleAudioPlay", payload: { playing } });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
