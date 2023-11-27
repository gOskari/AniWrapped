"use client";
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

const rootStyle = getComputedStyle(document.documentElement);
const primaryColor = rootStyle.getPropertyValue("--primary-color").trim();
const secondaryColor = rootStyle.getPropertyValue("--secondary-color").trim();

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        display: true,
        color: "rgba(255, 255, 255, 0.5)",
      },
      beginAtZero: true,
      gridLines: {
        color: "rgba(255, 255, 255, 0.5)",
      },
      ticks: {
        display: false,
      },
      pointLabels: {
        font: {
          size: 14,
        },
        color: "rgba(255, 255, 255, 0.7)",
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
        color: "white",
        boxWidth: 0,
      },
    },
  },
};

const AnimeRadarChart = (genres) => {
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
        borderColor: secondaryColor,
        borderWidth: 3,
      },
    ],
  };

  return <Radar data={data} options={options} />;
};

export default AnimeRadarChart;
