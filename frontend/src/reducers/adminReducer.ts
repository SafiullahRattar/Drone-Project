import { AdminEditFormActionTypes } from "../constants/action_types";
import {
  AdminEditFormAction,
  AdminEditFormState,
} from "../constants/interfaces";

const initialStateAdminEditForm: AdminEditFormState = {
  error: "",
  loading: false,
  data: {},
  columns: [],
  apiForUpdate: "",
  success: false,
  shouldGoBack: false,
};
export const adminEditFormReducer = (
  state: AdminEditFormState = initialStateAdminEditForm,
  action: AdminEditFormAction
) => {
  switch (action.type) {
    case AdminEditFormActionTypes.ADMIN_EDITFORM_REQUEST:
      return { ...state, loading: true, shouldGoBack: false };
    case AdminEditFormActionTypes.ADMIN_EDITFORM_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        columns: action.payload.columns,
        apiForUpdate: action.payload.apiForUpdate,
        loading: false,
      };
    case AdminEditFormActionTypes.ADMIN_EDITFORM_FAIL:
      return { ...state, error: action.payload, loading: false };
    case AdminEditFormActionTypes.ADMIN_EDITFORM_RESET:
      return initialStateAdminEditForm;
      case AdminEditFormActionTypes.ADMIN_SHOULD_GO_BACK:
        return { ...state, shouldGoBack: true };
    default:
      return state;
  }
};
