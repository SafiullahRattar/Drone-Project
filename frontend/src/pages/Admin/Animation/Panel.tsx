import React, { useState } from "react";
import "./Panel.scss";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  setAnimationScaleXAction,
  setAnimationScaleYAction,
  setAnimationSpeedAction,
} from "../../../actions/animationActions";

const Panel = () => {
  const dispatch = useAppDispatch();

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

  const [showDroneData, setShowDroneData] = useState(false);

  const calculateRemainingWeight = () => {
    // TODO#1: Calculate the remaining weight
    const totalWeight = weight_container.reduce(
      (acc: any, curr: any) => acc + curr,
      0
    );
    const usedWeight = weight_container
      .slice(0, selected_index)
      .reduce((acc: any, curr: any) => acc + curr, 0);

    return totalWeight - usedWeight;
  };

  const timeToNextCoordinate = (index: number) => {
    const currentCoordinate = coordinates[index];
    const nextCoordinateData = coordinates[(index + 1) % coordinates.length];

    return (
      Math.sqrt(
        Math.pow(nextCoordinateData.x - currentCoordinate.x, 2) *
          Math.pow(scaleX, 1) +
          Math.pow(nextCoordinateData.y - currentCoordinate.y, 2) *
            Math.pow(scaleY, 1)
      ) / speed || 0.1
    );
  };
  const calculateRemainingTime = () => {
    const timeSpent = time_elapsed[selected_index];

    return Math.round(time_elapsed[time_elapsed.length - 1] - timeSpent);
  };

  const handleSpeedChange = (value: number) => {
    dispatch(setAnimationSpeedAction(value));
  };

  const handleScaleXChange = (value: number) => {
    dispatch(setAnimationScaleXAction(value));
  };

  const handleScaleYChange = (value: number) => {
    dispatch(setAnimationScaleYAction(value));
  };

  const scaleIncrement = 10;

  return (
    <div className="panel">
      <div className="panel__header">
        <h2>Control Panel</h2>
      </div>
      <div className="panel__body">
        <div className="panel__remaining">
          {/* <p>Remaining Weight: {calculateRemainingWeight()}</p>
          <p>Remaining Time: {calculateRemainingTime()} minutes</p> */}
          <div className="panel__tile">
            <label htmlFor="left">Speed: </label>
            <div className="right">
              <button onClick={() => handleSpeedChange(speed - 1)}>-</button>
              <span>{speed}</span>

              <button onClick={() => handleSpeedChange(speed + 1)}>+</button>
            </div>
          </div>
          <div className="panel__tile">
            <label htmlFor="left">Scale (X): </label>
            <div className="right">
              <button
                onClick={() => handleScaleXChange(scaleX - scaleIncrement)}
              >
                -
              </button>
              {scaleX}
              <button
                onClick={() => handleScaleXChange(scaleX + scaleIncrement)}
              >
                +
              </button>
            </div>
          </div>
          <div className="panel__tile">
            <label htmlFor="left">Scale (Y): </label>
            <div className="right">
              <button
                onClick={() => handleScaleYChange(scaleY - scaleIncrement)}
              >
                -
              </button>
              {scaleY}
              <button
                onClick={() => handleScaleYChange(scaleY + scaleIncrement)}
              >
                +
              </button>
            </div>
          </div>
          <div className="panel__tile">
            <label htmlFor="left">Total Time Taken:</label>
            <div className="right">{time_elapsed[0]} minutes</div>
          </div>
          <div className="panel__tile">
            <label htmlFor="left">Total Weight Delivered:</label>
            <div className="right">
              {weight_container.reduce((acc: any, curr: any) => acc + curr, 0)}{" "}
              kgs
            </div>
          </div>
          <div className="panel__tile">
            <label htmlFor="left">Remaining Weight: </label>
            <div className="right">{calculateRemainingWeight()} kgs</div>
          </div>
          <div className="panel__tile">
            <label htmlFor="left">Remaining Time: </label>
            <div className="right">{calculateRemainingTime()} minutes</div>
          </div>
        </div>
        <div className="panel_tile">
          <button onClick={() => setShowDroneData(!showDroneData)}>
            {showDroneData ? "Hide" : "Show"} Drone Data
          </button>
        </div>
        <div className="panel__drone">
          {showDroneData && (
            <>
              <div className="panel__drone__data header">
                <div>Coordinates</div>
                <div>Weight</div>
                <div>Time Elapsed</div>
              </div>
              {coordinates.map((coordinate: any, index: number) => {
                return (
                  <div
                    className={`panel__drone__data ${
                      index === selected_index && "current"
                    }`}
                    key={index}
                    style={{
                      backgroundColor:
                        index === selected_index ? "#bf5af2" : "",
                      transition: `background-color ${timeToNextCoordinate(
                        index
                      )}s`,
                    }}
                  >
                    <div>
                      ({coordinate.x.toFixed(2)}, {coordinate.y.toFixed(2)})
                    </div>
                    <div>{weight_container[index]}</div>
                    <div>{index === 0 ? 0 : time_elapsed[index]}</div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
