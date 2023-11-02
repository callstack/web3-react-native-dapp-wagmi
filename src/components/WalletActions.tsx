import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { polygonMumbai } from 'wagmi/chains';
import React from 'react';
import {
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useSignMessage,
  useWaitForTransaction,
} from 'wagmi';
import { parseEther } from 'viem';

export default function WalletActions() {
  const { chain } = useNetwork();

  // Ask the wallet to sign a message
  const { data: signedHash, signMessage } = useSignMessage({
    message: 'Sign this message to prove you are the owner of this wallet',
  });

  // Ask the wallet to send test MATIC on Polygon Mumbai testnet
  const { config } = usePrepareSendTransaction({
    chainId: polygonMumbai.id,
    // Replace `to` with another address to receive the tokens
    to: '0x9247Ab385Bee424db5B09B696864867a53A77f1A',
    value: parseEther('0.001'),
  });
  const { data: txData, sendTransaction } = useSendTransaction(config);

  // Watch for transaction completion and show a success alert when done
  useWaitForTransaction({
    chainId: polygonMumbai.id,
    hash: txData?.hash,
    onSuccess() {
      Alert.alert('Transaction succeeded!', '0.001 MATIC sent successfully');
    },
  });

  return (
    <>
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
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 32,
  },
});
