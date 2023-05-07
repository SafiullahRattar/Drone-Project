import React, { useState } from "react";
import { motion } from "framer-motion";
import Weight from "./Weight";
import './Animation.scss'
import Drone from "./Drone";
import Panel from "./Panel";

const coordinates = [
  { x: 0, y: 0 },
  { x: 1, y: 3 },
  { x: 3, y: 6 },
  { x: 0, y: 0 },
  { x: 2, y: 9 },
  { x: 0, y: 0 },
];

const weight_container = [2, 3, 4, 5, 6, 7];


const App = () => {
  return (
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
      <Drone />
      {/* <div>adsf</div> */}
      <Panel />
      {/* svg of paths */}
    </div>
  );
};

export default App;
