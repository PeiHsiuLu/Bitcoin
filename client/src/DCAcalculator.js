import React, { useState } from 'react';
import axios from 'axios';

const DCACalculator = ({ onDateChange, onFrequencyChange }) => {
    const today = new Date().toISOString().slice(0, 10);
    const maxStartDate = '2017-08-20';
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [startDate, setStartDate] = useState(maxStartDate);
    const [endDate, setEndDate] = useState(today);
    const [totalReturnRate, setTotalReturnRate] = useState(null);
    const [netIncome, setNetIncome] = useState(null);
    const [totalInvestment, setTotalInvestment] = useState(null);
    const [finalAmount, setFinalAmount] = useState(null);

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

    const handleFrequencyChange = (e) => {
        const newFrequency = e.target.value;
        setFrequency(newFrequency);
        onFrequencyChange(newFrequency); // 通知父组件
    };

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        if (new Date(newStartDate) >= new Date(maxStartDate)) {
            setStartDate(newStartDate);
            onDateChange(newStartDate, endDate);  // 通知父组件
        } else {
            alert('開始日期不能早於2017-08-20');
        }
    };

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
        onDateChange(startDate, newEndDate);  // 通知父组件
    };

    const calculateInvestmentReturns = async () => {
        if (!investmentAmount) {
            alert('請輸入投入金額');
            return;
        }

        const investmentDates = getInvestmentDates(startDate, endDate, frequency);
        const totalInvested = investmentDates.length * parseFloat(investmentAmount);
        setTotalInvestment(totalInvested);

        const marketData = await fetchKlineData('BTCUSDT', '1d', startDate, endDate);
        if (!marketData || marketData.length === 0) {
            console.error('No market data found for the given range.');
            return;
        }

        let totalValueAtEnd = 0;
        for (const date of investmentDates) {
            const closePrice = getClosePriceForDate(marketData, date);
            if (closePrice) {
                totalValueAtEnd += investmentAmount / closePrice;
            } else {
                console.error(`No market data for date: ${date}`);
            }
        }

        const finalMarketData = await fetchKlineData('BTCUSDT', '1d', endDate, endDate);
        if (finalMarketData && finalMarketData.length > 0) {
            const finalClosePrice = parseFloat(finalMarketData[0][4]);
            const finalTotalValue = totalValueAtEnd * finalClosePrice;
            setFinalAmount(finalTotalValue);

            const returnRate = ((finalTotalValue - totalInvested) / totalInvested) * 100;
            setTotalReturnRate(returnRate.toFixed(2));

            const netEarnings = finalTotalValue - totalInvested;
            setNetIncome(netEarnings.toFixed(2));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateInvestmentReturns();
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
                    <div className="form-group">
                        <label htmlFor="investmentAmount">投入金額(台幣)</label>
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
                    <button type="submit" className="output">輸出結果</button>
                    <p>總投資: {totalInvestment ? `${totalInvestment} 台幣` : '---'}</p>
                    <p>最終金額: {finalAmount ? `${finalAmount.toFixed(2)} 台幣` : '---'}</p>
                    <p>淨收入: {netIncome ? `${netIncome} 台幣` : '---'}</p>
                    <p>總報酬率: {totalReturnRate ? `${totalReturnRate}%` : '---'}</p>
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
