import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PasswordSuccessScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.successIconContainer}>
            <View style={styles.innerCircle}>
              <Ionicons name="checkmark" size={40} color="#00D09E" />
            </View>
          </View>
          <Text style={styles.successTitle}>Password Has Been</Text>
          <Text style={styles.successTitle}>Changed Successfully</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.primaryButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#00D09E' },
  container: { flex: 1, backgroundColor: '#00D09E', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 40, alignItems: 'center' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  successIconContainer: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  innerCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  successTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  primaryButton: { width: '100%', height: 48, backgroundColor: '#FFFFFF', borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  primaryButtonText: { color: '#00D09E', fontSize: 16, fontWeight: 'bold' },
});