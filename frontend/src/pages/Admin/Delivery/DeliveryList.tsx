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
      label: "Sender",
      accessor: "sender",
    },
    {
      label: "Package ID",
      accessor: "package_id",
    },
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
    dispatch(adminEditFormAction(columns, delivery));
    navigate("/admin/editForm")
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
