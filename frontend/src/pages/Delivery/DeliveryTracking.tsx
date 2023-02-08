import axios from "axios";
import React, { useState } from "react";
import "./DeliveryTracking.scss";

const DeliveryTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [deliveryData, setDeliveryData] = useState<{
    _id: string;
    sender: string;
    package_id: string;
    receiver: string;
    date: string;
    priority: string;
    price: number;
    status: string;
    distance: number;
    __v: number;
  }>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`/api/delivery/${trackingId}`);
      setDeliveryData(data);
      setError("");
    } catch (err) {
      //   setError(err.message ?? "ERROR");
      setError("ERROR");
    }
  };

  return (
    <div className="delivery_tracking">
      <form onSubmit={handleSubmit}>
        <label>Tracking ID:</label>
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          required
        />
        <button type="submit">Track Package</button>
      </form>
      {error && <p className="error">{error}</p>}
      {deliveryData && (
        <table>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Package ID</th>
              <th>Receiver</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Price</th>
              <th>Status</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{deliveryData.sender}</td>
              <td>{deliveryData.package_id}</td>
              <td>{deliveryData.receiver}</td>
              <td>{deliveryData.date}</td>
              <td>{deliveryData.priority}</td>
              <td>{deliveryData.price}</td>
              <td>{deliveryData.status}</td>
              <td>{deliveryData.distance}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeliveryTracking;
