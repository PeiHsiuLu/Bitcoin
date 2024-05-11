import React, { useState } from 'react';
import BitcoinPriceChart from './BitcoinPriceChart';
import DCAcalculator from './DCAcalculator'; // 导入 DCACalculator 组件
import Navbar from './Navbar';
import './App.css';
import Founders from './Founders'; // Adjust the path as needed based on your project structure
import WebsitePhilosophy from './WebsitePhilosophy';
import BitcoinIntroduction from './BitcoinIntroduction';
import DCAintro from './DCAintro';
import UserForum from './last';

const App = () => {
  const today = new Date().toISOString().slice(0, 10);
  console.log(today);
  const timeInterval = 10000; // 固定更新間隔為 10 秒，不使用 useState
  const [chartRange, setChartRange] = useState({
    startDate: '2021-01-01',
    endDate: today,
  });
  

  // 处理滚动的函数，确保导航到正确的页面部分
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  // 处理从 DCACalculator 组件接收到的日期变化
  const handleDateChange = (startDate, endDate) => {
    setChartRange({ startDate, endDate });
  };

  return (
    <div className="App">
      <img className="bitcoinsnow" src="https://raw.githubusercontent.com/PeiHsiuLu/PeiHsiuLu/main/%E6%96%B0%E6%AF%94%E7%89%B9%E9%9B%AA%E7%90%83.png" alt="比特雪球图片" width="200vw" height="100vw"></img>
      <div className = "main">
      <Navbar scrollToSection={scrollToSection} />
        <div className="app-container">
        <DCAcalculator onDateChange={handleDateChange} />
        <div className="chart-section">
          <BitcoinPriceChart range={chartRange} />
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