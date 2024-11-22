import { createSlice } from "@reduxjs/toolkit";

export interface VideoDataState {
  image: string;
  uri: string;
  name?: string;
}
export interface AudioPlayerState {
  playing: boolean;
  playerCurrentVideo: VideoDataState;
}

const initialState: AudioPlayerState = {
  playing: false,
  playerCurrentVideo: { image: "/placeholder.png", uri: "" },
};

const audioplayerSlice = createSlice({
  name: "audioplayer",
  initialState: initialState,
  reducers: {
    toggleAudioPlay: (state, action) => {
      state.playing = action.payload.playing;
    },
    updatePlayerCurrentVideo: (state, action) => {
      state.playing = false;
      state.playerCurrentVideo = action.payload.playerCurrentVideo;
      state.playing = true;
    },
  },
});

// Action creators are generated for each case reducer function
export default audioplayerSlice.reducer;
