import { TableColumn } from "../component/Table";
import { DeliveryActionTypes, DeliveryBackend } from "./action_types";

export interface user {
  _id: string;
  name: string;
  email: string;
  isAdmin: string;
  isRegistered: string;
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
  error: string;
  loading: boolean;
  users: user[];
}

export interface UserListAction {
  type: string;
  payload: any;
}

// ---------- Delivery
//

export interface Package {
  weight: number;
  size: number;
}

export interface Delivery {
  receiver: any;
  date: string;
  priority: string;
  distance: number;
  // status: string;
  pickup_location: [number, number];
  drop_location: [number, number];
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

export interface DeliveryListAction {
  type: string;
  payload?: DeliveryBackend[];
}

export interface DeliveryListState {
  error: string;
  loading: boolean;
  deliveries: Delivery[];
}

export interface AdminEditFormAction {
  type: string;
  payload?: any;
}

export interface AdminEditFormState {
  error: string;
  loading: boolean;
  data: {};
  columns: TableColumn[];
  apiForUpdate: string;
  success: boolean;
  shouldGoBack: boolean;
}

// Animation
export interface AnimationState {
  loading: boolean;
  error: string;
  coordinates: { x: number; y: number }[];
  weight_container: number[];
  time_elapsed: number[];
  selected_index: number;
  drone: {};
  speed: number;
  scaleX: number;
  scaleY: number;
}

export interface DroneModel {
  id: string;
  name: string;
  status: "available" | "in-use" | "maintenance";
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  batteryLevel: number;
  lastMaintenanceDate: Date;
  weightCapacity: number;
  maxFlightDistance?: number;
  deliveryRange?: number;
  speed?: number;
  chargeRate?: number;
  drainRate?: number;
  bcr?: number;
  totalBatteryCapacity?: number;
}