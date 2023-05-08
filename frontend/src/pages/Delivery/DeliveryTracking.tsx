import axios from "axios";
import React, { useEffect, useState } from "react";
import "./DeliveryTracking.scss";
import { useLocation } from "react-router-dom";

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

  const fetchDeliveryData = async (tracking_id: string) => {
    try {
      const { data } = await axios.get(`/api/delivery/${tracking_id}`);
      setDeliveryData(data);
      setError("");
    } catch (err) {
      //   setError(err.message ?? "ERROR");
      setError("ERROR");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchDeliveryData(trackingId);
  };

  // if url has tracking id, fetch the data
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  useEffect(() => {
    const trackingId = query.get("tracking_id");
    if (trackingId) {
      console.log(trackingId)
      setTrackingId(trackingId);
      fetchDeliveryData(trackingId);
    }
  }, []);

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
