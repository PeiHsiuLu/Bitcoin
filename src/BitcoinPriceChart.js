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

const BitcoinPriceChart = ({ range, frequency, crypto }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [realTimePrice, setRealTimePrice] = useState(null);

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
    return '1d';
  };

  const fetchHistoricalData = async (interval, startTime, endTime, symbol) => {
    const limit = 1000;
    let allData = [];
    let fetchMoreData = true;
    let currentStartTime = startTime;

    while (fetchMoreData) {
      const response = await axios.get('https://api.binance.com/api/v3/klines', {
        params: {
          symbol: symbol,
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

  const fetchRealTimePrice = async (symbol) => {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
        params: {
          symbol: symbol
        }
      });
      setRealTimePrice(response.data.price);
    } catch (error) {
      console.error('Error fetching real-time price:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interval = calculateBarSize(frequency);
        const startTime = new Date(range.startDate).getTime();
        const endTime = new Date(range.endDate).getTime();
        const symbol = crypto === 'BTC' ? 'BTCUSDT' : crypto === 'ETH' ? 'ETHUSDT' : 'ADAUSDT';

        const candleData = await fetchHistoricalData(interval, startTime, endTime, symbol);
        await fetchRealTimePrice(symbol);

        setChartData({
          datasets: [
            {
              label: `${crypto}-USD Historical (${interval})`,
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
  }, [range, frequency, crypto]);

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
        text: `Historical ${crypto} Price`,
      },
    },
  };

  return (
    <div className="chart-container">
      {realTimePrice && <div className="real-time-price">Current {crypto} Price: ${parseFloat(realTimePrice).toFixed(2)} (USD)</div>}
      <Line options={options} data={chartData} />
    </div>
  );
};

export default BitcoinPriceChart;
