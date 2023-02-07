import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { postNewDelivery } from "../../actions/deliveryAction";
import { useAppDispatch } from "../../utils/hooks";
import "./DeliveryForm.scss";

const DeliveryForm = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Formik
        initialValues={{
          package: {
            weight: 0,
            size: 0,
          },
          delivery: {
            receiver: "",
            date: "",
            priority: "",
            // price: 0,
            // status: "",
            pickup_location: "",
            drop_location: "",
            // distance: 0,
          },
        }}
        validationSchema={yup.object().shape({
          package: yup.object().shape({
            weight: yup.number().required("Weight is required"),
            size: yup.number().required("Size is required"),
          }),
          delivery: yup.object().shape({
            receiver: yup.string().required("Receiver is required"),
            date: yup.date().required("Date is required"),
            priority: yup.string().required("Priority is required"),
            // price: yup.number().required("Price is required"),
            // status: yup.string().required("Status is required"),
            pickup_location: yup
              .string()
              .required("Pick up location is required"),
            drop_location: yup.string().required("Drop location is required"),
            // distance: yup.number().required("Distance is required"),
          }),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // submit the form
          setSubmitting(false);

          dispatch(postNewDelivery(values.package, values.delivery));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="form-title">
                <h3>Package Details</h3>
              </div>
              <div className="form-inputs">
                <div className="form-input-container">
                  <label>Weight</label>
                  <input
                    type="number"
                    name="package.weight"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.package.weight}
                  />
                  {errors.package &&
                    touched.package &&
                    errors.package.weight && (
                      <div className="error">{errors.package.weight}</div>
                    )}
                </div>
                <div className="form-input-container">
                  <label>Size</label>
                  <input
                    type="number"
                    name="package.size"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.package.size}
                  />
                  {errors.package && touched.package && errors.package.size && (
                    <div className="error">{errors.package.size}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-container">
              <div className="form-title">
                <h3>Delivery Details</h3>
              </div>
              <div className="form-inputs">
                <div className="form-input-container">
                  <label>Receiver</label>
                  <input
                    type="text"
                    name="delivery.receiver"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.delivery.receiver}
                  />
                  {errors.delivery &&
                    touched.delivery &&
                    errors.delivery.receiver && (
                      <div className="error">{errors.delivery.receiver}</div>
                    )}
                </div>
                <div className="form-input-container">
                  <label>Date</label>
                  <input
                    type="date"
                    name="delivery.date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.delivery.date}
                  />
                  {errors.delivery &&
                    touched.delivery &&
                    errors.delivery.date && (
                      <div className="error">{errors.delivery.date}</div>
                    )}
                </div>
                <div className="form-input-container">
                  <label>Priority</label>
                  <input
                    type="text"
                    name="delivery.priority"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.delivery.priority}
                  />
                  {errors.delivery &&
                    touched.delivery &&
                    errors.delivery.priority && (
                      <div className="error">{errors.delivery.priority}</div>
                    )}
                </div>
                {/* <div className="form-input-container">
                  <label>Price</label>
                  <input
                    type="number"
                    name="delivery.price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.delivery.price}
                  />
                  {errors.delivery &&
                    touched.delivery &&
                    errors.delivery.price && (
                      <div className="error">{errors.delivery.price}</div>
                    )}
                </div> */}
                {/* <div className="form-input-container">
                  <label>Status</label>
                  <input
                    type="text"
                    name="delivery.status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.delivery.status}
                  />
                  {errors.delivery &&
                    touched.delivery &&
                    errors.delivery.status && (
                      <div className="error">{errors.delivery.status}</div>
                    )}
                </div> */}
                <div className="form-input-container">
                  <label>Pickup Location</label>
                  <input
                    type="text"
                    name="delivery.pickup_location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.delivery.pickup_location}
                  />
                  {errors.delivery &&
                    touched.delivery &&
                    errors.delivery.pickup_location && (
                      <div className="error">
                        {errors.delivery.pickup_location}
                      </div>
                    )}
                </div>
                <div className="form-input-container">
                  <label>Drop Location</label>
                  <input
                    type="text"
                    name="delivery.drop_location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.delivery.drop_location}
                  />
                  {errors.delivery &&
                    touched.delivery &&
                    errors.delivery.drop_location && (
                      <div className="error">
                        {errors.delivery.drop_location}
                      </div>
                    )}
                </div>
                {/* <div className="form-input-container">
                  <label>Distance</label>
                  <input
                    type="number"
                    name="delivery.distance"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.delivery.distance}
                  />
                  {errors.delivery &&
                    touched.delivery &&
                    errors.delivery.distance && (
                      <div className="error">{errors.delivery.distance}</div>
                    )}
                </div> */}
              </div>
            </div>
            <div className="form-submit">
              <button type="submit" disabled={isSubmitting}>
                Book
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryForm;
