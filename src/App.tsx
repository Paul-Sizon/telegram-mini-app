import logo from './assets/logo_juro.png';
import './App.css';
import { TonConnectButton, useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

// Header Component with TonConnectButton
const Header = () => (
  <header>
    <TonConnectButton />
  </header>
);

const formatAddress = (address: string): string => {
    if (address.length <= 6) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Display connected user's address
const Address = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  

  return (
    userFriendlyAddress && (
      <div>
        <p>User-friendly address: {formatAddress(userFriendlyAddress)}</p>
        <p>Raw address: {formatAddress(rawAddress)}</p>
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
        <p>Connected wallet: {formatAddress(wallet.account.address)}</p>
        <p>Device: {wallet.device.appName}</p>
      </div>
    )
  );
};

// Hardcoded transaction details
const transaction = {
  validUntil: 0,
  messages: [
    {
      address: "0:ea1ca25df01eec5a31bc996d80c7d4a274344eea6b73827844d97266603c9425",
      amount: "10000000"
    }
  ]
};

// Button to send transaction using TonConnect
const SendTransactionButton = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  return (
    wallet && (
    <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
      Send 0.01 Ton
    </button>
    )
  );
};

// Main App component
function App() {
  return (
    <div id="root" className="center-content">
      <div>
        <a target="_blank" rel="noopener noreferrer">
          <img src={logo} className="logo" alt="TWA logo" />
        </a>
      </div>
      <Header />
      {/* <Address /> */}
      <Wallet />
      <SendTransactionButton />
      {/* <button onClick={() => WebApp.showAlert(`Hello World!`)}>
        Show Alert
      </button> */}
    </div>
  );
}

export default App;
