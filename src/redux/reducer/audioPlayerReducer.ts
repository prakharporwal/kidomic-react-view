import { createSlice } from "@reduxjs/toolkit";

export interface AudioPlayerState {
  playing: boolean;
  playerCurrentAudio: string;
}

const initialState: AudioPlayerState = {
  playing: false,
  // playerCurrentAudio: window.localStorage.getItem("playerCurrentAudio") || "",
  // on second render avoid keeping the player
  playerCurrentAudio: "",
};

const audioplayerSlice = createSlice({
  name: "audioplayer",
  initialState: initialState,
  reducers: {
    toggleAudioPlay: (state, action) => {
      console.log(state.playing);
      state.playing = action.payload.playing;
    },
    updatePlayerCurrentAudio: (state, action) => {
      console.log(action);
      state.playerCurrentAudio = action.payload.playerCurrentAudio;
      window.localStorage.setItem(
        "playerCurrentAudio",
        action.payload.playerCurrentAudio
      );
    },
  },
});

// Action creators are generated for each case reducer function
export default audioplayerSlice.reducer;
