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
    // console.log(path);
    const scale = 0.1;
    // const coordinates = path.map((p: any) => {
    //   return { x: (p.coordinates[0] * scale ).toFixed(2), y: (p.coordinates[1] * scale).toFixed(2) };
    // });
    // const time_elapsed = path.map((p: any) => p.time_elapsed);
    // const weight_container = path.map((p: any) => 2);
    //add a {x:0,y:0} at the beginning of the coordinates array
    const coordinates = [{ x: 0, y: 0 }];
    const time_elapsed = [0];
    const weight_container = [0];
    path.forEach((p: any) => {
      coordinates.push({
        x: parseFloat((p.coordinates[0] * scale).toFixed(2)),
        y: parseFloat((p.coordinates[1] * scale).toFixed(2)),
      });
      time_elapsed.push(p.time_elapsed);
      // if x,y is 0, then weight is 0, else 2
      weight_container.push(p.coordinates[0] === 0 && p.coordinates[1] === 0 ? 0 : 2);
      

    });
    console.log(coordinates)
    console.log(time_elapsed)
    console.log(weight_container)

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
