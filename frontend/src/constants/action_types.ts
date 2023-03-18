export enum UserSingIn {
  LOGOUT = "USER_LOGOUT",

  REQUEST = "USER_DETAIL_REQUEST",
  SUCCESS = "USER_DETAIL_SUCCESS",
  FAIL = "USER_DETAIL_FAIL",
}

export enum UserEdit {
  REQUEST = "USER_EDIT_REQUEST",
  SUCCESS = "USER_EDIT_SUCCESS",
  FAIL = "USER_EDIT_FAIL",
  RESET = "USER_EDIT_RESET",
}

/// ----------- Delivery
export const DeliveryActionTypes = {
  GET_DELIVERY_BY_ID: "GET_DELIVERY_BY_ID",
  GET_ALL_DELIVERIES: "GET_ALL_DELIVERIES",
  GET_DELIVERIES_BY_USER: "GET_DELIVERIES_BY_USER",
  GET_DELIVERIES_BY_STATUS: "GET_DELIVERIES_BY_STATUS",
  POST_NEW_DELIVERY: "POST_NEW_DELIVERY",
  UPDATE_DELIVERY_STATUS: "UPDATE_DELIVERY_STATUS",
};

// ---- Dlivery List

// Delivery List interface

export const DeliveryUserListActionTypes = {
  FETCH_DELIVERIES: "FETCH_DELIVERIES",
  FETCH_DELIVERIES_SUCCESS: "FETCH_DELIVERIES_SUCCESS",
  FETCH_DELIVERIES_FAILURE: "FETCH_DELIVERIES_FAILURE",
  FETCH_DELIVERIES_RESET: "FETCH_DELIVERIES_RESET",
};

export interface DeliveryBackendState {
  deliveries: DeliveryBackend[];
  loading: boolean;
  error: Error | null;
}

export interface DeliveryBackend {
  _id: string;
  sender: string;
  package_id: string;
  receiver: string;
  date: Date;
  priority: string;
  price: number;
  status: string;
  distance: number;
  __v: number;
}

export interface DeliveryUserListAction {
  type: string;
  payload: any;
}


//---------------Admin

export enum UserList {
    REQUEST = "USER_LIST_REQUEST",
    SUCCESS = "USER_LIST_SUCCESS",
    FAIL = "USER_LIST_FAIL",
    RESET = "USER_LIST_RESET",

}


export enum DeliveryListActionTypes {
  DELIVERY_LIST_REQUEST = "DELIVERY_LIST_REQUEST",
  DELIVERY_LIST_SUCCESS = "DELIVERY_LIST_SUCCESS",
  DELIVERY_LIST_FAIL = "DELIVERY_LIST_FAIL",
  DELIVERY_LIST_RESET = "DELIVERY_LIST_RESET",
}

export enum AdminEditFormActionTypes {
  ADMIN_EDITFORM_REQUEST = "ADMIN_EDITFORM_REQUEST",
  ADMIN_EDITFORM_SUCCESS = "ADMIN_EDITFORM_SUCCESS",
  ADMIN_EDITFORM_FAIL = "ADMIN_EDITFORM_FAIL",
  ADMIN_EDITFORM_RESET = "ADMIN_EDITFORM_RESET",
}

