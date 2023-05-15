import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userListAction } from "../../../actions/userAction";
import Table, { TableColumn } from "../../../component/Table";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { adminEditFormAction } from "../../../actions/adminAction";
import { withAdminAuth } from "../../../component/Wrapper/authWrapper";

const UsersList = () => {
  const columns: TableColumn[] = [
    {
      label: "Name",
      accessor: "name",
    },
    {
      label: "Email",
      accessor: "email",
    },
    {
      label: "Registered?",
      accessor: "isRegistered",
    },
    // {
    //   label: "Address",
    //   accessor: "address",
    // },
    // {
    //   label: "Admin?",
    //   accessor: "isAdmin",
    // },
    {
      label: "Joined",
      accessor: "createdAt",
      type: "date",
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
    dispatch(adminEditFormAction(columns, user, "USER"));
    navigate("/admin/editForm");
  };

  return (
    <>
      <div style={{
        overflowX: "auto",
      }}><Table
        columns={columns}
        data={users}
        lastColumnEdit={true}
        onEditClick={onEditClick}
      ></Table></div>
    </>
  );
};

export default withAdminAuth(UsersList);
