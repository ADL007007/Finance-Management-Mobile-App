import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PRIMARY_GREEN = '#00D09E';
const DARK_TEXT = '#093030';
const SOFT_MINT_BG = '#F1FFF3';
const PILL_BUTTON_BG = '#DFF7E2';
const SUBTLE_TEXT = '#35544C';

export function SecurityFaceIdScreen() {
  const handleUseFaceId = () => {
    router.replace('/new-password');
  };

  const handlePreferPinCode = () => {
    router.push('/new-password');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.topHeaderBackground}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <Text style={styles.headerTitle}>Security Face ID</Text>
        </SafeAreaView>
      </View>

      <View style={styles.sheetContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centerBlock}>
            <View style={styles.faceIdCircle}>
              <MaterialCommunityIcons
                name="face-recognition"
                size={68}
                color={SOFT_MINT_BG}
              />
            </View>

            <Text style={styles.heading}>Use Face ID To Access</Text>

            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </Text>
          </View>

          <SafeAreaView edges={['bottom']} style={styles.footerBlock}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleUseFaceId}
              style={styles.faceIdButton}
            >
              <Text style={styles.faceIdButtonText}>Use Face ID</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handlePreferPinCode}
              style={styles.pinLinkButton}
            >
              <Text style={styles.pinLinkText}>¿Or prefer use pin code?</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_GREEN,
  },
  topHeaderBackground: {
    backgroundColor: PRIMARY_GREEN,
    paddingBottom: 36,
  },
  headerSafeArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: DARK_TEXT,
    letterSpacing: -0.3,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: SOFT_MINT_BG,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 28,
  },
  centerBlock: {
    alignItems: 'center',
  },
  faceIdCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_TEXT,
    textAlign: 'center',
    marginBottom: 14,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: SUBTLE_TEXT,
    textAlign: 'center',
    maxWidth: 290,
  },
  footerBlock: {
    marginTop: 48,
    alignItems: 'center',
    gap: 14,
  },
  faceIdButton: {
    minWidth: 210,
    height: 44,
    paddingHorizontal: 28,
    borderRadius: 22,
    backgroundColor: PILL_BUTTON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceIdButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: DARK_TEXT,
  },
  pinLinkButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  pinLinkText: {
    fontSize: 13,
    fontWeight: '500',
    color: DARK_TEXT,
    textAlign: 'center',
  },
});