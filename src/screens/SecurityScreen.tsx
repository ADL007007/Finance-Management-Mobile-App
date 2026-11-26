import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

type SecurityViewMode =
  | 'menu'
  | 'change-pin'
  | 'pin-success'
  | 'fingerprint-list'
  | 'fingerprint-detail'
  | 'fingerprint-deleted'
  | 'add-fingerprint'
  | 'fingerprint-added'
  | 'terms';

export function SecurityScreen() {
  const [mode, setMode] = useState<SecurityViewMode>('menu');

  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [hasFingerprint, setHasFingerprint] = useState(true);
  const [fingerprintLabel, setFingerprintLabel] = useState('Jhon Fingerprint');

  useEffect(() => {
    if (
      mode !== 'pin-success' &&
      mode !== 'fingerprint-deleted' &&
      mode !== 'fingerprint-added'
    ) {
      return;
    }

    const timer = setTimeout(() => {
      if (mode === 'pin-success') {
        setMode('menu');
      } else if (mode === 'fingerprint-deleted' || mode === 'fingerprint-added') {
        setMode('fingerprint-list');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [mode]);

  const handleBack = () => {
    switch (mode) {
      case 'change-pin':
      case 'fingerprint-list':
      case 'terms':
        setMode('menu');
        break;
      case 'fingerprint-detail':
      case 'add-fingerprint':
        setMode('fingerprint-list');
        break;
      case 'pin-success':
        setMode('menu');
        break;
      case 'fingerprint-deleted':
      case 'fingerprint-added':
        setMode('fingerprint-list');
        break;
      case 'menu':
      default:
        router.back();
        break;
    }
  };

  const handleOpenChangePin = () => {
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setPinError('');
    setMode('change-pin');
  };

  const handleSubmitPin = () => {
    if (newPin.trim().length < 4) {
      setPinError('Enter at least 4 digits for the new PIN.');
      return;
    }
    if (newPin !== confirmPin) {
      setPinError('New PIN and Confirm PIN do not match.');
      return;
    }
    setPinError('');
    setMode('pin-success');
  };

  const handleDeleteFingerprint = () => {
    setHasFingerprint(false);
    setMode('fingerprint-deleted');
  };

  const handleAddFingerprintConfirm = () => {
    setHasFingerprint(true);
    setFingerprintLabel('Jhon Fingerprint');
    setMode('fingerprint-added');
  };

  const isSuccessSplash =
    mode === 'pin-success' ||
    mode === 'fingerprint-deleted' ||
    mode === 'fingerprint-added';

  const successMessage =
    mode === 'pin-success'
      ? 'Pin Has Been\nChanged Successfully'
      : mode === 'fingerprint-deleted'
      ? 'The Fingerprint Has\nBeen Successfully\nDeleted'
      : 'Fingerprint Has Been\nChanged Successfully';

  const headerTitle =
    mode === 'change-pin'
      ? 'Change Pin'
      : mode === 'fingerprint-list'
      ? 'Fingerprint'
      : mode === 'fingerprint-detail'
      ? fingerprintLabel
      : mode === 'add-fingerprint'
      ? 'Add Fingerprint'
      : mode === 'terms'
      ? 'Terms And Conditions'
      : 'Security';

  if (isSuccessSplash) {
    return (
      <SafeAreaView style={styles.splashSafeArea} edges={['top', 'bottom']}>
        <Pressable
          onPress={handleBack}
          style={styles.splashBackButton}
          accessibilityLabel="Back"
        >
          <Ionicons name="arrow-back" size={24} color="#093030" />
        </Pressable>

        <View style={styles.splashCenter}>
          <View style={styles.splashCircleOuter}>
            <View style={styles.splashCircleInner}>
              <Ionicons name="checkmark" size={44} color="#00D09E" />
            </View>
          </View>
          <Text style={styles.splashTitle}>{successMessage}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={handleBack}
            style={styles.iconButton}
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </Pressable>

          <Text style={styles.headerTitle}>{headerTitle}</Text>

          <Pressable
            onPress={() => router.push('/notifications')}
            style={styles.bellButton}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#093030" />
            <View style={styles.bellDot} />
          </Pressable>
        </View>
      </View>

      <View style={styles.contentSheet}>
        {mode === 'menu' && (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Security</Text>

            <View style={styles.listStack}>
              <Pressable
                onPress={handleOpenChangePin}
                style={({ pressed }) => [
                  styles.menuItemRow,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.menuItemText}>Change Pin</Text>
                <Ionicons name="chevron-forward" size={20} color="#093030" />
              </Pressable>

              <View style={styles.hairline} />

              <Pressable
                onPress={() => setMode('fingerprint-list')}
                style={({ pressed }) => [
                  styles.menuItemRow,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.menuItemText}>Fingerprint</Text>
                <Ionicons name="chevron-forward" size={20} color="#093030" />
              </Pressable>

              <View style={styles.hairline} />

              <Pressable
                onPress={() => setMode('terms')}
                style={({ pressed }) => [
                  styles.menuItemRow,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.menuItemText}>Terms And Conditions</Text>
                <Ionicons name="chevron-forward" size={20} color="#093030" />
              </Pressable>

              <View style={styles.hairline} />
            </View>
          </ScrollView>
        )}

        {mode === 'change-pin' && (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Current Pin</Text>
              <TextInput
                value={currentPin}
                onChangeText={setCurrentPin}
                placeholder="• • • • • •"
                placeholderTextColor="#5C7D73"
                secureTextEntry
                keyboardType="number-pad"
                style={styles.pinInput}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>New Pin</Text>
              <TextInput
                value={newPin}
                onChangeText={setNewPin}
                placeholder="• • • • • •"
                placeholderTextColor="#5C7D73"
                secureTextEntry
                keyboardType="number-pad"
                style={styles.pinInput}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Confirm Pin</Text>
              <TextInput
                value={confirmPin}
                onChangeText={setConfirmPin}
                placeholder="• • • • • •"
                placeholderTextColor="#5C7D73"
                secureTextEntry
                keyboardType="number-pad"
                style={styles.pinInput}
              />
            </View>

            {!!pinError && <Text style={styles.errorText}>{pinError}</Text>}

            <Pressable
              onPress={handleSubmitPin}
              style={({ pressed }) => [
                styles.primaryPillButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryPillButtonText}>Change Pin</Text>
            </Pressable>
          </ScrollView>
        )}

        {mode === 'fingerprint-list' && (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.fpListWrap}>
              {hasFingerprint && (
                <Pressable
                  onPress={() => setMode('fingerprint-detail')}
                  style={({ pressed }) => [
                    styles.fpRow,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.fpBlueCircle}>
                    <Ionicons
                      name="finger-print"
                      size={22}
                      color="#FFFFFF"
                    />
                  </View>
                  <Text style={styles.fpRowLabel}>{fingerprintLabel}</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#093030"
                  />
                </Pressable>
              )}

              <Pressable
                onPress={() => setMode('add-fingerprint')}
                style={({ pressed }) => [
                  styles.fpRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.fpBlueCircle}>
                  <Ionicons name="add" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.fpRowLabel}>Add A Fingerprint</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#093030"
                />
              </Pressable>
            </View>
          </ScrollView>
        )}

        {mode === 'fingerprint-detail' && (
          <ScrollView
            contentContainerStyle={styles.centerActionScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.bigScannerBox}>
              <Ionicons name="finger-print" size={76} color="#FFFFFF" />
            </View>

            <View style={styles.nameBadgePill}>
              <Text style={styles.nameBadgeText}>{fingerprintLabel}</Text>
            </View>

            <Pressable
              onPress={handleDeleteFingerprint}
              style={({ pressed }) => [
                styles.deletePillButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.deletePillButtonText}>Delete</Text>
            </Pressable>
          </ScrollView>
        )}

        {mode === 'add-fingerprint' && (
          <ScrollView
            contentContainerStyle={styles.centerActionScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.bigScannerBox}>
              <Ionicons name="finger-print" size={76} color="#FFFFFF" />
            </View>

            <Text style={styles.touchTitle}>Use Fingerprint To Access</Text>

            <Text style={styles.touchSubtitle}>
              Place your finger on the sensor to register your fingerprint for
              faster and more secure sign-in.
            </Text>

            <Pressable
              onPress={handleAddFingerprintConfirm}
              style={({ pressed }) => [
                styles.touchIdPillButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.touchIdPillButtonText}>Use Touch Id</Text>
            </Pressable>
          </ScrollView>
        )}

        {mode === 'terms' && (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.termsHeading}>
              Est Fugiat Assumenda Aut Reprehenderit
            </Text>
            <Text style={styles.termsParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              purus a odio finibus bibendum in sit amet leo. Mauris feugiat erat
              tellus. Far far away, behind the word mountains, far from the
              countries Vokalia and Consonantia, there live the blind texts.
            </Text>
            <Text style={styles.termsParagraph}>
              1. Accumsan massa quam et et. Semper senectus nulla suspendisse
              integer amet at.
            </Text>
            <Text style={styles.termsParagraph}>
              2. Sodales aenean massa, gravida non, sollicitudin eu, malesuada
              vitae, massa.
            </Text>
            <Text style={styles.termsParagraph}>
              3. Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum.
            </Text>
            <Text style={styles.termsSubLink}>
              Read the terms and conditions in more detail at
            </Text>
            <Text style={styles.termsUrl}>www.finwiseapp.com</Text>

            <Pressable
              onPress={() => setMode('menu')}
              style={({ pressed }) => [
                styles.primaryPillButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryPillButtonText}>Accept</Text>
            </Pressable>
          </ScrollView>
        )}

        <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
          <View style={styles.bottomNavBar}>
            <Pressable
              onPress={() => router.push('/home')}
              style={styles.navItem}
              accessibilityLabel="Home"
            >
              <Ionicons name="home-outline" size={22} color="#093030" />
            </Pressable>

            <Pressable
              onPress={() => router.push('/analysis')}
              style={styles.navItem}
              accessibilityLabel="Analysis"
            >
              <Ionicons name="stats-chart-outline" size={20} color="#093030" />
            </Pressable>

            <Pressable
              onPress={() => router.push('/transactions')}
              style={styles.navItem}
              accessibilityLabel="Transactions"
            >
              <MaterialCommunityIcons
                name="swap-horizontal"
                size={24}
                color="#093030"
              />
            </Pressable>

            <Pressable
              onPress={() => router.push('/categories')}
              style={styles.navItem}
              accessibilityLabel="Categories"
            >
              <Ionicons name="layers-outline" size={22} color="#093030" />
            </Pressable>

            <Pressable
              onPress={() => router.push('/profile')}
              style={[styles.navItem, styles.navItemActive]}
              accessibilityLabel="Profile"
            >
              <Ionicons name="person-outline" size={22} color="#093030" />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  headerSection: {
    backgroundColor: '#00D09E',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#093030',
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1FFF9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF4D4F',
  },
  contentSheet: {
    flex: 1,
    backgroundColor: '#F1FFF3',
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 115,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 14,
  },
  listStack: {
    gap: 4,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#093030',
  },
  hairline: {
    height: 1,
    backgroundColor: '#D6EFE3',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 8,
  },
  pinInput: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DFF5EC',
    paddingHorizontal: 18,
    fontSize: 15,
    fontWeight: '600',
    color: '#093030',
    letterSpacing: 3,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D93025',
    marginBottom: 10,
    textAlign: 'center',
  },
  primaryPillButton: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 42,
  },
  primaryPillButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  fpListWrap: {
    gap: 18,
    paddingTop: 8,
  },
  fpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 4,
  },
  fpBlueCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fpRowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#093030',
  },
  centerActionScroll: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 115,
  },
  bigScannerBox: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  nameBadgePill: {
    backgroundColor: '#DFF5EC',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginBottom: 28,
  },
  nameBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  deletePillButton: {
    backgroundColor: '#00D09E',
    borderRadius: 22,
    paddingVertical: 11,
    paddingHorizontal: 38,
  },
  deletePillButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  touchTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 10,
    textAlign: 'center',
  },
  touchSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#4B635E',
    textAlign: 'center',
    marginBottom: 24,
  },
  touchIdPillButton: {
    backgroundColor: '#DFF5EC',
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 34,
  },
  touchIdPillButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  termsHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 10,
  },
  termsParagraph: {
    fontSize: 12.5,
    lineHeight: 19,
    color: '#2B423D',
    marginBottom: 10,
  },
  termsSubLink: {
    fontSize: 12,
    color: '#4B635E',
    marginTop: 4,
  },
  termsUrl: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0068FF',
    marginTop: 2,
  },
  splashSafeArea: {
    flex: 1,
    backgroundColor: '#00D09E',
    paddingHorizontal: 24,
  },
  splashBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  splashCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },
  splashCircleOuter: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 3,
    borderColor: '#093030',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  splashCircleInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#093030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#093030',
    textAlign: 'center',
    lineHeight: 25,
  },
  pressed: {
    opacity: 0.85,
  },
  bottomNavWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E6F7F0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  navItem: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: '#00D09E',
  },
});