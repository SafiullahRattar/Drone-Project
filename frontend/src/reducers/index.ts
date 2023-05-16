import { combineReducers } from "@reduxjs/toolkit";
import { adminEditFormReducer } from "./adminReducer";
import {
  deliveryUserListReducer,
  deliveryListReducer,
} from "./deliveryReducer";
import { userSignInReducer, userListReducer } from "./userReducer";
import { droneListReducer } from "./droneReducer";
import { animationReducer } from "./animationReducer";

export const allReducers = combineReducers({
  userSignInReducer,
  deliveryUserListReducer,
  userListReducer,
  deliveryListReducer,
  droneListReducer,
  adminEditFormReducer,
  animationReducer,
});
