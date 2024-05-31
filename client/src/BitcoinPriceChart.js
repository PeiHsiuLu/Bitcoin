import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// 註冊 ChartJS 所需的組件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const BitcoinPriceChart = ({ range, frequency }) => {
  const [chartData, setChartData] = useState({ datasets: [] });

  const calculateBarSize = (frequency) => {
    if (frequency === 'daily') {
      return '1d';
    } else if (frequency === 'weekly') {
      return '1w';
    } else if (frequency === 'every_two_weeks') {
      return '2w';
    } else if (frequency === 'monthly') {
      return '1M';
    }
    return '1d'; // 默認為每天
  };

  const fetchHistoricalData = async (interval, startTime, endTime) => {
    const limit = 1000;
    let allData = [];
    let fetchMoreData = true;
    let currentStartTime = startTime;

    while (fetchMoreData) {
      const response = await axios.get('https://api.binance.com/api/v3/klines', {
        params: {
          symbol: 'BTCUSDT',
          interval: interval,
          startTime: currentStartTime,
          endTime: endTime,
          limit: limit
        }
      });

      const data = response.data;
      allData = [...allData, ...data];
      if (data.length < limit) {
        fetchMoreData = false;
      } else {
        currentStartTime = data[data.length - 1][0] + 1;
      }
    }

    return allData.map((candle) => ({
      x: new Date(candle[0]),
      y: parseFloat(candle[4]),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interval = calculateBarSize(frequency);
        const startTime = new Date(range.startDate).getTime();
        const endTime = new Date(range.endDate).getTime();

        const candleData = await fetchHistoricalData(interval, startTime, endTime);

        setChartData({
          datasets: [
            {
              label: `BTC-USD Historical (${interval})`,
              data: candleData,
              borderColor: 'rgb(33, 150, 243)',
              backgroundColor: 'rgba(33, 150, 243, 0.5)',
            },
          ],
        });

      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchData();
  }, [range, frequency]);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: frequency === 'daily' ? 'day' : frequency === 'weekly' ? 'week' : 'month',
          tooltipFormat: 'MM/dd/yyyy',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historical Bitcoin Price',
      },
    },
  };

  return (
    <div className="chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default BitcoinPriceChart;
