import { combineReducers } from "@reduxjs/toolkit";
import {
  deliveryUserListReducer,
  deliveryListReducer,
} from "./deliveryReducer";
import { userSignInReducer, userListReducer } from "./userReducer";

export const allReducers = combineReducers({
  userSignInReducer,
  deliveryUserListReducer,
  userListReducer,
  deliveryListReducer,
});
