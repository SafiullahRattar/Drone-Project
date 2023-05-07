import { AnimationActionTypes } from "../constants/action_types";

export const setAnimationSpeedAction = (speed: number) => ({
  type: AnimationActionTypes.SET_SPEED,
  payload: speed,
});

export const setAnimationSlectedIndex = (index: number) => ({
  type: AnimationActionTypes.SET_SELECTED_INDEX,
  payload: index,
});
