import axios, { AxiosError } from "axios";
import { PathsActionTypes } from "../constants/action_types";
import { AppDispatch } from "../store";
import { axios_config } from "../utils/config";

export const getPathsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: PathsActionTypes.REQUEST,
    });
    const { data } = await axios.get("/api/admin/path", axios_config());
    dispatch({
      type: PathsActionTypes.SUCCESS,
      payload: data,
    });
  } catch (error: AxiosError | any) {
    dispatch({
      type: PathsActionTypes.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
