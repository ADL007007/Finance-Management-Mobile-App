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
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PRIMARY_GREEN = '#00D09E';
const DARK_TEXT = '#093030';
const SOFT_MINT_BG = '#F1FFF3';
const INPUT_BG = '#DFF7E2';
const MUTED_TEXT = '#6B8F85';

export function NewPasswordScreen() {
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleChangePassword = () => {
    if (!password.trim() || !confirmPassword.trim()) {
      setErrorText('Введите и подтвердите новый пароль');
      return;
    }
    if (password !== confirmPassword) {
      setErrorText('Пароли не совпадают');
      return;
    }
    setErrorText(null);
    router.push('/password-changed');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.topHeaderBackground}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <Text style={styles.headerTitle}>New Password</Text>
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
            <View style={styles.formBlock}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errorText) setErrorText(null);
                    }}
                    placeholder="Enter new password"
                    placeholderTextColor={MUTED_TEXT}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsPasswordVisible((prev) => !prev)}
                    style={styles.eyeButton}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={DARK_TEXT}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Confirm New Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (errorText) setErrorText(null);
                    }}
                    placeholder="Confirm new password"
                    placeholderTextColor={MUTED_TEXT}
                    secureTextEntry={!isConfirmVisible}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsConfirmVisible((prev) => !prev)}
                    style={styles.eyeButton}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={isConfirmVisible ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={DARK_TEXT}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
            </View>

            <SafeAreaView edges={['bottom']} style={styles.bottomActionArea}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleChangePassword}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Change Password</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default NewPasswordScreen;

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
    paddingTop: 52,
    paddingBottom: 24,
  },
  formBlock: {
    gap: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: DARK_TEXT,
    paddingVertical: 0,
    marginRight: 10,
  },
  eyeButton: {
    alignItems: 'center',
    justifyContent: 'center',
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
  submitButton: {
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
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_TEXT,
  },
});