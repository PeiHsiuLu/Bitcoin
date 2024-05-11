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

// 註冊ChartJS所需的組件
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

const BitcoinPriceChart = ({ range }) => {
  const [chartData, setChartData] = useState({ datasets: [] });

  // 計算條形大小的函數
  const calculateBarSize = (start, end) => {
    const diffTime = Math.abs(new Date(end) - new Date(start));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays <= 30) {
      return '1H';
    } else if (diffDays <= 180) {
      return '1D';
    } else if (diffDays <= 540) {
      return '1W';
    } else {
      return '1M';
    }
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const barSize = calculateBarSize(range.startDate, range.endDate);
  
        // 轉換為Unix時間戳（毫秒）
        const startTimestamp = new Date(range.startDate).getTime();
        const endTimestamp = new Date(range.endDate).getTime();
  
        const response = await axios.get('https://www.okx.com/api/v5/market/history-index-candles', {
          params: {
            instId: 'BTC-USD',
            bar: barSize,
            // 使用Unix時間戳格式
            before: startTimestamp.toString(),
            after: endTimestamp.toString(),
            limit: '100'
          },
        });

        const candleData = response.data.data.map((candle) => ({
          x: new Date(parseInt(candle[0])),
          y: parseFloat(candle[4]),
        }));

        setChartData({
          datasets: [
            {
              label: `BTC-USD Historical (${barSize})`,
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

    fetchHistoricalData();
  }, [range]);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MM/dd/yyyy',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
        },
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
