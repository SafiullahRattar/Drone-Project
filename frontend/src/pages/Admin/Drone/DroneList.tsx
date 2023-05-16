import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { adminEditFormAction } from "../../../actions/adminAction";
import { fetchDeliveriesAdmin } from "../../../actions/deliveryAction";
import Table, { TableColumn } from "../../../component/Table";
import { getDroneListAdminAction } from "../../../actions/droneAction";
import { withAdminAuth } from "../../../component/Wrapper/authWrapper";
import Drone from "../../../component/Admin/AddNew/Drone";
import "../AdminList.scss";

const AdminDroneList = () => {
  const droneTableColumns: TableColumn[] = [
    {
      label: "Drone ID",
      accessor: "id",
      type: "string",
    },
    {
      label: "Name",
      accessor: "name",
      type: "string",
    },
    {
      label: "Status",
      accessor: "status",
      type: "select",
      options: [
        { value: "available", label: "available" },
        { value: "in-use", label: "in-use" },
        { value: "maintenance", label: "maintenance" },
      ],
    },
    {
      label: "Latitude",
      accessor: "currentLocation.latitude",
      type: "number",
    },
    {
      label: "Longitude",
      accessor: "currentLocation.longitude",
      type: "number",
    },
    {
      label: "Battery Level",
      accessor: "batteryLevel",
      type: "number",
    },
    {
      label: "Last Maintenance Date",
      accessor: "lastMaintenanceDate",
      type: "date",
    },
    {
      label: "Weight Capacity",
      accessor: "weightCapacity",
      type: "number",
    },
    {
      label: "Max Flight Distance",
      accessor: "maxFlightDistance",
      type: "number",
    },
    {
      label: "Delivery Range",
      accessor: "deliveryRange",
      type: "number",
    },
    // {
    //   label: "Delivery Capacity",
    //   accessor: "deliveryCapacity",
    //   type: "number",
    // },
    {
      label: "Speed",
      accessor: "speed",
      type: "number",
    },
    {
      label: "Charge Rate",
      accessor: "chargeRate",
      type: "number",
    },
    {
      label: "Drain Rate",
      accessor: "drainRate",
      type: "number",
    },
    {
      label: "BCR",
      accessor: "bcr",
      type: "number",
    },
    {
      label: "Total Battery Capacity",
      accessor: "totalBatteryCapacity",
      type: "number",
    },
  ];

  const [showNewForm, setShowNewForm] = useState(false);

  const dispatch = useAppDispatch();
  const { drones, loading, error } = useAppSelector(
    (state: RootState) => state.droneListReducer
  );
  const { user } = useAppSelector(
    (state: RootState) => state.userSignInReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDroneListAdminAction());
  }, []);

  // get delivery and pass it admin delivery action
  const onEditClick = (drone: any) => {
    dispatch(adminEditFormAction(droneTableColumns, drone, "DRONE"));
    navigate("/admin/editForm");
  };

  return (
    <div className="list">
      <h1>Drones</h1>
      <div className="addNewButton">
        <button onClick={() => setShowNewForm(!showNewForm)}>
          {showNewForm ? "Cancel" : "Add New Drone"}
        </button>
      </div>
      <div
        style={{
          overflowX: "auto",
        }}
      >
        {showNewForm ? (
          <Drone />
        ) : (
          <Table
            columns={droneTableColumns}
            data={drones}
            lastColumnEdit={true}
            onEditClick={onEditClick}
          ></Table>
        )}
      </div>
    </div>
  );
};

export default withAdminAuth(AdminDroneList);
