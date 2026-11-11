import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SecurityPinScreen() {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const inputRef = useRef<any>(null);

  const handlePinChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
    const newPin = cleaned.split('');
    while (newPin.length < 6) {
      newPin.push('');
    }
    setPin(newPin);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Security Pin</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.infoTitle}>Enter Security Pin</Text>

            {/* Скрытый инпут для ввода с клавиатуры */}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              maxLength={6}
              value={pin.join('')}
              onChangeText={handlePinChange}
              autoFocus={true}
            />

            {/* Визуальные кружки для пин-кода */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => inputRef.current?.focus()}
              style={styles.pinContainer}
            >
              {pin.map((digit, index) => (
                <View
                  key={index}
                  style={[
                    styles.pinBox,
                    digit !== '' ? styles.pinBoxFilled : null,
                  ]}
                >
                  <Text style={styles.pinText}>{digit ? '•' : ''}</Text>
                </View>
              ))}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/new-password')}
            >
              <Text style={styles.primaryButtonText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                // Логика повторной отправки кода
              }}
            >
              <Text style={styles.secondaryButtonText}>Send Again</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or sign up with</Text>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={20} color="#00D09E" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Ionicons name="logo-google" size={20} color="#00D09E" />
              </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.linkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 24,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#093030',
    marginBottom: 24,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  pinBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#00D09E',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  pinBoxFilled: {
    backgroundColor: '#E8F8F5',
  },
  pinText: {
    fontSize: 22,
    color: '#093030',
    fontWeight: 'bold',
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#00D09E',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#F4F6F6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#093030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 12,
    color: '#888888',
  },
  linkText: {
    fontSize: 12,
    color: '#00D09E',
    fontWeight: 'bold',
  },
});