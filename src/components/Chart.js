import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale);

const CoinChart = ({ history }) => {
  return (
    <>
      <Line
        data={{
          labels: history?.map((coin) => {
            const data = new Date(coin[0]).toLocaleDateString();
            return data;
          }),
          datasets: [
            {
              data: history?.map((coin) => coin[1]),
              label: `Price for the previous 30 days in Euros`,
              borderColor: "white",
              borderWidth: 1,
            },
          ],
        }}
        options={{ elements: { point: { radius: 1 } } }}
      />
    </>
  );
};

export default CoinChart;
