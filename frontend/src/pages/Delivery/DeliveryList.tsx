import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DeliveryList.scss";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { DeliveryBackend } from "../../constants/action_types";
import { fetchDeliveries } from "../../actions/deliveryAction";
import { useCheckJwtCookie } from "../../utils/config";
import "../../sass/Table.scss";

const DeliveryList = () => {
  //   const [deliveries, setDeliveries] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const {
    deliveries,
    loading,
    error: deliveryListError,
  } = useAppSelector((state) => state.deliveryUserListReducer);
  //   const {}

  const copyIdToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
  };
  // useCheckJwtCookie();

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, []);

  return (
    <div className="deliveryList">
      {error && <div>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>_id</th>
            <th>sender</th>
            <th>package_id</th>
            <th>receiver</th>
            <th>date</th>
            <th>priority</th>
            <th>price</th>
            <th>status</th>
            <th>distance</th>
          </tr>
        </thead>
        <tbody>
          {deliveries &&
            deliveries.map((delivery: DeliveryBackend) => (
              <tr key={delivery._id}>
                <td
                  className="selectable"
                  onClick={() => copyIdToClipboard(delivery._id)}
                >
                  {delivery._id.substring(0, 5)}...
                </td>
                <td className="selectable">
                  {delivery.sender.substring(0, 5)}...
                </td>
                <td className="selectable">
                  {delivery.package_id._id.substring(0, 5)}...
                </td>
                <td>{delivery.receiver}</td>
                <td>{new Date(delivery.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}</td>
                <td>{delivery.priority}</td>
                <td>{delivery.price}</td>
                <td>{delivery.status}</td>
                <td>{delivery.distance}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
