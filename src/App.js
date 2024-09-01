import React, { useState, useEffect } from 'react';
import BitcoinPriceChart from './BitcoinPriceChart';
import DCACalculator from './DCAcalculator';
import Navbar from './Navbar';
import './App.css';
import Founders from './Founders';
import WebsitePhilosophy from './WebsitePhilosophy';
import BitcoinIntroduction from './BitcoinIntroduction';
import DCAintro from './DCAintro';
import UserForum from './last';
import { database } from './firebaseConfig'; // Import Firebase database
import { ref, set, onValue } from 'firebase/database'; // Import Realtime Database methods

const App = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [chartRange, setChartRange] = useState({
    startDate: '2021-01-01',
    endDate: today,
  });
  const [frequency, setFrequency] = useState('daily');
  const [crypto, setCrypto] = useState('BTC');
  const [forumMessages, setForumMessages] = useState([]); // State for storing forum messages

  // Example of fetching data from Firebase
  useEffect(() => {
    const messagesRef = ref(database, 'forum/messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setForumMessages(Object.values(data)); // Load messages into state
      }
    });
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const handleDateChange = (startDate, endDate) => {
    setChartRange({ startDate, endDate });
  };

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
  };

  const handleCryptoChange = (newCrypto) => {
    setCrypto(newCrypto);
  };

  return (
    <div className="App">
      <img className="bitcoinsnow" src="https://raw.githubusercontent.com/PeiHsiuLu/PeiHsiuLu/main/%E6%96%B0%E6%AF%94%E7%89%B9%E9%9B%AA%E7%90%83.png" alt="比特雪球圖片" width="200vw" height="100vw" />
      <div className="main">
        <Navbar scrollToSection={scrollToSection} />
        <div className="app-container">
          <DCACalculator
            onDateChange={handleDateChange}
            onFrequencyChange={handleFrequencyChange}
            crypto={crypto}
            onCryptoChange={handleCryptoChange}
          />
          <div className="chart-section">
            <BitcoinPriceChart range={chartRange} frequency={frequency} crypto={crypto} />
          </div>
        </div>
        <section id="philosophy">
          <WebsitePhilosophy />
        </section>
        <section id="bitcoin-introduction">
          <BitcoinIntroduction />
        </section>
        <section id="dca-introduction">
          <DCAintro />
        </section>
        <section id="forum">
          <UserForum messages={forumMessages} />
        </section>
      </div>
    </div>
  );
};

export default App;
