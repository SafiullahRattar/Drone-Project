import { DeliveryActionTypes } from "../constants/action_types";
import { Delivery, GetDeliveryByIdAction, GetAllDeliveriesAction, GetDeliveriesByUserAction, GetDeliveriesByStatusAction, PostNewDeliveryAction, UpdateDeliveryStatusAction } from "../constants/interfaces";

const initialState: Delivery = {
  receiver: "",
  date: "",
  priority: "",
//   status: "",
  pickup_location: "",
  drop_location: "",
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
