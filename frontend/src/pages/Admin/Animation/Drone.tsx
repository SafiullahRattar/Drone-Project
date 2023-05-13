import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Weight from "./Weight";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { RootState } from "../../../store";
import { setAnimationSlectedIndex } from "../../../actions/animationActions";
import { calculateWidthAndHeight } from "./animationUtils";

const Drone = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    loading,
    error,
    coordinates,
    weight_container,
    time_elapsed,
    selected_index,
    drone,
    speed,
    scaleX,
    scaleY,
  } = useAppSelector((state: RootState) => state.animationReducer);

  // console.log(coordinates, selected_index, currentIndex)

  const dispatch = useAppDispatch();

  // coordinates
  const currentCoordinate = coordinates[currentIndex];
  const nextCoordinateData =
    coordinates[(currentIndex + 1) % coordinates.length];
  const isLastCoordinate = () => {
    return currentIndex === coordinates.length - 1;
  };
  const nextCoordinate = () => {
    // if (!isLastCoordinate()) {
    //   setCurrentIndex((prevIndex) => prevIndex + 1);
    // } else {
    //   setCurrentIndex(0);
    // }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % coordinates.length);
  };

  const drone_width = 100;
  const drone_height = 100;
  const { width, height, minX, maxX, minY, maxY } =
    calculateWidthAndHeight(coordinates);
  const timeToNextCoordinate = () => {
    return (
      Math.sqrt(
        Math.pow(nextCoordinateData.x - currentCoordinate.x, 2) +
          Math.pow(nextCoordinateData.y - currentCoordinate.y, 2)
      ) / speed || 0.1
    );
  };
  useEffect(() => {
    dispatch(setAnimationSlectedIndex(currentIndex));
  }, [currentIndex]);

  console.log(
    coordinates.length,
    currentIndex,
    currentCoordinate,
    nextCoordinateData
  );
  return (
    <div
      style={{
        width: `${width * scaleX}px`,
        height: `${height * scaleY}px`,
        border: "1px solid black",
      }}
    >
      <motion.div
        style={{
          width: `${drone_width}px`,
          height: `${drone_height}px`,
          backgroundImage: "url(./drone.png)",
          backgroundSize: "cover",
          position: "relative",
          top: `${currentCoordinate.y * scaleX}px`,
          left: `${currentCoordinate.x * scaleY}px`,
        }}
        animate={{
          x: `${nextCoordinateData.x * scaleX}px`,
          y: `${nextCoordinateData.y * scaleY}px`,
        }}
        transition={{
          delay: isLastCoordinate() ? 0 : 0.5,
          duration: timeToNextCoordinate(),
        }}
        onAnimationComplete={() => {
          nextCoordinate();
        }}
      ></motion.div>
    </div>
  );
};

export default Drone;
