import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const PRIMARY_GREEN = '#00D09E';
const DARK_TEXT = '#093030';
const SOFT_MINT_BG = '#F1FFF3';
const INPUT_BG = '#DFF7E2';
const MUTED_TEXT = '#6B8F85';

export function ForgotPasswordScreen() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleNextStep = () => {
    if (!emailOrPhone.trim()) {
      setErrorText('Введите email или телефон');
      return;
    }
    setErrorText(null);
    router.push('/new-password');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.topHeaderBackground}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <Text style={styles.headerTitle}>Forgot Password</Text>
        </SafeAreaView>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheetContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentBlock}>
              <Text style={styles.heading}>Reset Password?</Text>
              <Text style={styles.description}>
                Enter your email address or phone number to continue recovery.
              </Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Enter Email Address</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={emailOrPhone}
                    onChangeText={(text) => {
                      setEmailOrPhone(text);
                      if (errorText) setErrorText(null);
                    }}
                    placeholder="example@example.com"
                    placeholderTextColor={MUTED_TEXT}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
              </View>

              {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
            </View>

            <SafeAreaView edges={['bottom']} style={styles.bottomActionArea}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleNextStep}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>Next Step</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default ForgotPasswordScreen;

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
  keyboardContainer: {
    flex: 1,
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
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 24,
  },
  contentBlock: {
    gap: 14,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_TEXT,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: '#35544C',
    marginBottom: 10,
  },
  fieldGroup: {
    gap: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: DARK_TEXT,
    marginLeft: 4,
  },
  inputWrapper: {
    height: 48,
    backgroundColor: INPUT_BG,
    borderRadius: 24,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    fontWeight: '500',
    color: DARK_TEXT,
    paddingVertical: 0,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#C62828',
    marginLeft: 6,
  },
  bottomActionArea: {
    marginTop: 48,
    alignItems: 'center',
  },
  nextButton: {
    minWidth: 220,
    height: 48,
    paddingHorizontal: 32,
    borderRadius: 24,
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_TEXT,
  },
});