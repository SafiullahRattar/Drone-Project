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
  const offsetX = Math.abs(minX);
  const offsetY = Math.abs(minY);
  const timeToNextCoordinate = () => {
    return (
      Math.sqrt(
        Math.pow(nextCoordinateData.x - currentCoordinate.x, 2) *
          Math.pow(scaleX, 1) +
          Math.pow(nextCoordinateData.y - currentCoordinate.y, 2) *
            Math.pow(scaleY, 1)
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

  const width_padding = 100;
  const height_padding = 100;

  return (
    <div
      style={{
        width: `${width * scaleX + width_padding}px`,
        height: `${height * scaleY + height_padding}px`,
        border: "1px solid black",
        padding: "50px",
      }}
    >
      <motion.div
        style={{
          width: `${drone_width}px`,
          height: `${drone_height}px`,
          backgroundImage: "url(./drone.png)",
          backgroundSize: "cover",
          position: "relative",
          top: `${
            (currentCoordinate.y + offsetY) * scaleY - drone_height / 2
          }px`,
          left: `${
            (currentCoordinate.x + offsetX) * scaleX - drone_width / 2
          }px`,
        }}
        animate={{
          top: `${
            (nextCoordinateData.y + offsetY) * scaleY - drone_height / 2
          }px`,
          left: `${
            (nextCoordinateData.x + offsetX) * scaleX - drone_width / 2
          }px`,
        }}
        transition={{
          delay: isLastCoordinate() ? 0 : 0.5,
          duration: timeToNextCoordinate(),
        }}
        onAnimationComplete={() => {
          nextCoordinate();
        }}
      ></motion.div>
      {/* svg starts at distance of minX and minY then draws line from coordinate to cordinate */}
      <div>
        <svg
          style={{
            position: "relative",
            top: `${-drone_height}px`,
            // left: `${-drone_width}px`,
            // top: `${Math.abs(minY) * scaleY }px`,
            // left: `${Math.abs(minX) * scaleX }px`,
          }}
          width={`${(maxX - minX) * scaleX + width_padding}px`}
          height={`${(maxY - minY) * scaleY + height_padding}px`}
        >
          {coordinates.map(
            (coordinate: { x: number; y: number }, index: number) => {
              return (
                <motion.circle
                  key={index}
                  cx={`${(coordinate.x + offsetX) * scaleX}px`}
                  cy={`${(coordinate.y + offsetY) * scaleY}px`}
                  r="5"
                  fill="red"
                  animate={{
                    opacity: selected_index === index ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                />
              );
            }
          )}
          {coordinates.map(
            (coordinate: { x: number; y: number }, index: number) => {
              const nextCoordinate =
                coordinates[(index + 1) % coordinates.length];
              return (
                <motion.line
                  key={index}
                  x1={`${(coordinate.x + offsetX) * scaleX}px`}
                  y1={`${(coordinate.y + offsetY) * scaleY}px`}
                  x2={`${(nextCoordinate.x + offsetX) * scaleX}px`}
                  y2={`${(nextCoordinate.y + offsetY) * scaleY}px`}
                  stroke="black"
                  strokeWidth={index <= currentIndex ? "3" : "0.5"}
                  animate={{}}
                  transition={{
                    duration: 0.5,
                  }}
                />
              );
            }
          )}
          {coordinates.map(
            (coordinate: { x: number; y: number }, index: number) => {
              const nextCoordinate =
                coordinates[(index + 1) % coordinates.length];
              const distance = Math.sqrt(
                Math.pow(nextCoordinate.x - coordinate.x, 2) +
                  Math.pow(nextCoordinate.y - coordinate.y, 2)
              );
              return (
                <Weight
                  key={index}
                  x={(coordinate.x + offsetX) * scaleX}
                  y={(coordinate.y + offsetY) * scaleY}
                  index={index}
                  distance={distance}
                  drone_width={drone_width}
                  drone_height={drone_height}
                  speed={speed}
                  weight={weight_container[index]}
                  nextCoordinate={coordinates[index % coordinates.length]}
                />
              );
            }
          )}
        </svg>
      </div>
    </div>
  );
};

export default Drone;
