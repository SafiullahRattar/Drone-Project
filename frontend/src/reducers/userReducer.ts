import { UserList, UserSingIn } from "../constants/action_types";
import {
  user,
  UserListAction,
  UserListState,
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
      return { ...state, user: {} as user, error: "", loading: false };

    default:
      return state;
  }
};

const initUserListState: UserListState = {
  users: [] as user[],
  loading: false,
  error: "",
};

export const userListReducer = (
  state: UserListState = initUserListState,
  action: UserListAction
) => {
  switch (action.type) {
    case UserList.REQUEST:
      return { ...state, loading: true, error: "" };

    case UserList.SUCCESS:
      return { ...state, users: action.payload, loading: false };

    case UserList.FAIL:
      return { ...state, error: action.payload, loading: false };

    case UserList.RESET:
      return initUserListState;

    default:
      return state;
  }
};
