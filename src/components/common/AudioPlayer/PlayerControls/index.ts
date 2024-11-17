import { PlayerControls } from "./PlayerControls";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../../redux/reducer/rootReducer";

const mapStateToProps = (state: RootState) => ({
  isPlaying: state.audioplayer.playing,
  currentPlayerAudio: state.audioplayer.playerCurrentAudio,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePlayerCurrentAudio: (playerCurrentAudio: string) =>
    dispatch({
      type: "audioplayer/setCurrentSong",
      payload: { playerCurrentAudio },
    }),
  toggleAudioPlay: (isPlaying: boolean) => {
    dispatch({ type: "audioplayer/toggleAudioPlay", payload: { isPlaying } });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
