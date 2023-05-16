import React, { useEffect, useState } from "react";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getPathsAction } from "../../../actions/pathActions";
import PathTable from "./PathTable";
import DroneAnimation from "../Animation/index";

const PathList = () => {
  const dispatch = useAppDispatch();
  const [selectedPath, setSelectedPath] = useState(-1);
  const { loading, error, paths } = useAppSelector(
    (state: RootState) => state.pathsReducer
  );

  useEffect(() => {
    dispatch(getPathsAction());
  }, []);

  console.log(paths);

  return (
    <div>
      <h1>Path List</h1>
      {!loading && !error && paths.length !== 0 && (
        <div>
          <PathTable paths={paths} />
        </div>
      )}
      {/* <div>
        <DroneAnimation />
      </div> */}
    </div>
  );
};

export default PathList;
