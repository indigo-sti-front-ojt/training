import React, { useRef } from "react";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
export const MultiGraph = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "line" as const,
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: [1, 2, 3, 100, 5, 6, 7],
      },
      {
        type: "bar" as const,
        label: "Dataset 2",
        backgroundColor: "rgb(75, 192, 192)",
        data: [10, 20, 30, 40, 50, 60, 70],

        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "bar" as const,
        label: "Dataset 3",
        backgroundColor: "rgb(53, 162, 235)",
        data: [100, 200, 300, 400, 500, 600, 700],
      },
    ],
  };
  const options = {
    // アスペクト比を保つかどうか？
    maintainAspectRatio: false,
  };

  const chartRef = useRef();
  const onClickCanvas = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    console.log(getDatasetAtEvent(chart, event));
    console.log(getElementsAtEvent(chart, event));
    console.log(getElementAtEvent(chart, event));
  };
  return (
    <>
      <div className="w-96 h-96">
        <Chart
          ref={chartRef}
          type="bar"
          onClick={onClickCanvas}
          options={options}
          data={data}
        />
      </div>
    </>
  );
};

export const MultiGraphSingle = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "line" as const,
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: [1, 2, 3, 100, 5, 6, 7],
      },
    ],
  };
  const options = {
    // アスペクト比を保つかどうか？
    maintainAspectRatio: false,
  };

  const chartRef = useRef();
  const onClickCanvas = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    console.log(getDatasetAtEvent(chart, event));
    console.log(getElementsAtEvent(chart, event));
    console.log(getElementAtEvent(chart, event));
  };
  return (
    <>
      <div className="w-96 h-96">
        <Chart
          ref={chartRef}
          type="bar"
          onClick={onClickCanvas}
          options={options}
          data={data}
        />
      </div>
    </>
  );
};
