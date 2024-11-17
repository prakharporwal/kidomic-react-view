import { PlayerControls } from "./PlayerControls";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../../redux/reducer/rootReducer";

const mapStateToProps = (state: RootState) => ({
  playing: state.audioplayer.playing,
  playerCurrentAudio: state.audioplayer.playerCurrentAudio,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePlayerCurrentAudio: (playerCurrentAudio: string) =>
    dispatch({
      type: "audioplayer/updatePlayerCurrentAudio",
      payload: { playerCurrentAudio },
    }),
  toggleAudioPlay: (playing: boolean) => {
    dispatch({ type: "audioplayer/toggleAudioPlay", payload: { playing } });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
