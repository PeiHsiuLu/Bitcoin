// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";  // 引入 Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDgmFEO7pq2v2GjIAm8NLHnT9I9HTYXtN4",
  authDomain: "bitcoinweb-fe090.firebaseapp.com",
  databaseURL: "https://bitcoinweb-fe090-default-rtdb.firebaseio.com",
  projectId: "bitcoinweb-fe090",
  storageBucket: "bitcoinweb-fe090.appspot.com",
  messagingSenderId: "978801507733",
  appId: "1:978801507733:web:a66dcadc0bbb9a68fe8a9c",
  measurementId: "G-QFZNHXDEFB"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化 Realtime Database
const database = getDatabase(app);

export { database };
