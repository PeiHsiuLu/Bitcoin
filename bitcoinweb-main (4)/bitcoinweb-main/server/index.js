const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// 啟用靜態檔案服務

// 啟用CORS
app.use(cors());

const PORT = process.env.PORT || 3001;
const API_BASE_URL = 'https://www.okx.com/api/v5';

// 獲取最新比特幣行情數據的路由
app.get('/api/bitcoin-price', async (req, res) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/market/ticker`, {
      params: { instId: 'BTC-USD-SWAP' }
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    res.status(500).json({ message: 'Error fetching Bitcoin data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
