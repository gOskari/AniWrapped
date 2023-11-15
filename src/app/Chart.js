'use client'

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: [
    'Action',
    'Adventure',
    'Comedy',
    'Drama'
  ],
  datasets: [
    {
      label: 'Genres Watched',
      data: [59, 80, 90, 81],
      backgroundColor: 'rgba(255,255,255, 0.5)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 3,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        display: true,
        color: 'rgba(255, 255, 255, 0.5)'
      },
      gridLines: {
        color: 'rgba(255, 255, 255, 0.5)'
      },
      ticks: {
        display: false
      },
      pointLabels: {
        font: {
          size: 14
        },
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
  },
  elements: {
    line: {
      borderWidth: 3
    },
  },
  plugins: {
    legend: {
      labels: {
        color: 'white',
        boxWidth: 0,
      }
    }
  }
};

const AnimeRadarChart = () => {
  return <Radar data={data} options={options} />;
};

export default AnimeRadarChart;
