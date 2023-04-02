import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { adminEditFormAction } from "../../../actions/adminAction";
import { fetchDeliveriesAdmin } from "../../../actions/deliveryAction";
import Table, { TableColumn } from "../../../component/Table";

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
      type: "string",
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
    {
      label: "Delivery Capacity",
      accessor: "deliveryCapacity",
      type: "number",
    },
    {
      label: "Speed",
      accessor: "speed",
      type: "number",
    },
  ];

  const dispatch = useAppDispatch();
  const { drones, loading, error } = useAppSelector(
    (state: RootState) => state.droneListReducer
  );
  const { user } = useAppSelector(
    (state: RootState) => state.userSignInReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    } else if (!user.isAdmin) {
      navigate("/");
    }
    dispatch(fetchDeliveriesAdmin());
  }, [dispatch, navigate, user]);

  console.log(drones);
  // get delivery and pass it admin delivery action
  const onEditClick = () => {
    dispatch(
      adminEditFormAction(droneTableColumns, drones, "/api/admin/drones")
    );
    navigate("/admin/editForm", {
      state: {
        handleSubmit: (data: any) => {
          console.log(data);
        },
      },
    });
  };

  return (
    <>
      <Table
        columns={droneTableColumns}
        data={drones}
        lastColumnEdit={true}
        onEditClick={onEditClick}
      ></Table>
    </>
  );
};

export default AdminDroneList;
