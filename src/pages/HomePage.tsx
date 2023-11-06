import React from 'react';
import { W3mButton } from '@web3modal/wagmi-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useAccount, useBalance, useBlockNumber, useFeeData } from 'wagmi';
import WalletActions from '../components/WalletActions';

export default function HomePage() {
  const { data: blockNumber } = useBlockNumber();
  const { data: feeData } = useFeeData({ formatUnits: 'ether' });
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address, formatUnits: 'ether' });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <W3mButton />
      </View>

      <View style={styles.block}>
        <Text>Block number: {String(blockNumber ?? 0)}</Text>
        <Text>Gas price: {feeData?.formatted.gasPrice ?? 0} ETH</Text>
      </View>

      {isConnected && (
        <>
          <View style={styles.block}>
            <Text numberOfLines={1}>Address: {address}</Text>
            <Text>
              Balance: {balance?.formatted} {balance?.symbol}
            </Text>
          </View>

          <WalletActions />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  block: {
    marginTop: 32,
  },
});
