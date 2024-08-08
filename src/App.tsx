"use client";

import React, { useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import logo from './assets/logo_juro.png';
import './App.css';

// Header Component with TonConnectButton
const Header = () => (
  <header>
    <TonConnectButton />
  </header>
);

const formatAddress = (address) => {
  if (address.length <= 6) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Display connected wallet details
const Wallet = () => {
  const wallet = useTonWallet();
  return (
    wallet && (
      <div>
        <p>Connected wallet: {formatAddress(wallet.account.address)}</p>
        <p>Device: {wallet.device.appName}</p>
      </div>
    )
  );
};

const SendTransactionButton = ({ amount }) => {
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
      <button className="send-button" onClick={() => tonConnectUI.sendTransaction(transaction)}>
        Send
      </button>
    )
  );
};

const App = () => {
  const [amount, setAmount] = useState(0.01);

  return (
    <div id="root" className="center-content">
      <div>
        <img src={logo} className="logo" alt="TWA logo" />
      </div>
      <Header />
      <div className="avatar-container">
        <div className="avatar">
          <img src="https://via.placeholder.com/150" alt="Avatar" />
        </div>
        <p>@Pablo_Kagathos: blockchain developer</p>
      </div>
      <Wallet />
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
  );
};

export default App;
