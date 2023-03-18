
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const { users, loading, error } = useAppSelector(
    (state: RootState) => state.userListReducer
  );
  const { user } = useAppSelector(
    (state: RootState) => state.userSignInReducer
  );
  // const { success: successDelete } = useAppSelector((state: RootState) => state.userDelete)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    } else if (!user.isAdmin) {
      navigate("/");
    }
    dispatch(userListAction());
  }, [dispatch, navigate, user]);

  console.log(users);
  const onEditClick = (user: any) => {

    console.log(user);
  };

  return (
    <>
      <Table columns={columns} data={users} lastColumnEdit={true} onEditClick={onEditClick}></Table>
    </>
  );
};

export default DeliveryList;
