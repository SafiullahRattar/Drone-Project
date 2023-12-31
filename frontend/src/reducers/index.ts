import { combineReducers } from "@reduxjs/toolkit";
import { adminEditFormReducer } from "./adminReducer";
import {
  deliveryUserListReducer,
  deliveryListReducer,
  newDeliveryReducer,
} from "./deliveryReducer";
import { userSignInReducer, userListReducer } from "./userReducer";
import { droneListReducer } from "./droneReducer";
import { animationReducer } from "./animationReducer";
import { pathsReducer } from "./pathReducer";

export const allReducers = combineReducers({
  userSignInReducer,
  deliveryUserListReducer,
  userListReducer,
  deliveryListReducer,
  droneListReducer,
  adminEditFormReducer,
  animationReducer,
  pathsReducer,
  newDeliveryReducer,
});
