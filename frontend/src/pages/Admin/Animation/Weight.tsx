import { motion } from "framer-motion";
import React from "react";

interface Props {
  nextCoordinate: { x: number; y: number };
  index: number;
  distance: number;
  drone_width: number;
  drone_height: number;
  speed: number;
  weight: number;
}

const Weight = ({
  nextCoordinate,
  distance,
  drone_width,
  drone_height,
  speed,
  weight,
}: Props) => {
  return (
    <motion.rect
      x={`${nextCoordinate.x * 50}px`}
      y={`${nextCoordinate.y * 50}px`}
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
      <title>{`(${nextCoordinate.x}, ${nextCoordinate.y})\n${weight}kg`}</title>
    </motion.rect>
  );
};

export default Weight;
