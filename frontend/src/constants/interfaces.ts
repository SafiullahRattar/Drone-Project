export interface user {
    _id: string
    name: string,
    email: string,
    isAdmin: string,
    token: string,
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
  error: string,
  loading: boolean,
  success: boolean
}

export interface UserEditAction {
  type: string,
  payload: any
}


