import { useState } from 'react';
import twaLogo from './assets/tapps.png';
import './App.css';

import WebApp from '@twa-dev/sdk';
import { TonConnectButton, useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

// Header Component with TonConnectButton
const Header = () => (
  <header>
    <TonConnectButton />
  </header>
);

// Display connected user's address
const Address = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  return (
    userFriendlyAddress && (
      <div>
        <p>User-friendly address: {userFriendlyAddress}</p>
        <p>Raw address: {rawAddress}</p>
      </div>
    )
  );
};

// Display connected wallet details
const Wallet = () => {
  const wallet = useTonWallet();

  return (
    wallet && (
      <div>
        <p>Connected wallet: {wallet.account.address}</p>
        <p>Device: {wallet.device.appName}</p>
      </div>
    )
  );
};

// Hardcoded transaction details
const transaction = {
  validUntil: 0, // Set a valid expiration timestamp if needed
  messages: [
    {
      address: "0:ea1ca25df01eec5a31bc996d80c7d4a274344eea6b73827844d97266603c9425", // Destination address
      amount: "10000000" // Amount in nanotons
    }
  ]
};

// Button to send transaction using TonConnect
const SendTransactionButton = () => {
  const [tonConnectUI] = useTonConnectUI();

  return (
    <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
      Pay
    </button>
  );
};

// Main App component
function App() {
  return (
    <>
      <div>
        <a href="https://ton.org/dev" target="_blank" rel="noopener noreferrer">
          <img src={twaLogo} className="logo" alt="TWA logo" />
        </a>
      </div>
      <Header />
      <Address />
      <Wallet />
      <div className="card">
        <SendTransactionButton />
      </div>
      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World!`)}>
          Show Alert
        </button>
      </div>
    </>
  );
}

export default App;
