import React from "react";
// @ts-ignore
import { useSpring, animated } from "react-spring";

const coordinates = [
  [0, 0],
  [3, 5],
  [6, 7],
  [0, 0],
  [8, 3],
  [0, 0],
];
const weights = [15, 20, 5];

interface PathProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  weight: number;
  weightLoss: number;
  delay: number;
}

const Path = ({ x1, y1, x2, y2, weight, weightLoss, delay }: PathProps) => {
  const pathSpring = useSpring({
    from: { weightLoss: 0 },
    to: { weightLoss: weightLoss },
    delay: delay * 500,
  });

  return (
    <React.Fragment>
      <animated.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="0.1"
      />
      <animated.circle
        cx={x2}
        cy={y2}
        // r={pathSpring.weightLoss.interpolate((val: number) =>
        //   Math.max(0, weight - val)
        // )}
        r={1}
      // fill random color
        fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
      />
    </React.Fragment>
  );
};

const PathAnimation = () => {
  const paths = [];
  let currentWeightIndex = 0;
  let totalWeight = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const start = coordinates[i];
    const end = coordinates[i + 1];
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    const segmentWeight = weights[currentWeightIndex] || 0;
    const segmentDistance = distance / 10;
    const weightLoss = (segmentWeight * segmentDistance) / distance;

    paths.push({
      x1: start[0],
      y1: start[1],
      x2: end[0],
      y2: end[1],
      weight: segmentWeight,
      weightLoss: weightLoss,
    });

    totalWeight += segmentWeight;
    currentWeightIndex = Math.min(currentWeightIndex + 1, weights.length - 1);
  }

  const weightSpring = useSpring({
    from: { weight: 0 },
    to: { weight: totalWeight },
  });

  return (
    <div style={{
    }}>
      <svg viewBox="0 0 10 10">
        {paths.map(({ x1, y1, x2, y2, weight, weightLoss }, i) => (
          <Path
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            weight={weight}
            weightLoss={weightLoss}
            delay={i}
          />
        ))}
        <text x="50" y="50" textAnchor="middle">
          {/* Total Weight: {weightSpring.weight.interpolate((val: number) => val.toFixed(2))} */}
          
        </text>
      </svg>
    </div>
  );
};

export default PathAnimation;
