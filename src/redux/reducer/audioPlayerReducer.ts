import { createSlice } from "@reduxjs/toolkit";
import { ga4Utils } from "../../utils/GoogleAnalyticsUtils";

export interface VideoDataState {
  image: string;
  uri: string;
  name?: string;
  videoId: string;
}
export interface AudioPlayerState {
  playing: boolean;
  playerCurrentVideo: VideoDataState;
}

const initialState: AudioPlayerState = {
  playing: false,
  playerCurrentVideo: { image: "/placeholder.png", uri: "", videoId: "" },
};

const audioplayerSlice = createSlice({
  name: "audioplayer",
  initialState: initialState,
  reducers: {
    toggleAudioPlay: (state, action) => {
      state.playing = action.payload.playing;
    },
    updatePlayerCurrentVideo: (state, action) => {
      // do nothing if same video is clicked
      if (
        state.playerCurrentVideo.videoId ===
        action.payload.playerCurrentVideo.videoId
      )
        return;

      state.playing = false;
      state.playerCurrentVideo = action.payload.playerCurrentVideo;
      state.playing = true;

      const ga4event = {
        event: "video_play",
        video_name: state.playerCurrentVideo.name,
        video_id: state.playerCurrentVideo.videoId,
      };
      console.log(ga4event);
      ga4Utils.push(ga4event);
    },
  },
});

// Action creators are generated for each case reducer function
export default audioplayerSlice.reducer;
