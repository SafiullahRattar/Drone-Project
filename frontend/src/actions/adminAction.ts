import { TableColumn } from "../component/Table";
import { AdminEditFormActionTypes } from "../constants/action_types";
import { AppDispatch } from "../store";

export const adminEditFormAction = (columns: TableColumn[], data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: AdminEditFormActionTypes.ADMIN_EDITFORM_REQUEST });
    try {
      dispatch({
        type: AdminEditFormActionTypes.ADMIN_EDITFORM_SUCCESS,
        payload: { columns, data },
      });
    } catch (err) {
      dispatch({
        type: AdminEditFormActionTypes.ADMIN_EDITFORM_FAIL,
        payload: err,
      });
    }
  };
};
