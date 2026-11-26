import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PRIMARY_GREEN = '#00D09E';
const DARK_TEXT = '#093030';
const INPUT_PILL_BG = '#DFF7E2';

export type BottomNavTab =
  | 'home'
  | 'analysis'
  | 'transactions'
  | 'categories'
  | 'profile';

export interface BottomNavigationProps {
  activeTab: BottomNavTab;
}

interface NavItemConfig {
  key: BottomNavTab;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { key: 'home', icon: 'home-outline', route: '/home' },
  { key: 'analysis', icon: 'stats-chart-outline', route: '/analysis' },
  { key: 'transactions', icon: 'swap-horizontal-outline', route: '/transactions' },
  { key: 'categories', icon: 'layers-outline', route: '/categories' },
  { key: 'profile', icon: 'person-outline', route: '/profile' },
];

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const handlePress = (item: NavItemConfig) => {
    if (item.key === activeTab) {
      return;
    }
    router.replace(item.route as never);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.wrapper}>
      <View style={styles.bar}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeTab;
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.8}
              onPress={() => handlePress(item)}
              style={[styles.item, isActive && styles.activeItem]}
              hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
            >
              <Ionicons name={item.icon} size={22} color={DARK_TEXT} />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default BottomNavigation;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: INPUT_PILL_BG,
  },
  bar: {
    height: 62,
    backgroundColor: INPUT_PILL_BG,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItem: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
});