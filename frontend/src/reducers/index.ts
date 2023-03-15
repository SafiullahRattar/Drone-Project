import { combineReducers } from "@reduxjs/toolkit";
import { deliveryUserListReducer } from "./deliveryReducer";
import { userSignInReducer, userListReducer } from "./userReducer";

export const allReducers = combineReducers({
  userSignInReducer,
  deliveryUserListReducer,
  userListReducer,
});
