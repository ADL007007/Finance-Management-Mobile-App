import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const PRIMARY_GREEN = '#00D09E';
const DARK_TEXT = '#093030';
const SOFT_MINT = '#F1FFF3';

export function PasswordChangedScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/security-fingerprint');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => router.replace('/security-fingerprint')}
      style={styles.root}
    >
      <StatusBar style="dark" />
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.centerContent}>
          <View style={styles.ringBadge}>
            <View style={styles.innerDot} />
          </View>
          <Text style={styles.title}>Password Has Been</Text>
          <Text style={styles.title}>Changed Successfully</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_GREEN,
  },
  safeArea: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  ringBadge: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 5,
    borderColor: SOFT_MINT,
    justifyContent: 'center',
    paddingLeft: 18,
    marginBottom: 24,
  },
  innerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: SOFT_MINT,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_TEXT,
    textAlign: 'center',
    lineHeight: 28,
  },
});