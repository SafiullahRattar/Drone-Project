import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminEditFormAction } from "../../../actions/adminAction";
import { fetchDeliveriesAdmin } from "../../../actions/deliveryAction";
import { userListAction } from "../../../actions/userAction";
import Table, { TableColumn } from "../../../component/Table";
import { DeliveryBackend } from "../../../constants/action_types";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

const AdminDeliveryList = () => {
  const columns: TableColumn[] = [
    {
      label: "Delivery ID",
      accessor: "_id",
    },
    {
      label: "Sender",
      accessor: "sender",
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
  const { deliveries, loading, error } = useAppSelector(
    (state: RootState) => state.deliveryListReducer
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

  console.log(deliveries);
  // get delivery and pass it admin delivery action
  const onEditClick = (delivery: DeliveryBackend) => {
    dispatch(adminEditFormAction(columns, delivery, "DELIVERY"));
    navigate("/admin/editForm");
  };

  return (
    <>
      <Table
        columns={columns}
        data={deliveries}
        lastColumnEdit={true}
        onEditClick={onEditClick}
      ></Table>
    </>
  );
};

export default AdminDeliveryList;
