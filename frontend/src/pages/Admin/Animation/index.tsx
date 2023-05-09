import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Weight from "./Weight";
import "./Animation.scss";
import Drone from "./Drone";
import Panel from "./Panel";
import { getAnimationDataAction } from "../../../actions/animationActions";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { RootState } from "../../../store";

const App = () => {
  const dispatch = useAppDispatch();
  const { loading, coordinates } = useAppSelector(
    (state: RootState) => state.animationReducer
  );

  useEffect(() => {
    dispatch(getAnimationDataAction());
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className="container"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="animation">
            <Drone />
          </div>
          {/* <div>adsf</div> */}
          <Panel />
          {/* svg of paths */}
        </div>
      )}
    </>
  );
};

export default App;
