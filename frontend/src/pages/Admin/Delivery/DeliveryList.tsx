import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminEditFormAction } from "../../../actions/adminAction";
import { fetchDeliveriesAdmin } from "../../../actions/deliveryAction";
import { userListAction } from "../../../actions/userAction";
import Table, { TableColumn } from "../../../component/Table";
import { DeliveryBackend } from "../../../constants/action_types";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { withAdminAuth } from "../../../component/Wrapper/authWrapper";
import DeliveryFilter from "../../../component/Admin/Filter/DeliveryFilter";

const AdminDeliveryList = () => {
  const columns: TableColumn[] = [
    {
      label: "Delivery ID",
      accessor: "_id",
      type: "id",
    },
    {
      label: "Sender",
      accessor: "sender",
      type: "id",
    },
    // {
    //   label: "Package ID",
    //   accessor: "package_id",
    //   type: "select",
    //   options: [
    //     {
    //       value: 0,
    //       label: "Small (10x10x10)",
    //     },
    //     {
    //       value: 1,
    //       label: "Medium (20x20x20)",
    //     },
    //     {
    //       value: 2,
    //       label: "Large (30x30x30)",
    //     },

    //     {
    //       value: 3,
    //       label: "Extra Large (40x40x40)",
    //     },
    //   ],
    // },
    {
      label: "Receiver",
      accessor: "receiver",
    },
    {
      label: "Date",
      accessor: "date",
      type: "date",
    },
    {
      label: "Priority",
      accessor: "priority",
    },
    {
      label: "Price",
      accessor: "price",
    },
    {
      label: "Status",
      accessor: "status",
    },
    {
      label: "Pick Up Location",
      accessor: "pickup_location",
      isList: true,
    },
    {
      label: "Drop Off Location",
      accessor: "drop_location",
      isList: true,
    },

    {
      label: "Distance",
      accessor: "distance",
    },
  ];

  const dispatch = useAppDispatch();

  const [filterId, setFilterId] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");

  const [deliveryData, setDeliveryData] = useState<DeliveryBackend[]>([]);

  const { deliveries, loading, error } = useAppSelector(
    (state: RootState) => state.deliveryListReducer
  );
  const { user } = useAppSelector(
    (state: RootState) => state.userSignInReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDeliveriesAdmin());
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (deliveries) {
      setDeliveryData(deliveries);
    }
  }, [deliveries]);

  useEffect(() => {
    if (deliveries) {
      let filteredData = (deliveries as DeliveryBackend[]).filter((delivery) =>
        delivery._id.includes(filterId)
      );

      if (filterStatus !== "") {
        filteredData = filteredData.filter(
          (delivery) => delivery.status === filterStatus.toLowerCase()
        );
      }

      setDeliveryData(filteredData);
    }
  }, [filterId, filterStatus, filterPriority, filterDate]);

  // get delivery and pass it admin delivery action
  const onEditClick = (delivery: DeliveryBackend) => {
    dispatch(adminEditFormAction(columns, delivery, "DELIVERY"));
    navigate("/admin/editForm");
  };

  return (
    <>
      <DeliveryFilter
        setFilterId={setFilterId}
        setFilterStatus={setFilterStatus}
        setFilterDate={setFilterDate}
      />
      <div style={{
        overflowX: "auto",
      }}>
        <Table
          columns={columns}
          data={deliveryData}
          lastColumnEdit={true}
          onEditClick={onEditClick}
        ></Table>
      </div>
    </>
  );
};

export default withAdminAuth(AdminDeliveryList);
