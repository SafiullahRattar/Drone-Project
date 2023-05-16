import React, { useEffect, useState } from "react";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getPathsAction } from "../../../actions/pathActions";
import PathTable from "./PathTable";
import DroneAnimation from "../Animation/index";
import '../AdminList.scss'
import { withAdminAuth } from "../../../component/Wrapper/authWrapper";

const PathList = () => {
  const dispatch = useAppDispatch();
  const [selectedPath, setSelectedPath] = useState(-1);
  const [showAnimation, setShowAnimation] = useState(false);
  const { loading, error, paths } = useAppSelector(
    (state: RootState) => state.pathsReducer
  );

  useEffect(() => {
    dispatch(getPathsAction());
  }, []);

  console.log(paths);

  return (
    <div className="list">
      <h1>{showAnimation ? "Animation" : "Path List"}</h1>
      {showAnimation && (
        <div className="addNewButton">
          <button onClick={() => setShowAnimation(false)}>Show List</button>
        </div>
      )}
      <div>
        {!showAnimation ? (
          !loading &&
          !error &&
          paths.length !== 0 && (
            <PathTable paths={paths} setShowAnimation={setShowAnimation} />
          )
        ) : (
          <DroneAnimation />
        )}
      </div>
    </div>
  );
};

export default withAdminAuth(PathList);
