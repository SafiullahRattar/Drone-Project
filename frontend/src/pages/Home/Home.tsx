import Cookies from "js-cookie";
import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { userSignInAction } from "../../actions/userAction";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import "./Home.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector(
    (state) => state.userSignInReducer
  );
  const token = Cookies.get("JWT");
  const [temp, setTemp] = useState(false);
  if (!temp && token) {
    dispatch(userSignInAction(token));
    setTemp(true);
  }

  // if (Object.keys(user).length === 0 && token) {
  //   console.log('Calling')
  //   dispatch(userSignInAction(token));
  // console.log(token);
  // console.log(user);
  // console.log(Object.keys(user).length);

  const [trackingId, setTrackingId] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // history.push(`/tracking/${trackingId}`);
    navigate(`/tracking?tracking_id=${trackingId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingId(e.target.value);
  };

  return (
    <div className="homePage">
      <div className="homePage__leftColumn">
        <h1 className="homePage__title">Drone Delivery</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input_field"
            placeholder="Tracking Id"
            type="text"
            id="trackingId"
            name="trackingId"
            value={trackingId}
            onChange={handleChange}
          />
          <button type="submit" className="btn">
            Track
          </button>
        </form>
      </div>
      <div className="homePage__rightColumn">
        <img src="drone.svg" alt="drone" />
      </div>
    </div>
  );
};

export default Home;
