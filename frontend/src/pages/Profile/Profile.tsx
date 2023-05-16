import React from "react";
import DeliveryList from "../Delivery/DeliveryList";
import { withAuth } from "../../component/Wrapper/authWrapper";

const Profile = () => {
  return (
    <div>
      <div></div>
      <div>
        <DeliveryList />
      </div>
    </div>
  );
};

export default withAuth(Profile);
