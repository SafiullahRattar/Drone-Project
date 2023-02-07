import axios from "axios";
import { DeliveryActionTypes } from "../constants/action_types";
import { Delivery, Package } from "../constants/interfaces";
import { AppDispatch, RootState } from "../store";

export const getDeliveryById = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().userSignInReducer.user.token;
      const res = await axios.get(
        `${process.env.SERVER_URL}/deliveries/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const token = getState().userSignInReducer.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const package_res = await axios.post(
        "/api/package",
        {
          ...package_data,
        },
        config
      );
      const package_id = package_res.data._id;
      const delivery_res = await axios.post(
        "/api/delivery",
        {
          package_id,
          ...delivery_data,
        },
        config
      );
      dispatch({
        type: DeliveryActionTypes.POST_NEW_DELIVERY,
        payload: delivery_res.data,
      });
    } catch (err) {
      console.error(err);
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
