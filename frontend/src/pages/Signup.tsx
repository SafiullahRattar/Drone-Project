import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";

import "./Signup.scss";

const Signup: React.FC = () => {
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
      {/* <h4>OR SIGN UP WITH</h4> */}
      <GoogleButton
        type="light" // can be light or dark
        onClick={() => {
          console.log("Google button clicked");
        }}
      />
    </div>
  );
};

export default Signup;
