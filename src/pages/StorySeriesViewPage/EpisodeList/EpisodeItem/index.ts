import { connect } from "react-redux";
import { EpisodeItem } from "./EpisodeItem";
import { Dispatch } from "redux";
import { VideoDataState } from "../../../../redux/reducer/audioPlayerReducer";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePlayerCurrentVideo: (playerCurrentVideo: VideoDataState) =>
    dispatch({
      type: "audioplayer/updatePlayerCurrentVideo",
      payload: { playerCurrentVideo },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeItem);
