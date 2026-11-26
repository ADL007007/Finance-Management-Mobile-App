import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { EndSessionModal } from '../components/EndSessionModal';
import { useProfile } from '../context/ProfileContext';

type ProfileMenuKey =
  | 'edit-profile'
  | 'security'
  | 'setting'
  | 'help'
  | 'logout';

interface ProfileMenuItem {
  key: ProfileMenuKey;
  label: string;
  icon:
    | React.ReactElement<typeof Ionicons>
    | React.ReactElement<typeof MaterialCommunityIcons>;
}

const MENU_ITEMS: ProfileMenuItem[] = [
  {
    key: 'edit-profile',
    label: 'Edit Profile',
    icon: <Ionicons name="person-outline" size={22} color="#FFFFFF" />,
  },
  {
    key: 'security',
    label: 'Security',
    icon: (
      <MaterialCommunityIcons
        name="shield-check-outline"
        size={22}
        color="#FFFFFF"
      />
    ),
  },
  {
    key: 'setting',
    label: 'Setting',
    icon: <Ionicons name="settings-outline" size={22} color="#FFFFFF" />,
  },
  {
    key: 'help',
    label: 'Help',
    icon: <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />,
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />,
  },
];

export function ProfileScreen() {
  const { profile } = useProfile();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleMenuPress = (key: ProfileMenuKey) => {
    switch (key) {
      case 'edit-profile':
        router.push('/edit-profile');
        break;
      case 'security':
        router.push('/security');
        break;
      case 'setting':
        router.push('/settings');
        break;
      case 'help':
        router.push('/help');
        break;
      case 'logout':
        setLogoutModalVisible(true);
        break;
    }
  };

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    router.replace('/login');
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

          <Text style={styles.headerTitle}>Profile</Text>

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
        <View style={styles.avatarOverlapWrap}>
          <View style={styles.avatarRing}>
            <Image
              source={{ uri: profile.avatarUri }}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.userId}>ID: {profile.userId}</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.menuScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.menuList}>
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => handleMenuPress(item.key)}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.rowPressed,
                ]}
              >
                <View style={styles.menuIconCircle}>{item.icon}</View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
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
              onPress={() => {}}
              style={[styles.navItem, styles.navItemActive]}
              accessibilityLabel="Profile"
            >
              <Ionicons name="person-outline" size={22} color="#093030" />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      <EndSessionModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleConfirmLogout}
      />
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
    paddingBottom: 56,
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
  avatarOverlapWrap: {
    alignItems: 'center',
    marginTop: -46,
    marginBottom: 18,
  },
  avatarRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFFFFF',
    padding: 3,
    marginBottom: 10,
    shadowColor: '#093030',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
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
  menuScrollContent: {
    paddingHorizontal: 26,
    paddingTop: 6,
    paddingBottom: 115,
  },
  menuList: {
    gap: 18,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    fontSize: 15,
    fontWeight: '600',
    color: '#093030',
  },
  rowPressed: {
    opacity: 0.82,
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