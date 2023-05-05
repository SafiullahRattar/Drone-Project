import React, { useState } from "react";
import { motion } from "framer-motion";

const coordinates = [
  { x: 0, y: 0 },
  { x: 1, y: 3 },
  { x: 3, y: 6 },
  { x: 0, y: 0 },
  { x: 2, y: 9 },
  { x: 0, y: 0 },
];

const Square = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCoordinate = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const isLastCoordinate = () => {
    return currentIndex >= coordinates.length - 2;
  };

  const currentCoordinate = coordinates[currentIndex];
  const nextCoordinateData = coordinates[currentIndex + 1];

  const drone_width = 100;
  const drone_height = 100;
  const speed = 3;

  return (
    <div
      style={{
        width:
          coordinates.reduce((acc, curr) => {
            return Math.max(acc, curr.x * 50);
          }, 0) + drone_width,
        height:
          coordinates.reduce((acc, curr) => {
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
        {coordinates.map((coordinate, index) => {
          if (index === coordinates.length - 1) {
            return null;
          }
          const nextCoordinate = coordinates[index + 1];
          const distance = Math.sqrt(
            Math.pow(nextCoordinate.x - coordinate.x, 2) +
              Math.pow(nextCoordinate.y - coordinate.y, 2)
          );
          return (
            <g>
              <motion.line
                x1={`${coordinate.x * 50}px`}
                y1={`${coordinate.y * 50}px`}
                x2={`${nextCoordinate.x * 50}px`}
                y2={`${nextCoordinate.y * 50}px`}
                stroke="black"
                strokeWidth={index <= currentIndex ? "3" : "0"}
                animate={{}}
                transition={{
                  duration: distance / speed,
                }}
              />
              {/* should draw a box at the end of the line when transition is over and not draw for (0, 0) */}
              {index <= currentIndex &&
                !(
                  coordinates[index + 1].x === 0 &&
                  coordinates[index + 1].y === 0
                ) && (
                  <motion.rect
                    x={`${nextCoordinate.x * 50}px`}
                    y={`${nextCoordinate.y * 50}px`}
                    //width = drone_width/5
                    width={`${drone_width / 5}px`}
                    height={`${drone_height / 5}px`}
                    fill="red"
                    opacity={0}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: distance / speed,
                      duration: 0.5,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                  />
                )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const App = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Square />
      {/* svg of paths */}
    </div>
  );
};

export default App;
