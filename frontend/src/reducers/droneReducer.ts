import { AdminDroneListActionTypes } from "../constants/action_types";

const initDroneListState = {
  drones: [],
  loading: false,
  error: "",
};

export const droneListReducer = (
  state = initDroneListState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case AdminDroneListActionTypes.REQUEST:
      return { ...state, loading: true, error: "" };

    case AdminDroneListActionTypes.SUCCESS:
      return { ...state, drones: action.payload, loading: false };

    case AdminDroneListActionTypes.FAIL:
      return { ...state, error: action.payload, loading: false };

    case AdminDroneListActionTypes.RESET:
      return initDroneListState;

    default:
      return state;
  }
};

export const droneUpdateRducer = (
  state = { drone: {}, loading: false, error: "", success: false },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case AdminDroneListActionTypes.REQUEST:
      return { loading: true };
    case AdminDroneListActionTypes.SUCCESS:
      return { loading: false, success: true, drone: action.payload };
    case AdminDroneListActionTypes.FAIL:
      return { loading: false, error: action.payload };
    case AdminDroneListActionTypes.RESET:
      return { drone: {} };
    default:
      return state;
  }
};
