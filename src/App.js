import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Arweave from 'arweave'
import { ArweaveWebWallet } from 'arweave-wallet-connector'

import './App.css';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
})

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

function Home() {
  const [info, setInfo] = useState({})

  const getInfo = async () => {
    setInfo(await arweave.api.get('/').then(res => res.data))
  }

  const connect = async () => {
    const wallet = new ArweaveWebWallet({
      name: 'Connector Example',
      logo: 'https://jfbeats.github.io/ArweaveWalletConnector/placeholder.svg'
    })

    wallet.setUrl('arweave.app')
    await wallet.connect()
  }

  return (
    <div className="App">
      <h1>👋🏻 Welcome</h1>
      <h2>AR React Starter</h2>
      <div>
        <p>Connect to Arweave Wallet</p>
        <button onClick={getInfo}>Arweave Info</button>
        <button onClick={connect}>Connect!</button>
      </div>
      <hr />
      <div>{JSON.stringify(info)}</div>
    </div>
  )
}