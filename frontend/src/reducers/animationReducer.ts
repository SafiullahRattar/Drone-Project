import { AnimationActionTypes } from "../constants/action_types";
import { AnimationState } from "../constants/interfaces";

const initialAnimationState: AnimationState = {
  loading: true,
  error: "",
  coordinates: [
    { x: 0, y: 0 },
    { x: -1, y: 3 },
    { x: 3, y: 6 },
    { x: 0, y: 0 },
    { x: 2, y: -9 },
    // { x: 0, y: 0 },
  ],
  weight_container: [2, 3, 0, 4, 0, 6],
  time_elapsed: [10, 15, 30, 40, 45, 60],
  selected_index: 0,
  drone: {},
  speed: 1,
  scaleX: 300,
  scaleY: 300,
};

export const animationReducer = (
  state: AnimationState = initialAnimationState,
  action: any
) => {
  switch (action.type) {
    case AnimationActionTypes.REQUEST:
      return { ...state, loading: true, error: "" };
    case AnimationActionTypes.SET_DATA:
      return {
        ...state,
        coordinates: action.payload.coordinates,
        weight_container: action.payload.weight_container,
        time_elapsed: action.payload.time_elapsed,
        loading: false,
      };
    case AnimationActionTypes.SET_SELECTED_INDEX:
      return { ...state, selected_index: action.payload };
    case AnimationActionTypes.ERROR:
      return { ...state, error: action.payload, loading: false };
    case AnimationActionTypes.SET_SPEED:
      return {
        ...state,
        speed: action.payload,
      };
    case AnimationActionTypes.SET_SCALE_X:
      return {
        ...state,
        scaleX: action.payload,
      };
    case AnimationActionTypes.SET_SCALE_Y:
      return {
        ...state,
        scaleY: action.payload,
      };
    default:
      return state;
  }
};
