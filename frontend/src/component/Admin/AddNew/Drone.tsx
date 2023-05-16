import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddNew.scss";

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

const Drone = () => {
  const initialValues = {
    id: "",
    name: "",
    status: "",
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
    batteryLevel: 0,
    lastMaintenanceDate: new Date(),
    weightCapacity: 0,
    maxFlightDistance: 0,
    deliveryRange: 0,
    speed: 0,
    chargeRate: 0,
    drainRate: 0,
    bcr: 0,
    totalBatteryCapacity: 0,
  };

  return (
    <div className="addNew">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
        //   validationSchema={Yup.object().shape({
        //     id: Yup.string().required("Required"),
        //     name: Yup.string().required("Required"),
        //     status: Yup.string().required("Required"),
        //     currentLocation: Yup.object().shape({
        //       latitude: Yup.number().required("Required"),
        //       longitude: Yup.number().required("Required"),
        //     }),
        //     batteryLevel: Yup.number().required("Required"),
        //     lastMaintenanceDate: Yup.date().required("Required"),
        //     weightCapacity: Yup.number().required("Required"),
        //     maxFlightDistance: Yup.number().required("Required"),
        //     deliveryRange: Yup.number().required("Required"),
        //     speed: Yup.number().required("Required"),
        //     chargeRate: Yup.number().required("Required"),
        //     drainRate: Yup.number().required("Required"),
        //     bcr: Yup.number().required("Required"),
        //     totalBatteryCapacity: Yup.number().required("Required"),
        //   })}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-Fields">
              <div className="form-Field-container">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
              </div>
              <div className="form-Field-container">
                <label htmlFor="status">Status</label>
                <Field as="select" id="status" name="status">
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </Field>
              </div>
              <div className="form-Field-container">
                <label htmlFor="batteryLevel">Battery Level</label>
                <Field type="number" id="batteryLevel" name="batteryLevel" />
              </div>
              <div className="form-Field-container">
                <label htmlFor="weightCapacity">Weight Capacity</label>
                <Field
                  type="number"
                  id="weightCapacity"
                  name="weightCapacity"
                />
              </div>
              <div className="form-Field-container">
                <label htmlFor="maxFlightDistance">Max Flight Distance</label>
                <Field
                  type="number"
                  id="maxFlightDistance"
                  name="maxFlightDistance"
                />
              </div>
              <div className="form-Field-container">
                <label htmlFor="deliveryRange">Delivery Range</label>
                <Field type="number" id="deliveryRange" name="deliveryRange" />
              </div>
              <div className="form-Field-container">
                <label htmlFor="speed">Speed</label>
                <Field type="number" id="speed" name="speed" />
              </div>
              <div className="form-Field-container">
                <label htmlFor="chargeRate">Charge Rate</label>
                <Field type="number" id="chargeRate" name="chargeRate" />
              </div>
              <div className="form-Field-container">
                <label htmlFor="drainRate">Drain Rate</label>
                <Field type="number" id="drainRate" name="drainRate" />
              </div>
              <div className="form-Field-container">
                <label htmlFor="bcr">BCR</label>
                <Field type="number" id="bcr" name="bcr" />
              </div>
              <div className="form-Field-container">
                <label htmlFor="totalBatteryCapacity">
                  Total Battery Capacity
                </label>
                <Field
                  type="number"
                  id="totalBatteryCapacity"
                  name="totalBatteryCapacity"
                />
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Drone;
