import React from "react";
import { getAnimationDataAction } from "../../../actions/animationActions";
import { useAppDispatch } from "../../../utils/hooks";
import { useNavigate } from "react-router-dom";

interface IProps {
  paths: any;
  setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const PathTable = ({ paths, setShowAnimation }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function calculateTotalWeight(path: any[]): number {
    let totalWeight = 0;
    for (const pathItem of path) {
      if (pathItem.delivery) totalWeight += pathItem.delivery.package_id.weight;
    }
    return totalWeight;
  }

  function calculateTotalTimeElapsed(path: any[]): number {
    let totalTimeElapsed = path[path.length - 1].time_elapsed.toFixed(2);
    return totalTimeElapsed;
  }

  function calculateTotalDistance(path: any[]): string {
    let totalDistance = 0;
    for (const pathItem of path) {
      if (pathItem.delivery) totalDistance += pathItem.delivery.distance;
    }

    return totalDistance.toFixed(2);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total Weight</th>
            <th>Total Time</th>
            <th>Total Distance</th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Animation
            </th>
          </tr>
        </thead>
        <tbody>
          {paths.map((path: any, index: number) => (
            <tr key={path._id}>
              <td>{path._id.substring(0, 5)}...</td>
              <td>{calculateTotalWeight(path.path)}</td>
              <td>{calculateTotalTimeElapsed(path.path)}</td>
              <td>{calculateTotalDistance(path.path)}</td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    dispatch(getAnimationDataAction(index));
                    setShowAnimation(true);
                  }}
                >
                  Animation
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PathTable;
