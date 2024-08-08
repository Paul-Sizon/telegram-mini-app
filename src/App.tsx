"use client";

import { useState } from 'react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
// import logo from './assets/logo_juro.png';
import './App.css';

const SendTransactionButton = ({ amount }: { amount: number }) => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const transaction = {
    validUntil: Math.floor(new Date().getTime() / 1000) + 6000,
    messages: [
      {
        address: "0:ea1ca25df01eec5a31bc996d80c7d4a274344eea6b73827844d97266603c9425",
        amount: (amount * 1e9).toString(), // Convert TON to nanoton
      }
    ]
  };

  return (
    wallet && (
      <button onClick={() => tonConnectUI.sendTransaction(transaction)} className="send-button">
        Send
      </button>
    )
  );
};

const App = () => {
  const [amount, setAmount] = useState(0.01);

  return (
    <div id="root" className="center-content">    
      <div className="content-container">
        <div className="avatar-container">
          <div className="avatar">
            <img src="https://iili.io/da8Ant9.webp" alt="Avatar" />
          </div>
        </div>
        <div className="info-container">
          <p>@Pablo_Kagathos: blockchain developer</p>
        </div>
        <div className="button-group">
          <button onClick={() => setAmount(0.01)} className="btn">0.01 TON</button>
          <button onClick={() => setAmount(0.02)} className="btn">0.02 TON</button>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Custom amount"
            className="input"
          />
        </div>
        <SendTransactionButton amount={amount} />
      </div>
    </div>
  );
};

export default App;
