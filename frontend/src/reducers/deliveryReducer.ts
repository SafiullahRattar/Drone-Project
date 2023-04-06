import {
  DeliveryActionTypes,
  DeliveryBackend,
  DeliveryBackendState,
  DeliveryListActionTypes,
  DeliveryUserListAction,
  DeliveryUserListActionTypes,
} from "../constants/action_types";
import {
  Delivery,
  GetDeliveryByIdAction,
  GetAllDeliveriesAction,
  GetDeliveriesByUserAction,
  GetDeliveriesByStatusAction,
  PostNewDeliveryAction,
  UpdateDeliveryStatusAction,
  DeliveryListAction,
} from "../constants/interfaces";

const initialState: Delivery = {
  receiver: "",
  date: "",
  priority: "",
  //   status: "",
  pickup_location: [0, 0],
  drop_location: [0, 0],
  distance: 0,
};

export function deliveryReducer(
  state = initialState,
  action:
    | GetDeliveryByIdAction
    | GetAllDeliveriesAction
    | GetDeliveriesByUserAction
    | GetDeliveriesByStatusAction
    | PostNewDeliveryAction
    | UpdateDeliveryStatusAction
) {
  switch (action.type) {
    case DeliveryActionTypes.GET_DELIVERY_BY_ID:
      return {
        ...state,
        ...action.payload,
      };
    case DeliveryActionTypes.GET_ALL_DELIVERIES:
      return {
        ...state,
        ...action.payload,
      };
    case DeliveryActionTypes.GET_DELIVERIES_BY_USER:
      return {
        ...state,
        ...action.payload,
      };
    case DeliveryActionTypes.GET_DELIVERIES_BY_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    case DeliveryActionTypes.POST_NEW_DELIVERY:
      return {
        ...state,
        ...action.payload,
      };
    case DeliveryActionTypes.UPDATE_DELIVERY_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

const initialStateDeliveryList: DeliveryBackendState = {
  deliveries: [] as DeliveryBackend[],
  loading: false,
  error: null,
};

export const deliveryUserListReducer = (
  state = initialStateDeliveryList,
  action: DeliveryUserListAction
) => {
  switch (action.type) {
    case DeliveryUserListActionTypes.FETCH_DELIVERIES:
      return { ...state, loading: true };
    case DeliveryUserListActionTypes.FETCH_DELIVERIES_SUCCESS:
      return {
        ...state,
        deliveries: action.payload as DeliveryBackend[],
        loading: false,
      };
    case DeliveryUserListActionTypes.FETCH_DELIVERIES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case DeliveryUserListActionTypes.FETCH_DELIVERIES_RESET:
      return initialStateDeliveryList;
    default:
      return state;
  }
};

export const deliveryListReducer = (
  state = initialStateDeliveryList,
  action: DeliveryListAction
) => {
  switch (action.type) {
    case DeliveryListActionTypes.DELIVERY_LIST_REQUEST:
      return { ...state, loading: true };
    case DeliveryListActionTypes.DELIVERY_LIST_SUCCESS:
      return {
        ...state,
        deliveries: action.payload as DeliveryBackend[],
        loading: false,
      };
    case DeliveryListActionTypes.DELIVERY_LIST_FAIL:
      return { ...state, error: action.payload, loading: false };
    case DeliveryListActionTypes.DELIVERY_LIST_RESET:
      return initialStateDeliveryList;
    default:
      return state;
  }
};
