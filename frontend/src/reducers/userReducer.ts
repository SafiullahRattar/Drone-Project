import { UserEdit, UserSingIn } from "../constants/action_types";
import {
  user,
  UserEditAction,
  UserEditState,
  userSignInAction,
  userSignInState,
} from "../constants/interfaces";

const initUserSignInState: userSignInState = {
  user: {} as user,
  error: "",
  loading: false,
};
export const userSignInReducer = (
  state: userSignInState = initUserSignInState,
  action: userSignInAction
) => {
  switch (action.type) {
    case UserSingIn.REQUEST:
      return { ...state, loading: true };

    case UserSingIn.SUCCESS:
      return { ...state, user: action.payload, loading: false };

    case UserSingIn.FAIL:
      return { ...state, error: action.payload, loading: false };

    case UserSingIn.LOGOUT:
      // return reducers(undefined, action)
      return { ...state, user: null, error: "", loading: false };

    default:
      return state;
  }
};

// const initUserEditState: UserEditState = {
//   success: false,
//   error: "",
//   loading: false,
// };

// export const userEditReducer = (
//   state: UserEditState = initUserEditState,
//   action: UserEditAction
// ) => {
//   switch (action.type) {
//     case UserEdit.REQUEST:
//       return { ...state, loading: true, error: "", success: false };

//     case UserEdit.SUCCESS:
//       return { ...state, success: true, loading: false };

//     case UserEdit.FAIL:
//       return { ...state, error: action.payload, loading: false };

//     case UserEdit.RESET:
//       return initUserListState;

//     default:
//       return state;
//   }
// };
