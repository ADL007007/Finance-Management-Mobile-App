import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
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
import { useProfile } from '../context/ProfileContext';

const PRESET_AVATARS = [
  {
    id: 'a1',
    uri: 'https://api.dicebear.com/9.x/bottts-neutral/png?seed=MintBot',
  },
  {
    id: 'a2',
    uri: 'https://api.dicebear.com/9.x/shapes/png?seed=FinanceMint',
  },
  {
    id: 'a3',
    uri: 'https://api.dicebear.com/9.x/identicon/png?seed=Wallet25',
  },
  {
    id: 'a4',
    uri: 'https://api.dicebear.com/9.x/thumbs/png?seed=CashFlow',
  },
];

export function EditMyProfileScreen() {
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [avatarUri, setAvatarUri] = useState(profile.avatarUri);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  const handleUpdateProfile = () => {
    updateProfile({
      name,
      phone,
      email,
      avatarUri,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => router.back()}
              style={styles.iconButton}
              accessibilityLabel="Back"
            >
              <Ionicons name="arrow-back" size={22} color="#093030" />
            </Pressable>

            <Text style={styles.headerTitle}>Edit My Profile</Text>

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
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.avatarSection}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                <Pressable
                  onPress={() => setAvatarModalVisible(true)}
                  style={styles.cameraBadge}
                  accessibilityLabel="Change photo"
                >
                  <Ionicons name="camera-outline" size={16} color="#FFFFFF" />
                </Pressable>
              </View>

              <Text style={styles.displayName}>
                {name.trim() || profile.name}
              </Text>
              <Text style={styles.userId}>ID: {profile.userId}</Text>
            </View>

            <Text style={styles.sectionHeading}>Account Settings</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter username"
                placeholderTextColor="#6E8A82"
                style={styles.input}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+44 555 5555 55"
                placeholderTextColor="#6E8A82"
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@example.com"
                placeholderTextColor="#6E8A82"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Push Notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#CBD5D1', true: '#3299FF' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Turn Dark Theme</Text>
              <Switch
                value={darkTheme}
                onValueChange={setDarkTheme}
                trackColor={{ false: '#CBD5D1', true: '#3299FF' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <Pressable
              onPress={handleUpdateProfile}
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.saveButtonPressed,
              ]}
            >
              <Text style={styles.saveButtonText}>Update Profile</Text>
            </Pressable>
          </ScrollView>

          <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
            <View style={styles.bottomNavBar}>
              <Pressable
                onPress={() => router.replace('/home')}
                style={styles.navItem}
                accessibilityLabel="Home"
              >
                <Ionicons name="home-outline" size={22} color="#093030" />
              </Pressable>

              <Pressable
                onPress={() => router.replace('/analysis')}
                style={styles.navItem}
                accessibilityLabel="Analysis"
              >
                <Ionicons name="stats-chart-outline" size={20} color="#093030" />
              </Pressable>

              <Pressable
                onPress={() => router.replace('/transactions')}
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
                onPress={() => router.replace('/categories')}
                style={styles.navItem}
                accessibilityLabel="Categories"
              >
                <Ionicons name="layers-outline" size={22} color="#093030" />
              </Pressable>

              <Pressable
                onPress={() => router.replace('/profile')}
                style={[styles.navItem, styles.navItemActive]}
                accessibilityLabel="Profile"
              >
                <Ionicons name="person-outline" size={22} color="#093030" />
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={avatarModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAvatarModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Avatar</Text>
            <View style={styles.avatarGrid}>
              {PRESET_AVATARS.map((item) => {
                const selected = item.uri === avatarUri;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      setAvatarUri(item.uri);
                      setAvatarModalVisible(false);
                    }}
                    style={[
                      styles.presetItem,
                      selected && styles.presetItemSelected,
                    ]}
                  >
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.presetImage}
                    />
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={() => setAvatarModalVisible(false)}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
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
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 110,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    position: 'relative',
    marginBottom: 10,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00D09E',
    borderWidth: 2,
    borderColor: '#F1FFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#093030',
  },
  userId: {
    fontSize: 11,
    color: '#5C736D',
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 12,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 6,
  },
  input: {
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DFF7E2',
    paddingHorizontal: 18,
    fontSize: 14,
    color: '#093030',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 6,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#093030',
  },
  saveButton: {
    marginTop: 22,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 36,
  },
  saveButtonPressed: {
    opacity: 0.85,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(9, 48, 48, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#F1FFF3',
    borderRadius: 28,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 16,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 18,
  },
  presetItem: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  presetItemSelected: {
    borderColor: '#00D09E',
  },
  presetImage: {
    width: '100%',
    height: '100%',
    borderRadius: 33,
  },
  modalCloseBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#093030',
  },
});