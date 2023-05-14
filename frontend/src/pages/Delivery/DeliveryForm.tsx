import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { postNewDelivery } from "../../actions/deliveryAction";
import { useCheckJwtCookie } from "../../utils/config";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import "./DeliveryForm.scss";
import CustomLocation from "../../component/Map";
import { RootState } from "../../store";
import { withRegisterAuth } from "../../component/Wrapper/authWrapper";

const DeliveryForm = () => {
  const dispatch = useAppDispatch();
  useCheckJwtCookie();

  interface PackageOption {
    value: number;
    label: string;
    dimensions: { length: number; width: number; height: number };
  }

  const packageOptions: PackageOption[] = [
    {
      value: 0,
      label: "Small",
      dimensions: { length: 10, width: 10, height: 10 },
    },
    {
      value: 1,
      label: "Medium",
      dimensions: { length: 20, width: 20, height: 20 },
    },
    {
      value: 2,
      label: "Large",
      dimensions: { length: 30, width: 30, height: 30 },
    },
    {
      value: 3,
      label: "Extra Large",
      dimensions: { length: 40, width: 40, height: 40 },
    },
  ];

  const google = window.google;
  const [pickUpLocation, setPickUpLocation] =
    useState<google.maps.LatLngLiteral | null>({
      lat: 33.642362142043844,
      lng: 72.99006168363474,
    });
  const [dropOffLocation, setDropOffLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [distance, setDistance] = useState<number>(0);

  const { user } = useAppSelector(
    (state: RootState) => state.userSignInReducer
  );

  console.log({
    pickUpLocation,
    dropOffLocation,
    distance,
  });

  return (
    <div>
      <Formik
        initialValues={{
          package: {
            weight: 0,
            size: packageOptions[0].value,
          },
          delivery: {
            receiver: "",
            date: "",
            priority: "",
            // price: 0,
            // status: "",
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
          }),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // submit the form
          setSubmitting(false);

          if (pickUpLocation && dropOffLocation) {
            dispatch(
              postNewDelivery(values.package, {
                ...values.delivery,
                pickup_location: [pickUpLocation.lat, pickUpLocation.lng],
                drop_location: [dropOffLocation.lat, dropOffLocation.lng],
                distance,
              })
            );
          }
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
            <div className="container">
              <div className="div-container__left">
                <div>
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
                        <label htmlFor="package-size">
                          Select Package Size:
                        </label>
                        <Field
                          name="package-size"
                          as="select"
                          className="form-select"
                          // value={values.package.size}
                          // onChange={handleChange}
                        >
                          {packageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label} ({option.dimensions.length} x{" "}
                              {option.dimensions.width} x{" "}
                              {option.dimensions.height} cm)
                            </option>
                          ))}
                        </Field>
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
                            <div className="error">
                              {errors.delivery.receiver}
                            </div>
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
                            <div className="error">
                              {errors.delivery.priority}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="form-submit">
                    <button type="submit" disabled={isSubmitting}>
                      Book
                    </button>
                  </div>
                </div>
              </div>
              <div className="div-container__right">
                <div className="form-container">
                  <CustomLocation
                    setPickUpLocation={setPickUpLocation}
                    setDropOffLocation={setDropOffLocation}
                    setFormDistance={setDistance}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default withRegisterAuth(DeliveryForm);
