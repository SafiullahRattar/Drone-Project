import React from "react";
import "./Filter.scss";

interface IProps {
  setFilterId: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  setFilterDate: React.Dispatch<React.SetStateAction<string>>;
}

const DeliveryFilter = ({
  setFilterId,
  setFilterStatus,
  setFilterDate,
}: IProps) => {
  return (
    <div className="filterList">
      <div className="filterList__item">
        <label htmlFor="filterId">Filter by ID</label>
        <input
          type="text"
          id="filterId"
          onChange={(e) => setFilterId(e.target.value)}
        />
      </div>
      <div className="filterList__item">
        <label htmlFor="filterStatus">Filter by Status</label>
        <select
          name="filterStatus"
          id="filterStatus"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="DELIVERED">Delivered</option>
          {/* <option value="CANCELLED">Cancelled</option> */}
        </select>
      </div>
      {/* <div className="filterList__item">
        <label htmlFor="filterDate">Filter by Date</label>
        <input
          type="date"
          id="filterDate"
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div> */}
    </div>
  );
};

export default DeliveryFilter;
