import React from "react";
// import the core library.
import ReactEChartsCore from "echarts-for-react";
import dataHub from "./dataHub";

// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";

// Import charts, all with Chart suffix
import { BarChart, LineChart } from "echarts/charts";

// import components, all suffixed with Component
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
} from "echarts/components";

// Import renderer, note that introducing the CanvasRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  DatasetComponent,
]);

const xLineData = dataHub.map((item) => item.Flavanoids);
const yLineData = dataHub.map((item) => item.Ash);
const xBarData = dataHub.map((item) => item.Alcohol);
const yBarData = dataHub.map((item) => item.Magnesium);

let xBarArr: any[] = [];
let yBarArr: any[] = [];

for (let i = 0; i < xBarData.length; i++) {
  if (xBarData[i] !== xBarData[i + 1]) {
    xBarArr.push(xBarData[i]);
  }
}

let minval = Math.max(...yBarData);
for (let i = 0; i < dataHub.length; i++) {
  if (dataHub[i]?.Alcohol === dataHub[i + 1]?.Alcohol) {
    if (minval > dataHub[i]?.Magnesium) {
      minval = dataHub[i]?.Magnesium;
    }
  } else {
    yBarArr.push(minval);
    minval = Math.max(...yBarData);
  }
}

console.log(yBarArr);

const lineData = {
  title: {
    text: "Line Chart - Flavanoids v/s Ash",
  },
  xAxis: {
    type: "category",
    data: xLineData,
    name: "Flavanoids",
    nameLocation: "middle",
    nameGap: 25,
    color: "black",
  },
  yAxis: [
    {
      type: "value",
      name: "Ash",
      nameLocation: "middle",
      nameGap: 25,
    },
  ],
  series: [
    {
      data: yLineData,
      type: "line",
      smooth: true,
    },
  ],
};

const barData = {
  title: {
    text: "Bar Chart - Alocohol v/s Magnesium",
  },
  xAxis: {
    type: "category",
    data: xBarArr,
    name: "Alocohol",
    nameLocation: "middle",
    nameGap: 25,
    color: "black",
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: "value",
    name: "Magnesium",
    nameLocation: "middle",
    nameGap: 25,
    color: "black",
  },
  series: [
    {
      data: yBarArr,
      type: "bar",
    },
  ],
};

const App2: React.FC = (props) => {
  return (
    <>
      <ReactEChartsCore
        option={lineData}
        echarts={echarts}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        //   onChartReady={this.onChartReadyCallback}
      />
      <ReactEChartsCore
        option={barData}
        echarts={echarts}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        //   onChartReady={this.onChartReadyCallback}
      />
    </>
  );
};

export default App2;
