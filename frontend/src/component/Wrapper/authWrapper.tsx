import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth_management";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../store";
import { userSignInAction } from "../../actions/userAction";

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const token = getToken();
      if (!token) {
        navigate("/signUp");
      } else {
        dispatch(userSignInAction(token));
      }
    }, []);

    if (!getToken()) {
      return null; // Return null to prevent rendering the component
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export const withAdminAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(
      (state: RootState) => state.userSignInReducer
    );

    const token = getToken();

    useEffect(() => {
      if (Object.keys(user).length !== 0 && !user.isAdmin) {
        navigate("/");
      }
    }, [user, navigate]);

    useEffect(() => {
      if (token && Object.keys(user).length === 0) {
        dispatch(userSignInAction(token));
      } else if (!token) {
        navigate("/signUp");
      }
    }, [token, user, dispatch, navigate]);

    if (!token || Object.keys(user).length === 0 || !user.isAdmin) {
      return null; // Return null to prevent rendering the component
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export const withRegisterAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(
      (state: RootState) => state.userSignInReducer
    );

    const token = getToken();

    useEffect(() => {
      if (Object.keys(user).length !== 0 && !user.isRegistered) {
        navigate("/");
      }
    }, [user, navigate]);

    useEffect(() => {
      if (token && Object.keys(user).length === 0) {
        console.log('why the fk here')
        dispatch(userSignInAction(token));
      } else if (!token) {
        navigate("/signUp");
      }
    }, [token, user, dispatch, navigate]);

    if (!token || Object.keys(user).length === 0 || !user.isRegistered) {
      return null; // Return null to prevent rendering the component
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
