import React from 'react';
import { W3mButton } from '@web3modal/wagmi-react-native';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useFeeData,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useSignMessage,
  useWaitForTransaction,
} from 'wagmi';
import { parseEther } from 'viem';
import { polygonMumbai } from 'wagmi/chains';

export default function HomePage() {
  const { chain } = useNetwork();
  const { data: blockNumber } = useBlockNumber();
  const { data: feeData } = useFeeData({
    chainId: chain?.id,
    formatUnits: 'ether',
  });
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    chainId: chain?.id,
    formatUnits: 'ether',
  });
  const { data: signedHash, signMessage } = useSignMessage({
    message: 'Sign this message to prove you are the owner of this wallet',
  });

  // Send test MATIC on Polygon Mumbai testnet
  const { config } = usePrepareSendTransaction({
    chainId: polygonMumbai.id,
    to: 'RECEIVER ADDRESS HERE',
    value: parseEther('0.001'),
  });
  const { data: txData, sendTransaction } = useSendTransaction(config);

  useWaitForTransaction({
    chainId: polygonMumbai.id,
    hash: txData?.hash,
    onSuccess() {
      Alert.alert('Transaction succeeded!', '0.001 MATIC sent successfully');
    },
  });

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

          {signedHash && (
            <View style={styles.block}>
              <Text>Signature hash: {signedHash}</Text>
            </View>
          )}

          <View style={styles.block}>
            <Button title="Sign message" onPress={() => signMessage()} />
          </View>

          <View style={styles.block}>
            <Button
              title="Send 0.001 MATIC"
              disabled={chain.id !== polygonMumbai.id}
              onPress={() => sendTransaction()}
            />
          </View>
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
