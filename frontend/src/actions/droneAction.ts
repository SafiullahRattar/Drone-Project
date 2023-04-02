import axios, { AxiosError } from "axios";
import { AdminDroneListActionTypes } from "../constants/action_types";
import { AppDispatch } from "../store";

// Get Drone List
export const getDroneListAdminAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: AdminDroneListActionTypes.REQUEST,
    });

    const { data } = await axios.get("/api/admin/drones");

    dispatch({
      type: AdminDroneListActionTypes.SUCCESS,
      payload: data,
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
