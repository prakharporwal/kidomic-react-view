import { StorySeriesViewPage } from "./StorySeriesViewPage";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";

const mapStateToProps = (state: RootState) => ({
  playing: state.audioplayer.playing,
  playerCurrentVideo: state.audioplayer.playerCurrentVideo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePlayerCurrentVideo: (playerCurrentVideo: string) =>
    dispatch({
      type: "audioplayer/updatePlayerCurrentVideo",
      payload: { playerCurrentVideo },
    }),
  toggleAudioPlay: (playing: boolean) => {
    dispatch({ type: "audioplayer/toggleAudioPlay", payload: { playing } });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StorySeriesViewPage);
