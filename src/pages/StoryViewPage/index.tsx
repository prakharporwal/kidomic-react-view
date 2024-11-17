import { StoryViewPage } from "./StoryViewPage";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";

const mapStateToProps = (state: RootState) => ({
  isPlaying: state.audioplayer.playing,
  currentSong: state.audioplayer.currentSong,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentSong: (currentSong: string) =>
    dispatch({
      type: "audioplayer/setCurrentSong",
      payload: { currentSong },
    }),
  toggleAudioPlay: (isPlaying: boolean) => {
    dispatch({ type: "audioplayer/toggleAudioPlay", payload: { isPlaying } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryViewPage);
