import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorMessage, Field, Form, Formik } from "formik";
import jwt_decode from "jwt-decode";
import React from "react";

import "./Signup.scss";

const Signup: React.FC = () => {
  const responseGoogle = (response: any) => {
    //console.log(response);
    const userObject = jwt_decode(response.credential);
    //console.log(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    console.log(userObject)
    const { name, sub, picture } = userObject as any;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    console.log(doc);
    // client.createIfNotExists(doc).then(() => {
    //   navigate("/", { replace: true });
    // });
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
      <div className="">
        <GoogleOAuthProvider
          clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
        >
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Signup;