import { PathsActionTypes } from "../constants/action_types";

const initPathsState = {
  paths: [],
  loading: false,
  error: null,
};

export const pathsReducer = (state: any = initPathsState, action: any) => {
  switch (action.type) {
    case PathsActionTypes.REQUEST:
      return { ...state, loading: true, error: null };
    case PathsActionTypes.SUCCESS:
      return { ...state, paths: action.payload, loading: false };
    case PathsActionTypes.FAIL:
      return { ...state, error: action.payload, loading: false };
    case PathsActionTypes.RESET:
      return initPathsState;
    default:
      return state;
  }
};
