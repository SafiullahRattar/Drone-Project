import { Dispatch } from "@reduxjs/toolkit";
import { UserSingIn } from "../constants/action_types";
import axios from "axios";
import Cookies from "js-cookie";

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
  Cookies.remove("jwt");
  dispatch({
    type: UserSingIn.LOGOUT,
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
