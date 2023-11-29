"use client";
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        display: true,
      },
      beginAtZero: true,
      gridLines: {},
      ticks: {
        display: false,
      },
      pointLabels: {
        font: {
          size: 14,
        },
      },
    },
  },
  elements: {
    line: {
      borderWidth: 3,
    },
  },
  plugins: {
    legend: {
      labels: {
        boxWidth: 0,
      },
    },
  },
};

const AnimeRadarChart = (genres) => {
  const { resolvedTheme } = useTheme();
  const chartRef = useRef(null);

  // Function to read the CSS variables for the current theme
  const getCssVariables = () => {
    const rootStyle = getComputedStyle(document.documentElement);
    return {
      bgColor: rootStyle.getPropertyValue('--bg-color').trim(),
      primaryColor: rootStyle.getPropertyValue('--primary-color').trim(),
      secondaryColor: rootStyle.getPropertyValue('--secondary-color').trim(),
      secondaryColorDark: rootStyle.getPropertyValue('--secondary-color-dark').trim(),
    };
  };

  const updateChartTheme = () => {
    const chart = chartRef.current;
    const cssVars = getCssVariables();

    if (chart) {
      chart.options.scales.r.angleLines.color = cssVars.secondaryColor;
      chart.options.scales.r.gridLines.color = cssVars.secondaryColor;
      chart.options.scales.r.pointLabels.color = cssVars.secondaryColorDark;
      chart.options.plugins.legend.labels.color = cssVars.secondaryColor;
      
      chart.data.datasets.forEach(dataset => {
        dataset.backgroundColor = cssVars.primaryColor;
        dataset.borderColor = cssVars.secondaryColor;
      });

      chart.update();
    }
  };

  useEffect(() => {
    updateChartTheme();
  }, [resolvedTheme]);
  
  genres = genres.genres;

  const sortedGenres = genres.sort((a, b) => b.count - a.count);

  //console.log('sorted', sortedGenres);

  let a = genres.find((genre) => genre.genre === "Fantasy") || 100;
  let b = genres.find((genre) => genre.genre === "Action") || 100;
  let c = genres.find((genre) => genre.genre === "Comedy") || 100;
  let d = genres.find((genre) => genre.genre === "Drama") || 100;
  let e = genres.find((genre) => genre.genre === "Romance") || 100;

  const data = {
    labels: ["Fantasy", "Action", "Comedy", "Drama", "Romance"],
    datasets: [
      {
        label: "Genres Watched",
        data: [a.count, b.count, c.count, d.count, e.count],
        backgroundColor: "rgba(255,255,255, 0.5)",
        borderWidth: 3,
      },
    ],
  };

  return <Radar ref={chartRef} data={data} options={options} />;
};

export default AnimeRadarChart;
