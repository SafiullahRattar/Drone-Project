import axios from "axios";
import { AnimationActionTypes } from "../constants/action_types";
import { axios_config } from "../utils/config";

export const setAnimationSpeedAction = (speed: number) => ({
  type: AnimationActionTypes.SET_SPEED,
  payload: speed,
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
    const path = data[0].path;
    console.log(path)
    const coordinates = path.map((p: any) => {
      return { x: p.coordinates[0], y: p.coordinates[1] };
    });
    const time_elapsed = path.map((p: any) => p.time_elapsed);
    const weight_container = path.map((p: any) => 2);

    dispatch({
      type: AnimationActionTypes.SET_DATA,
      payload: {
        coordinates,
        time_elapsed,
        weight_container,
      },
    });
  } catch (error: any) {
    console.log(error)
    dispatch({
      type: AnimationActionTypes.GET_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
