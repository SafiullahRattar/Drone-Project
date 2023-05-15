import React from "react";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

const PathList = () => {
  const dispatch = useAppDispatch();
//   const { loading, error, paths } = useAppSelector(
//     (state: RootState) => state.animationReducer
//   );

  return <div>PathList</div>;
};

export default PathList;
