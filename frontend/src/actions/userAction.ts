import { Dispatch } from "@reduxjs/toolkit";
import {
  DeliveryUserListActionTypes,
  UserList,
  UserSingIn,
} from "../constants/action_types";
import axios from "axios";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "../store";

export const userSignInAction =
  (token: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UserSingIn.REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/api/users/profile", config);
      // console.log(data);

      dispatch({
        type: UserSingIn.SUCCESS,
        payload: data,
      });

      localStorage.setItem("UserInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: UserSingIn.FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signOutAction = () => (dispatch: Dispatch) => {
  Cookies.remove("JWT");
  dispatch({
    type: UserSingIn.LOGOUT,
  });
  dispatch({
    type: DeliveryUserListActionTypes.FETCH_DELIVERIES_RESET,
  });

  // dispatch({ type: PlaceOrder.RESET });
  // dispatch({ type: AddToCart.RESET });
  // dispatch({ type: OrderList.RESET });
  // dispatch({ type: UserList.RESET });
  // dispatch({ type: UserEdit.RESET });
  // dispatch({ type: UserEditDetail.RESET });
  // dispatch({ type: OrderListAsAdmin.RESET });
  // dispatch({ type: OrderDeliver.RESET });
};


export const userListAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch({ type: UserList.REQUEST })
        const config = {
            headers: {
                Authorization: `Bearer ${Cookies.get('JWT')}`
            }
        }
        const { data } = await axios.get(
            '/api/admin/users/',
            config
        )

        dispatch({
            type: UserList.SUCCESS,
            payload: data
        })

    } catch (error: any) {
        dispatch({
            type: UserList.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};