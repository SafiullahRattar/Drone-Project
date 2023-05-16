import { motion } from "framer-motion";
import React from "react";

interface Props {
  x: number;
  y: number;
  nextCoordinate: {
    x: number;
    y: number;
  };
  index: number;
  distance: number;
  drone_width: number;
  drone_height: number;
  speed: number;
  weight: number;
}

const Weight = ({
  x,
  y,
  distance,
  nextCoordinate,
  drone_width,
  drone_height,
  speed,
  weight,
}: Props) => {
  return (
    <motion.rect
      x={`${x}px`}
      y={`${y}px`}
      //width = drone_width/5
      opacity={0}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: distance / speed,
        duration: 0.5,
      }}
      // fill="url(./weight.png)"
      style={{
        // zIndex: 100,
        backgroundSize: "cover",
        width: drone_width / 5,
        height: drone_height / 5,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <title>{`( ${nextCoordinate.x}, ${nextCoordinate.y})\n${weight}kg`}</title>
    </motion.rect>
  );
};

export default Weight;
