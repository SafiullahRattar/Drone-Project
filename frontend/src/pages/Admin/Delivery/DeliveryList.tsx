
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDeliveriesAdmin } from "../../../actions/deliveryAction";
import { userListAction } from "../../../actions/userAction";
import Table, { TableColumn } from "../../../component/Table";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

const DeliveryList = () => {
  const columns: TableColumn[] = [
    {
      label: "Sender",
      accessor: "sender",
    },
    {
      label: "Email",
      accessor: "email",
    },
    {
      label: "Address",
      accessor: "address",
    },
    {
      label: "Admin?",
      accessor: "isAdmin",
    },
    {
      label: "Joined",
      accessor: "createdAt",
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
    dispatch(fetchDeliveriesAdmin);
  }, [dispatch, navigate, user]);

  // console.log(users);
  const onEditClick = (user: any) => {

    console.log(user);
  };

  return (
    <>
      <Table columns={columns} data={deliveries} lastColumnEdit={true} onEditClick={onEditClick}></Table>
    </>
  );
};

export default DeliveryList;
