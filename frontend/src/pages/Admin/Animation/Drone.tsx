import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Weight from "./Weight";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { RootState } from "../../../store";
import { setAnimationSlectedIndex } from "../../../actions/animationActions";

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
  } = useAppSelector((state: RootState) => state.animationReducer);

  // console.log(coordinates, selected_index, currentIndex)

  const dispatch = useAppDispatch();
  const nextCoordinate = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const isLastCoordinate = () => {
    return currentIndex >= coordinates.length - 1;
  };

  const currentCoordinate = coordinates[currentIndex];
  const nextCoordinateData =
    coordinates[(currentIndex + 1) % coordinates.length];

  const drone_width = 100;
  const drone_height = 100;
  const scale = 100;

  useEffect(() => {
    dispatch(setAnimationSlectedIndex(currentIndex));
  }, [currentIndex]);

  return (
    <div
      style={{
        // position: "relative",
        // top: '50vh',
        minWidth:
          coordinates.reduce((acc: number, curr: { x: number }) => {
            return Math.max(acc, curr.x * 50);
          }, 0) + drone_width,
        height:
          coordinates.reduce((acc: number, curr: { y: number }) => {
            return Math.max(acc, curr.y * 50);
          }, 0) + drone_height,
        // backgroundColor: "blue",
      }}
    >
      <motion.div
        style={{
          width: `${drone_width}px`,
          height: `${drone_height}px`,
          // backgroundColor: "red",
          // public/drone.png
          backgroundImage: "url(./drone.png)",
          backgroundSize: "cover",

          position: "relative",
          top: `${currentCoordinate.y * 50}px`,
          left: `${currentCoordinate.x * 50}px`,
        }}
        animate={{
          top: `${nextCoordinateData.y * 50}px`,
          left: `${nextCoordinateData.x * 50}px`,
        }}
        // duration = distance
        transition={{
          duration:
            Math.sqrt(
              Math.pow(nextCoordinateData.x - currentCoordinate.x, 2) +
                Math.pow(nextCoordinateData.y - currentCoordinate.y, 2)
            ) / speed,
        }}
        onAnimationComplete={() => {
          if (!isLastCoordinate()) {
            nextCoordinate();
          } else {
            setCurrentIndex(0);
          }
        }}
      >
        {!isLastCoordinate() && (
          // show coordinates
          <div
            style={{
              position: "absolute",
              top: -drone_height / 2,
              left: -drone_width / 2,
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "20px",
            }}
          >
            {`(${nextCoordinateData.x}, ${nextCoordinateData.y})`}
          </div>
        )}
      </motion.div>
      <svg
        height="100%"
        width="100%"
        style={{
          position: "relative",
          top: -drone_height / 2,
          left: drone_width / 2,
        }}
      >
        {/* show the path along the coordinates and also label the corrdinates at the end  */}
        {coordinates.map(
          (coordinate: { x: number; y: number }, index: number) => {
            if (index === coordinates.length - 1) {
              return null;
            }
            const nextCoordinate = coordinates[index + 1];
            const distance =
              parseInt(
                Math.sqrt(
                  Math.pow(nextCoordinate.x - coordinate.x, 2) +
                    Math.pow(nextCoordinate.y - coordinate.y, 2)
                ).toFixed(0)
              ) + 0.1;
            return (
              <g style={{
                // zIndex: 100,
              }}>
                <motion.line
                  x1={`${coordinate.x * scale}px`}
                  y1={`${coordinate.y * scale}px`}
                  x2={`${nextCoordinate.x * scale}px`}
                  y2={`${nextCoordinate.y * scale}px`}
                  stroke="black"
                  strokeWidth={index <= currentIndex ? "3" : "0"}
                  animate={{}}
                  transition={{
                    duration: distance / speed,
                  }}
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    
                  }}
                />
                {/* {index <= currentIndex &&
                  !(
                    coordinates[index + 1].x === 0 &&
                    coordinates[index + 1].y === 0
                  ) && (
                    <Weight
                      nextCoordinate={nextCoordinate}
                      index={index}
                      distance={distance}
                      drone_width={drone_width}
                      drone_height={drone_height}
                      speed={speed}
                      weight={weight_container[index]}
                    />
                  )} */}
              </g>
            );
          }
        )}
      </svg>
    </div>
  );
};

export default Drone;
