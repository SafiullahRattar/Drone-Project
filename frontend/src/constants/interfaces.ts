import { DeliveryActionTypes } from "./action_types";

export interface user {
  _id: string;
  name: string;
  email: string;
  isAdmin: string;
  token: string;
}

export interface userSignInState {
  user: user;
  error?: string;
  loading: boolean;
}

export interface userSignInAction {
  type: string;
  payload?: any;
}



// ------------- USER EDIT ---------
export interface UserEditState {
  error: string;
  loading: boolean;
  success: boolean;
}

export interface UserEditAction {
  type: string;
  payload: any;
}


export interface UserListState {
    error: string,
    loading: boolean,
    users: user[]
}

export interface UserListAction {
    type: string,
    payload: any
}

// ---------- Delivery
//

export interface Package {
  weight : number;
  size : number;
}
export interface Delivery {
  receiver: string;
  date: string;
  priority: string;
  // status: string;
  pickup_location: string;
  drop_location: string;
}

export interface GetDeliveryByIdAction {
  type: typeof DeliveryActionTypes.GET_DELIVERY_BY_ID;
  payload: Delivery;
}

export interface GetAllDeliveriesAction {
  type: typeof DeliveryActionTypes.GET_ALL_DELIVERIES;
  payload: Delivery[];
}

export interface GetDeliveriesByUserAction {
  type: typeof DeliveryActionTypes.GET_DELIVERIES_BY_USER;
  payload: Delivery[];
}

export interface GetDeliveriesByStatusAction {
  type: typeof DeliveryActionTypes.GET_DELIVERIES_BY_STATUS;
  payload: Delivery[];
}

export interface PostNewDeliveryAction {
  type: typeof DeliveryActionTypes.POST_NEW_DELIVERY;
  payload: Delivery;
}

export interface UpdateDeliveryStatusAction {
  type: typeof DeliveryActionTypes.UPDATE_DELIVERY_STATUS;
  payload: Delivery;
}





