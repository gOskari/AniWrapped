"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
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

/*
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
*/

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
        boxWidth: 10,
      },
    },
  },
};

export default function AnimeRadarChart(genres) {
  /*
  const query = gql`
    query ($name: String) {
      User(name: $name) {
        id
        name
        avatar {
          large
          medium
        }
        statistics {
          anime {
            count
            minutesWatched
            genres {
              genre
              count
            }
          }
        }
      }
    }
  `;

  const data1 = useSuspenseQuery(query, {
    variables: { name: name },
  });

  if (data1.loading) {
    return <>loading...</>;
  }

  const genres = data1.data.User.statistics.anime.genres;
  */
  genres = genres.genres;

  console.log("genres", genres);

  const datasetColors = {
    genresWatched: {
      backgroundColor: "rgba(63, 81, 181, 0.5)",
      borderColor: "rgb(63, 81, 181)",
    },
    averageUser: {
      backgroundColor: "rgba(0, 150, 136, 0.5)",
      borderColor: "rgb(0, 150, 136)",
    },
  };

  //const sortedGenres = genres.sort((a, b) => b.count - a.count);

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
        backgroundColor: datasetColors.genresWatched.backgroundColor,
        borderColor: datasetColors.genresWatched.borderColor,
        borderWidth: 3,
        pointBackgroundColor: datasetColors.genresWatched.borderColor, // Points color
      },
      {
        label: "Average User",
        data: [100, 60, 130, 95, 150],
        backgroundColor: datasetColors.averageUser.backgroundColor,
        borderColor: datasetColors.averageUser.borderColor,
        borderWidth: 3,
        pointBackgroundColor: datasetColors.averageUser.borderColor, // Points color
      },
    ],
  };

  return <Radar data={data} options={options} />;
}
