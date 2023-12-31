import axios, { Axios, AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  AdminDeliveryUpdateActionTypes,
  AdminEditFormActionTypes,
  DeliveryActionTypes,
  DeliveryBackend,
  DeliveryListActionTypes,
  DeliveryUserListAction,
  DeliveryUserListActionTypes,
  NewDeliveryActionTypes,
} from "../constants/action_types";
import { Delivery, Package } from "../constants/interfaces";
import { AppDispatch, RootState } from "../store";
import { axios_config } from "../utils/config";

export const getDeliveryById = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().userSignInReducer.user.token;
      const res = await axios.get(`api/delivery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: DeliveryActionTypes.GET_DELIVERY_BY_ID,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllDeliveries = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().userSignInReducer.user.token;
      const res = await axios.get(`${process.env.SERVER_URL}/deliveries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: DeliveryActionTypes.GET_ALL_DELIVERIES,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getDeliveriesByUser = (userId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().userSignInReducer.user.token;
      const res = await axios.get(
        `${process.env.SERVER_URL}/deliveries/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: DeliveryActionTypes.GET_DELIVERIES_BY_USER,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getDeliveriesByStatus = (status: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().userSignInReducer.user.token;
      const res = await axios.get(
        `${process.env.SERVER_URL}/deliveries/status/${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: DeliveryActionTypes.GET_DELIVERIES_BY_STATUS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const postNewDelivery = (
  package_data: Package,
  delivery_data: Delivery
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      //   const token = getState().userSignInReducer.user.token;
      dispatch({
        type: NewDeliveryActionTypes.REQUEST,
      });
      const token = Cookies.get("JWT");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get("/api/package/63e2bb46caec961163ad9702");
      console.log(res.data);
      console.log({ ...package_data });

      const package_res = await axios.post(
        `http://localhost:5000/api/package/`,
        {
          ...package_data,
        },
        config
      );
      const package_id = package_res.data._id;
      const delivery_res = await axios.post(
        `http://localhost:5000/api/delivery`,
        {
          package_id,
          ...delivery_data,
        },
        config
      );
      console.log(delivery_res.data);
      console.log("--------------\n-----------");
      dispatch({
        type: NewDeliveryActionTypes.SUCCESS,
        payload: delivery_res.data,
      });
      dispatch({
        type: DeliveryActionTypes.POST_NEW_DELIVERY,
        payload: delivery_res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: NewDeliveryActionTypes.FAIL,
        payload: "SOMETHING WENT WRONG",
      });
    }
  };
};

export const updateDeliveryStatus = (id: string, status: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().userSignInReducer.user.token;
      const res = await axios.put(
        `${process.env.SERVER_URL}/deliveries/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: DeliveryActionTypes.UPDATE_DELIVERY_STATUS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchDeliveries = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: DeliveryUserListActionTypes.FETCH_DELIVERIES });
    try {
      const token = Cookies.get("JWT");
      const response = await axios.get(`/api/delivery/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch({
        type: DeliveryUserListActionTypes.FETCH_DELIVERIES_SUCCESS,
        payload: response.data,
      });
    } catch (err: AxiosError | any) {
      return dispatch({
        type: DeliveryUserListActionTypes.FETCH_DELIVERIES_FAILURE,
        payload: err.response.data.message,
      });
    }
  };
};

export const fetchDeliveriesAdmin = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: DeliveryListActionTypes.DELIVERY_LIST_REQUEST });
    try {
      const token = Cookies.get("JWT");
      const response = await axios.get(`/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch({
        type: DeliveryListActionTypes.DELIVERY_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (err: AxiosError | any) {
      return dispatch({
        type: DeliveryListActionTypes.DELIVERY_LIST_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

// update delivery
export const adminUpdateDeliveryAction = (delivery: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: AdminDeliveryUpdateActionTypes.REQUEST });
    try {
      const { data } = await axios.put(
        `/api/admin/orders/${delivery._id}`,
        delivery,
        axios_config()
      );

      dispatch({
        type: AdminDeliveryUpdateActionTypes.SUCCESS,
        payload: data,
      });
      dispatch({
        type: AdminEditFormActionTypes.ADMIN_SHOULD_GO_BACK,
      });
    } catch (error: AxiosError | any) {
      dispatch({
        type: AdminDeliveryUpdateActionTypes.FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
