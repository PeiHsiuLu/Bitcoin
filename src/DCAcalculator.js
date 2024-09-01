import React, { useState } from 'react';
import axios from 'axios';

const DCACalculator = ({ onDateChange, onFrequencyChange, crypto, onCryptoChange }) => {
  const today = new Date().toISOString().slice(0, 10);
  const maxStartDate = '2017-09-29';
  const [investmentAmount, setInvestmentAmount] = useState('1'); // 初始值設為1
  const [investmentCurrency, setInvestmentCurrency] = useState('TWD');
  const [frequency, setFrequency] = useState('daily');
  const [startDate, setStartDate] = useState(maxStartDate);
  const [endDate, setEndDate] = useState(today);
  const [totalReturnRate, setTotalReturnRate] = useState(null);
  const [netIncome, setNetIncome] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [finalAmount, setFinalAmount] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const fetchKlineData = async (symbol, interval, startDate, endDate, limit = 1000) => {
    try {
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();
      
      const response = await axios.get('https://api.binance.com/api/v3/klines', {
        params: {
          symbol: symbol,
          interval: interval,
          startTime: startTime,
          endTime: endTime,
          limit: limit
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching Kline data:', error);
      return null;
    }
  };

  const handleInvestmentChange = (e) => {
    setInvestmentAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setInvestmentCurrency(e.target.value);
  };

  const handleFrequencyChange = (e) => {
    const newFrequency = e.target.value;
    setFrequency(newFrequency);
    onFrequencyChange(newFrequency);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    const currentDate = new Date().toISOString().slice(0, 10);
    
    if (new Date(newStartDate) > new Date(currentDate)) {
      alert('開始日期不能晚於今天');
      return;
    }

    if (new Date(newStartDate) < new Date(maxStartDate)) {
      alert('開始日期不能早於2017-09-29');
      return;
    }

    if (new Date(newStartDate) > new Date(endDate)) {
      alert('開始日期不能晚於結束日期');
      return;
    }

    setStartDate(newStartDate);
    onDateChange(newStartDate, endDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    const currentDate = new Date().toISOString().slice(0, 10);
    
    if (new Date(newEndDate) > new Date(currentDate)) {
      alert('結束日期不能晚於今天');
      return;
    }

    if (new Date(newEndDate) < new Date(startDate)) {
      alert('結束日期不能早於開始日期');
      return;
    }

    setEndDate(newEndDate);
    onDateChange(startDate, newEndDate);
  };

  const handleCryptoChange = (e) => {
    onCryptoChange(e.target.value);
  };

  const calculateInvestmentReturns = async () => {
    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      alert('請輸入正確金額數值');
      return;
    }

    const investmentAmountUSD = investmentCurrency === 'TWD' ? investmentAmount * 0.033 : investmentAmount;
    const investmentDates = getInvestmentDates(startDate, endDate, frequency);
    const totalInvested = investmentDates.length * parseFloat(investmentAmountUSD);
    setTotalInvestment(totalInvested);

    const symbol = crypto === 'BTC' ? 'BTCUSDT' : crypto === 'ETH' ? 'ETHUSDT' : 'ADAUSDT';
    const marketData = await fetchKlineData(symbol, '1d', startDate, endDate);
    if (!marketData || marketData.length === 0) {
      console.error('No market data found for the given range.');
      return;
    }

    let totalValueAtEnd = 0;
    for (const date of investmentDates) {
      const closePrice = getClosePriceForDate(marketData, date);
      if (closePrice) {
        totalValueAtEnd += investmentAmountUSD / closePrice;
      } else {
        console.error(`No market data for date: ${date}`);
      }
    }

    const finalMarketData = await fetchKlineData(symbol, '1d', endDate, endDate);
    if (finalMarketData && finalMarketData.length > 0) {
      const finalClosePrice = parseFloat(finalMarketData[0][4]);
      const finalTotalValue = totalValueAtEnd * finalClosePrice;
      setFinalAmount(finalTotalValue);

      const returnRate = ((finalTotalValue - totalInvested) / totalInvested) * 100;
      setTotalReturnRate(returnRate.toFixed(2));

      const netEarnings = finalTotalValue - totalInvested;
      setNetIncome(netEarnings);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(investmentAmount) <= 0) {
      alert('請輸入正確金額數值');
      return;
    }
    calculateInvestmentReturns();
    setShowResults(true);
  };

  const handleClear = () => {
    setInvestmentAmount('1'); // 重設為1
    setInvestmentCurrency('TWD');
    setFrequency('daily');
    setStartDate(maxStartDate);
    setEndDate(today);
    setTotalInvestment(null);
    setFinalAmount(null);
    setNetIncome(null);
    setTotalReturnRate(null);
    setShowResults(false);
  };

  const getClosePriceForDate = (marketData, date) => {
    const dateTime = new Date(date).getTime();
    const candle = marketData.find(c => c[0] === dateTime);
    return candle ? parseFloat(candle[4]) : null;
  };

  return (
    <div className="calculator-container">
      <form onSubmit={handleSubmit}>
        <fieldset className="calculator-fieldset">
          <legend>神奇的DCA計算器</legend>
          {!showResults && (
            <>
              <div className="form-group">
                <label htmlFor="crypto">選擇加密貨幣</label>
                <select id="crypto" className="form-control" value={crypto} onChange={handleCryptoChange}>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="ADA">Cardano (ADA)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="investmentCurrency">選擇貨幣類型</label>
                <select id="investmentCurrency" className="form-control" value={investmentCurrency} onChange={handleCurrencyChange}>
                  <option value="TWD">台幣 (TWD)</option>
                  <option value="USD">美元 (USD)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="investmentAmount">投入金額</label>
                <input
                  id="investmentAmount"
                  type="number"
                  className="form-control"
                  value={investmentAmount}
                  onChange={handleInvestmentChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="frequency">頻率</label>
                <select
                  id="frequency"
                  className="form-control"
                  value={frequency}
                  onChange={handleFrequencyChange}
                >
                  <option value="daily">每天</option>
                  <option value="weekly">每周</option>
                  <option value="every_two_weeks">每兩個星期</option>
                  <option value="monthly">每個月</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="startDate">開始日期</label>
                <input
                  id="startDate"
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">結束日期</label>
                <input
                  id="endDate"
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </>
          )}
          <button 
            type="button" 
            onClick={showResults ? handleClear : handleSubmit} 
            className="output" 
            style={{ backgroundColor: 'transparent', maxWidth: '18vw', marginTop: '2vw'}}
          >
            {showResults ? '清除結果' : '輸出結果'}
          </button>
          {showResults && (
            <>
              <p>總投資: {totalInvestment !== null ? `${Math.round(totalInvestment)} ${investmentCurrency === 'TWD' ? '台幣' : '美元'}` : '---'}</p>
              <p>最終金額: {finalAmount !== null ? `${Math.round(finalAmount)} ${investmentCurrency === 'TWD' ? '台幣' : '美元'}` : '---'}</p>
              <p>淨收入: {netIncome !== null ? `${Math.round(netIncome)} ${investmentCurrency === 'TWD' ? '台幣' : '美元'}` : '---'}</p>
              <p>總報酬率: {totalReturnRate !== null ? `${Math.round(totalReturnRate)}%` : '---'}</p>
            </>
          )}
        </fieldset>
      </form>
    </div>
  );
};

function getInvestmentDates(start, end, freq) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dates = [];

  while (startDate <= endDate) {
    dates.push(startDate.toISOString().split('T')[0]);
    if (freq === 'daily') {
      startDate.setDate(startDate.getDate() + 1);
    } else if (freq === 'weekly') {
      startDate.setDate(startDate.getDate() + 7);
    } else if (freq === 'every_two_weeks') {
      startDate.setDate(startDate.getDate() + 14);
    } else if (freq === 'monthly') {
      startDate.setMonth(startDate.getMonth() + 1);
    }
  }

  return dates;
}

export default DCACalculator;
