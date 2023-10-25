import './polyfills';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { WagmiConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, polygonMumbai } from 'wagmi/chains';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from '@web3modal/wagmi-react-native';
import HomePage from './src/pages/HomePage';

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_CLOUD_PROJECT_ID;

const metadata = {
  name: 'Example dApp',
  description: 'Modern Example dApp from Callstack',
  url: 'https://callstack.com/',
  icons: ['https://avatars.githubusercontent.com/u/42239399'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, polygonMumbai, arbitrum];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <StatusBar style="auto" />
      <HomePage />
      <Web3Modal />
    </WagmiConfig>
  );
}
