import { combineReducers } from "@reduxjs/toolkit";
import audioplayerReducer, { AudioPlayerState } from "./audioPlayerReducer";

export interface RootState {
  audioplayer: AudioPlayerState;
}

const rootReducer = combineReducers({
  audioplayer: audioplayerReducer,
});

export default rootReducer;
