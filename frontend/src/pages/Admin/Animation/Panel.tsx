import React, { useState } from "react";
import "./Panel.scss";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { setAnimationSpeedAction } from "../../../actions/animationActions";

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
  } = useAppSelector((state: RootState) => state.animationReducer);

  const [showDroneData, setShowDroneData] = useState(false);

  const calculateRemainingWeight = () => {
    const totalWeight = weight_container.reduce(
      (acc: any, curr: any) => acc + curr,
      0
    );
    const usedWeight = weight_container
      .slice(0, selected_index)
      .reduce((acc: any, curr: any) => acc + curr, 0);

    return totalWeight - usedWeight;
  };

  const calculateRemainingTime = () => {
    const timeSpent = time_elapsed[selected_index];

    return Math.round(time_elapsed[time_elapsed.length - 1] - timeSpent);
  };

  const handleSpeedChange = (value: number) => {
    dispatch(setAnimationSpeedAction(value));
  };

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
              {speed}
              <button onClick={() => handleSpeedChange(speed + 1)}>+</button>
            </div>
          </div>
          <div className="panel__tile">
            <label htmlFor="left">Time Elapsed</label>
            <div className="right">{time_elapsed[selected_index]} minutes</div>
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
        <div className="panel__drone">
          <button onClick={() => setShowDroneData(!showDroneData)}>
            {showDroneData ? "Hide" : "Show"} Drone Data
          </button>
          {showDroneData && (
            <div className="panel__drone-data">
              <h3>Drone Data</h3>
              <p>Weight Container:</p>
              <ul>
                {weight_container.map(
                  (
                    weight:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined,
                    index: React.Key | null | undefined
                  ) => (
                    <li key={index}>{weight}</li>
                  )
                )}
              </ul>
              <p>Coordinates:</p>
              <ul>
                {coordinates.map(
                  (
                    coord: {
                      x:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      y:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    },
                    index: React.Key | null | undefined
                  ) => (
                    <li key={index}>
                      ({coord.x}, {coord.y})
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
