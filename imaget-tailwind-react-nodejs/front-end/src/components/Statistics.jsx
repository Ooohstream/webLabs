import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Loader from "react-loader-spinner";

function CategoriesChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/categories/statistics"
      );
      setChartData(data);
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center">
      <div
        className="flex flex-1 justify-center items-center"
        style={{ maxWidth: 500, maxHeight: 500 }}
      >
        {isLoading ? (
          <Loader visible={isLoading} type="Grid" color="black" />
        ) : (
          <Pie
            options={{
              title: {
                display: "Title",
                text: `Largest Cities In Location`,
                fontSize: 25,
              },
              legend: {
                display: true,
                position: "bottom",
              },
            }}
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "Population",
                  data: chartData.data,
                  backgroundColor: chartData.backgroundColor,
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CategoriesChart;
