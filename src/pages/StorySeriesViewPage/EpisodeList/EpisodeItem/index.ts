import { connect } from "react-redux";
import { EpisodeItem } from "./EpisodeItem";
import { Dispatch } from "redux";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePlayerCurrentAudio: (playerCurrentAudio: string) =>
    dispatch({
      type: "audioplayer/updatePlayerCurrentAudio",
      payload: { playerCurrentAudio },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeItem);
