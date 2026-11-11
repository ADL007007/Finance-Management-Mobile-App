import React, { useState } from 'react';
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
import { router } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Forgot Password</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Reset Password?</Text>
              <Text style={styles.infoSubtitle}>
                Please enter your email address to request a password reset.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="example@example.com"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/new-password')}
            >
              <Text style={styles.primaryButtonText}>Next Step</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Remember password? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.linkText}>Log In</Text>
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
  infoContainer: {
    width: '100%',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#093030',
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#888888',
    lineHeight: 18,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#093030',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#F4F6F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#093030',
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#00D09E',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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