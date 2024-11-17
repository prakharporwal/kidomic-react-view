import { AppPlayerLayout } from "./AppPlayerLayout";
import { Dispatch } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleAudioPlay: (playing: boolean) => {
    dispatch({ type: "audioplayer/toggleAudioPlay", payload: { playing } });
  },
});

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPlayerLayout);