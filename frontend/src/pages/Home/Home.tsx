import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignInAction } from "../../actions/userAction";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const Home = () => {
  const dispatch = useAppDispatch();
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
  // }else{
  //   console.log('bharwat')
  // }
  // useEffect(() => {
  //   console.log("INSIDE HOME SCREEN")
  // }, []);
  //
  console.log(token);
  console.log(user);
  console.log(Object.keys(user).length);

  return <div>Home</div>;
};

export default Home;
