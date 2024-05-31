import React, { useState } from 'react';
import BitcoinPriceChart from './BitcoinPriceChart';
import DCACalculator from './DCAcalculator';
import Navbar from './Navbar';
import './App.css';
import Founders from './Founders';
import WebsitePhilosophy from './WebsitePhilosophy';
import BitcoinIntroduction from './BitcoinIntroduction';
import DCAintro from './DCAintro';
import UserForum from './last';

const App = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [chartRange, setChartRange] = useState({
    startDate: '2021-01-01',
    endDate: today,
  });
  const [frequency, setFrequency] = useState('daily');

  // 處理滾動的函數，確保導航到正確的頁面部分
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  // 處理從 DCACalculator 組件接收到的日期變化
  const handleDateChange = (startDate, endDate) => {
    setChartRange({ startDate, endDate });
  };

  // 處理從 DCACalculator 組件接收到的頻率變化
  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
  };

  return (
    <div className="App">
      <img className="bitcoinsnow" src="https://raw.githubusercontent.com/PeiHsiuLu/PeiHsiuLu/main/%E6%96%B0%E6%AF%94%E7%89%B9%E9%9B%AA%E7%90%83.png" alt="比特雪球图片" width="200vw" height="100vw"></img>
      <div className="main">
        <Navbar scrollToSection={scrollToSection} />
        <div className="app-container">
          <DCACalculator onDateChange={handleDateChange} onFrequencyChange={handleFrequencyChange} />
          <div className="chart-section">
            <BitcoinPriceChart range={chartRange} frequency={frequency} />
          </div>
        </div>
        <section id="philosophy"> <WebsitePhilosophy /></section>
        <section id="bitcoin-introduction"> <BitcoinIntroduction /></section>
        <section id="dca-introduction"><DCAintro /></section>
        <section id="forum"> <UserForum /></section>
      </div>
    </div>
  );
};

export default App;
