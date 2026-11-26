import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

type SettingsViewMode =
  | 'menu'
  | 'notifications'
  | 'password'
  | 'password-success'
  | 'delete-account';

export function SettingsScreen() {
  const [mode, setMode] = useState<SettingsViewMode>('menu');

  const [generalNotification, setGeneralNotification] = useState(true);
  const [sound, setSound] = useState(true);
  const [soundCall, setSoundCall] = useState(false);
  const [vibrate, setVibrate] = useState(true);
  const [transactionUpdate, setTransactionUpdate] = useState(false);
  const [expenseReminder, setExpenseReminder] = useState(false);
  const [budgetNotifications, setBudgetNotifications] = useState(true);
  const [lowBalanceAlerts, setLowBalanceAlerts] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [deletePassword, setDeletePassword] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
    if (mode !== 'password-success') return;
    const timer = setTimeout(() => {
      setMode('menu');
    }, 1500);
    return () => clearTimeout(timer);
  }, [mode]);

  const handleBack = () => {
    if (mode === 'notifications' || mode === 'password' || mode === 'delete-account') {
      setMode('menu');
      return;
    }
    if (mode === 'password-success') {
      setMode('menu');
      return;
    }
    router.back();
  };

  const handleOpenPassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setMode('password');
  };

  const handleChangePassword = () => {
    if (newPassword.trim().length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }
    setPasswordError('');
    setMode('password-success');
  };

  const handleOpenDeleteAccount = () => {
    setDeletePassword('');
    setConfirmModalVisible(false);
    setMode('delete-account');
  };

  const handleConfirmDeleteAccount = () => {
    setConfirmModalVisible(false);
    router.replace('/login');
  };

  const headerTitle =
    mode === 'notifications'
      ? 'Notification Settings'
      : mode === 'password'
      ? 'Password Settings'
      : mode === 'delete-account'
      ? 'Delete Account'
      : 'Settings';

  if (mode === 'password-success') {
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
          <Text style={styles.splashTitle}>
            {'Password Has Been\nChanged Successfully'}
          </Text>
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
            <View style={styles.menuStack}>
              <Pressable
                onPress={() => setMode('notifications')}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.menuIconCircle}>
                  <Ionicons
                    name="notifications-outline"
                    size={22}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.menuLabel}>Notification Settings</Text>
                <Ionicons name="chevron-forward" size={20} color="#093030" />
              </Pressable>

              <View style={styles.hairline} />

              <Pressable
                onPress={handleOpenPassword}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.menuIconCircle}>
                  <Ionicons name="key-outline" size={22} color="#FFFFFF" />
                </View>
                <Text style={styles.menuLabel}>Password Settings</Text>
                <Ionicons name="chevron-forward" size={20} color="#093030" />
              </Pressable>

              <View style={styles.hairline} />

              <Pressable
                onPress={handleOpenDeleteAccount}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.menuIconCircle}>
                  <Ionicons name="person-outline" size={22} color="#FFFFFF" />
                </View>
                <Text style={styles.menuLabel}>Delete Account</Text>
                <Ionicons name="chevron-forward" size={20} color="#093030" />
              </Pressable>

              <View style={styles.hairline} />
            </View>
          </ScrollView>
        )}

        {mode === 'notifications' && (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.switchList}>
              {[
                {
                  key: 'general',
                  label: 'General Notification',
                  value: generalNotification,
                  onChange: setGeneralNotification,
                },
                {
                  key: 'sound',
                  label: 'Sound',
                  value: sound,
                  onChange: setSound,
                },
                {
                  key: 'sound-call',
                  label: 'Sound Call',
                  value: soundCall,
                  onChange: setSoundCall,
                },
                {
                  key: 'vibrate',
                  label: 'Vibrate',
                  value: vibrate,
                  onChange: setVibrate,
                },
                {
                  key: 'tx-update',
                  label: 'Transaction Update',
                  value: transactionUpdate,
                  onChange: setTransactionUpdate,
                },
                {
                  key: 'expense-reminder',
                  label: 'Expense Reminder',
                  value: expenseReminder,
                  onChange: setExpenseReminder,
                },
                {
                  key: 'budget-notif',
                  label: 'Budget Notifications',
                  value: budgetNotifications,
                  onChange: setBudgetNotifications,
                },
                {
                  key: 'low-balance',
                  label: 'Low Balance Alerts',
                  value: lowBalanceAlerts,
                  onChange: setLowBalanceAlerts,
                },
              ].map((item) => (
                <View key={item.key}>
                  <View style={styles.switchItemRow}>
                    <Text style={styles.switchItemLabel}>{item.label}</Text>
                    <Switch
                      value={item.value}
                      onValueChange={item.onChange}
                      trackColor={{ false: '#C8E6DA', true: '#0068FF' }}
                      thumbColor="#FFFFFF"
                    />
                  </View>
                  <View style={styles.hairline} />
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {mode === 'password' && (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Current Password</Text>
              <View style={styles.passwordInputWrap}>
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="• • • • • • • •"
                  placeholderTextColor="#5C7D73"
                  secureTextEntry
                  style={styles.passwordInputFlex}
                />
                <Ionicons name="eye-off-outline" size={18} color="#4B635E" />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>New Password</Text>
              <View style={styles.passwordInputWrap}>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="• • • • • • • •"
                  placeholderTextColor="#5C7D73"
                  secureTextEntry
                  style={styles.passwordInputFlex}
                />
                <Ionicons name="eye-off-outline" size={18} color="#4B635E" />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Confirm New Password</Text>
              <View style={styles.passwordInputWrap}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="• • • • • • • •"
                  placeholderTextColor="#5C7D73"
                  secureTextEntry
                  style={styles.passwordInputFlex}
                />
                <Ionicons name="eye-off-outline" size={18} color="#4B635E" />
              </View>
            </View>

            {!!passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}

            <Pressable
              onPress={handleChangePassword}
              style={({ pressed }) => [
                styles.primaryPillButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryPillButtonText}>Change Password</Text>
            </Pressable>
          </ScrollView>
        )}

        {mode === 'delete-account' && (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.deleteHeading}>
              Are You Sure You Want To Delete Your Account?
            </Text>

            <View style={styles.warningCard}>
              <Text style={styles.warningText}>
                This action will permanently delete all of your account data
                and history. You will not be able to recover this information
                once the account is deleted.
              </Text>
              <Text style={styles.warningBullet}>
                • All your transactions, budgets, and savings goals will be
                removed.
              </Text>
              <Text style={styles.warningBullet}>
                • Active reminders and connected preferences will be cleared.
              </Text>
              <Text style={styles.warningTextLast}>
                This action cannot be undone.
              </Text>
            </View>

            <Text style={styles.confirmPassTitle}>
              Please Enter Your Password To Confirm Deletion Of Your Account.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.passwordInputWrap}>
                <TextInput
                  value={deletePassword}
                  onChangeText={setDeletePassword}
                  placeholder="• • • • • • • •"
                  placeholderTextColor="#5C7D73"
                  secureTextEntry
                  style={styles.passwordInputFlex}
                />
                <Ionicons name="eye-off-outline" size={18} color="#4B635E" />
              </View>
            </View>

            <Pressable
              onPress={() => setConfirmModalVisible(true)}
              style={({ pressed }) => [
                styles.primaryPillButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryPillButtonText}>
                Yes, Delete Account
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setMode('menu')}
              style={({ pressed }) => [
                styles.secondaryPillButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.secondaryPillButtonText}>Cancel</Text>
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

      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalQuestion}>
              Are You Sure You Want To Delete Your Account?
            </Text>
            <Text style={styles.modalSubtext}>
              By deleting your account, you agree that you understand the
              consequences of this action and that you agree to permanently
              delete your account and all associated data.
            </Text>

            <Pressable
              onPress={handleConfirmDeleteAccount}
              style={({ pressed }) => [
                styles.modalPrimaryBtn,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.modalPrimaryBtnText}>Yes, Delete Account</Text>
            </Pressable>

            <Pressable
              onPress={() => setConfirmModalVisible(false)}
              style={({ pressed }) => [
                styles.modalSecondaryBtn,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.modalSecondaryBtnText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    paddingTop: 26,
    paddingBottom: 115,
  },
  menuStack: {
    gap: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  menuIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#093030',
  },
  hairline: {
    height: 1,
    backgroundColor: '#D6EFE3',
  },
  switchList: {
    gap: 2,
  },
  switchItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  switchItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#093030',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 8,
  },
  passwordInputWrap: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DFF5EC',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInputFlex: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#093030',
    paddingVertical: 0,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D93025',
    textAlign: 'center',
    marginBottom: 8,
  },
  primaryPillButton: {
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 36,
  },
  primaryPillButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  secondaryPillButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#DFF5EC',
    borderRadius: 22,
    paddingVertical: 11,
    paddingHorizontal: 42,
  },
  secondaryPillButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#093030',
  },
  deleteHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
    textAlign: 'center',
    marginBottom: 12,
  },
  warningCard: {
    backgroundColor: '#DFF5EC',
    borderRadius: 18,
    padding: 14,
    gap: 8,
    marginBottom: 14,
  },
  warningText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#093030',
  },
  warningBullet: {
    fontSize: 12,
    lineHeight: 17,
    color: '#093030',
  },
  warningTextLast: {
    fontSize: 12,
    lineHeight: 17,
    color: '#093030',
  },
  confirmPassTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#093030',
    textAlign: 'center',
    marginBottom: 12,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(14, 62, 62, 0.58)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 8,
  },
  modalQuestion: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#093030',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtext: {
    fontSize: 11.5,
    lineHeight: 16,
    color: '#4B635E',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalPrimaryBtn: {
    width: '78%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalPrimaryBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#093030',
  },
  modalSecondaryBtn: {
    width: '78%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DFF5EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSecondaryBtnText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#093030',
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