import axios, { AxiosError } from "axios";
import {
  AdminDroneListActionTypes,
  AdminDroneUpdateActionTypes,
  AdminEditFormActionTypes,
} from "../constants/action_types";
import { AppDispatch } from "../store";
import { axios_config } from "../utils/config";

// Get Drone List
export const getDroneListAdminAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: AdminDroneListActionTypes.REQUEST,
    });

    const { data } = await axios.get("/api/admin/drones", axios_config());

    dispatch({
      type: AdminDroneListActionTypes.SUCCESS,
      payload: data.drones,
    });
  } catch (error: AxiosError | any) {
    dispatch({
      type: AdminDroneListActionTypes.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update drone
export const updateDroneAdminAction =
  (drone: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: AdminDroneUpdateActionTypes.REQUEST,
      });

      const { data } = await axios.put(
        `/api/admin/drones/${drone._id}`,
        drone,
        axios_config()
      );

      dispatch({
        type: AdminDroneUpdateActionTypes.SUCCESS,
        payload: data,
      });
      dispatch({
        type: AdminEditFormActionTypes.ADMIN_SHOULD_GO_BACK,
      });
    } catch (error: AxiosError | any) {
      dispatch({
        type: AdminDroneUpdateActionTypes.FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
