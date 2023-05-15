import axios from "axios";
import { AnimationActionTypes } from "../constants/action_types";
import { axios_config } from "../utils/config";

export const setAnimationSpeedAction = (speed: number) => ({
  type: AnimationActionTypes.SET_SPEED,
  payload: speed,
});

export const setAnimationScaleXAction = (scale: number) => ({
  type: AnimationActionTypes.SET_SCALE_X,
  payload: scale,
});

export const setAnimationScaleYAction = (scale: number) => ({
  type: AnimationActionTypes.SET_SCALE_Y,
  payload: scale,
});

export const setAnimationSlectedIndex = (index: number) => ({
  type: AnimationActionTypes.SET_SELECTED_INDEX,
  payload: index,
});

export const getAnimationDataAction = () => async (dispatch: any) => {
  try {
    dispatch({
      type: AnimationActionTypes.GET_DATA_REQUEST,
    });
    const { data } = await axios.get("/api/admin/path", axios_config());
    const path = data[data.length - 1].path;
    const scale = 0.1;
    const coordinates: { x: number; y: number }[] = [];
    const time_elapsed: any[] = [];
    const weight_container: number[] = [];
    path.forEach((p: any) => {
      coordinates.push({
        x: parseFloat((p.coordinates[0] * scale).toFixed(2)),
        y: parseFloat((p.coordinates[1] * scale).toFixed(2)),
      });
      time_elapsed.push(Math.ceil(p.time_elapsed));
      // if x,y is 0, then weight is 0, else 2
      weight_container.push(
        p.coordinates[0] === 0 && p.coordinates[1] === 0 ? 0 : 2
      );
    });

    //move the last element to the beginning
    coordinates.unshift(coordinates.pop()!);
    time_elapsed.unshift(time_elapsed.pop()!);
    weight_container.unshift(weight_container.pop()!);

    dispatch({
      type: AnimationActionTypes.SET_DATA,
      payload: {
        coordinates,
        time_elapsed,
        weight_container,
      },
    });
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: AnimationActionTypes.GET_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
