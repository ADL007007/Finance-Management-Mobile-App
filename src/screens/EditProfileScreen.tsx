import React, { useState } from 'react';
import {
  Image,
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

export function EditProfileScreen() {
  const [username, setUsername] = useState('John Smith');
  const [phone, setPhone] = useState('+44 555 5555 55');
  const [email, setEmail] = useState('example@example.com');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleUpdateProfile = () => {
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
    }, 1800);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
          <View style={styles.avatarBlock}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
                }}
                style={styles.avatarImage}
              />
              <Pressable
                onPress={() => {}}
                style={styles.cameraBadge}
                accessibilityLabel="Change profile photo"
              >
                <Ionicons name="camera-outline" size={15} color="#093030" />
              </Pressable>
            </View>

            <Text style={styles.userName}>{username.trim() || 'John Smith'}</Text>
            <Text style={styles.userId}>ID: 25030024</Text>
          </View>

          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor="#7A9C92"
              style={styles.inputPill}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              placeholderTextColor="#7A9C92"
              keyboardType="phone-pad"
              style={styles.inputPill}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              placeholderTextColor="#7A9C92"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.inputPill}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#C8E6DA', true: '#0068FF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Turn Dark Theme</Text>
            <Switch
              value={darkTheme}
              onValueChange={setDarkTheme}
              trackColor={{ false: '#C8E6DA', true: '#0068FF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Pressable
            onPress={handleUpdateProfile}
            style={({ pressed }) => [
              styles.updateButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.updateButtonText}>
              {savedNotice ? 'Profile Updated' : 'Update Profile'}
            </Text>
          </Pressable>
        </ScrollView>

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
    paddingBottom: 54,
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
    paddingBottom: 115,
  },
  avatarBlock: {
    alignItems: 'center',
    marginTop: -44,
    marginBottom: 16,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00D09E',
    borderWidth: 2,
    borderColor: '#F1FFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 2,
  },
  userId: {
    fontSize: 11,
    fontWeight: '500',
    color: '#5C736D',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 14,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 6,
  },
  inputPill: {
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DFF5EC',
    paddingHorizontal: 18,
    fontSize: 14,
    fontWeight: '500',
    color: '#093030',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#093030',
  },
  updateButton: {
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 38,
  },
  updateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  buttonPressed: {
    opacity: 0.88,
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