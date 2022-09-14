import React, { useRef } from "react";

import {
  Bar,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
  Line,
  Pie,
} from "react-chartjs-2";

type Props = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  options: {
    maintainAspectRatio: boolean;
  };
};

export const BarComponent = (props: Props) => {
  const { data, options } = props;
  const chartRef = useRef();
  const onClickCanvas = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    console.log(getDatasetAtEvent(chart, event));
    console.log(getElementAtEvent(chart, event));
    console.log(getElementsAtEvent(chart, event));
  };
  return (
    <>
      <div className="w-64 h-44">
        <Bar
          ref={chartRef}
          data={data}
          options={options}
          onClick={onClickCanvas}
        />
      </div>
    </>
  );
};
export const PieComponent = (props: Props) => {
  const { data, options } = props;
  return (
    <>
      <div className="w-64 h-44">
        <Pie data={data} options={options} />
      </div>
    </>
  );
};

export const LineComponent = (props: Props) => {
  const { data, options } = props;
  return (
    <>
      <div className="w-64 h-44">
        <Line data={data} options={options} />
      </div>
    </>
  );
};
