import GoogleButton from "react-google-button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

import "./Signup.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignInAction } from "../actions/userAction";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const Signup: React.FC = () => {
  const location = useLocation();
  const redirect = location.search.split("=")[1];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(
    (state: RootState) => state.userSignInReducer
  );

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  useEffect(() => {
    if (query.get("jwt")) {
      console.log(query.get("jwt"));
      Cookies.set("JWT", query.get("jwt") ?? "");
      dispatch(userSignInAction(query.get("jwt") ?? ""));
    }
    if (user !== null) {
      navigate('/');
    }

    console.log();
  }, []);

  const handleGoogleLogin = () => {
    window.open(`http://localhost:5000/api/users/auth/google`, "_self");
  };

  return (
    <div className="signup">
      <Formik
        initialValues={{ phoneNumber: 0 }}
        validate={(values) => {
          const errors = {};

          // if (!values.email) {
          //   errors.email = "Required";
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = "Invalid email address";
          // }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field type="number" name="phoneNumber" className="form__input" />

            <ErrorMessage name="email" component="div" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="form__submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <hr />
      <h4>OR SIGN UP WITH</h4>
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  );
};

export default Signup;
