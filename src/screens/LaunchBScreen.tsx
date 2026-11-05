import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const LaunchBScreen: React.FC = () => {
  const router = useRouter();

  const handleLoginPress = () => {
    router.push('/login');
  };

  const handleSignUpPress = () => {
    router.push('/signup');
  };

  const handleForgotPasswordPress = () => {
    router.push('/forgot-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <MaterialCommunityIcons name="finance" size={82} color="#00D09E" />
          <Text style={styles.title}>FinWise</Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleLoginPress}
          >
            <Text style={styles.primaryButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={handleSignUpPress}
          >
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotButton}
            activeOpacity={0.7}
            onPress={handleForgotPasswordPress}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FFF3',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  title: {
    marginTop: 10,
    fontSize: 36,
    fontWeight: '800',
    color: '#052224',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 13,
    lineHeight: 18,
    color: '#7C828A',
    textAlign: 'center',
    maxWidth: 240,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#00D09E',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#DFF7E2',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#052224',
  },
  forgotButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#052224',
  },
});