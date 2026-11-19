import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PRIMARY_GREEN = '#00D09E';
const DARK_TEXT = '#093030';
const SOFT_MINT_BG = '#F1FFF3';
const INPUT_PILL_BG = '#DFF7E2';
const BLUE_ACCENT = '#3299FF';
const MUTED_TEXT = '#4B6B63';
const DIVIDER_COLOR = '#CBE9D6';

type NotificationIconType = 'bell' | 'star' | 'dollar' | 'expense';

interface NotificationItem {
  id: string;
  section: 'Today' | 'Yesterday' | 'This Weekend';
  title: string;
  description: string;
  metaText?: string;
  timestamp: string;
  icon: NotificationIconType;
  unread?: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    section: 'Today',
    title: 'Reminder!',
    description: 'Set up your automatic savings to meet your savings goal...',
    timestamp: '17:00 - April 24',
    icon: 'bell',
    unread: true,
  },
  {
    id: 'n2',
    section: 'Today',
    title: 'New Update',
    description: 'Set up your automatic savings to meet your savings goal...',
    timestamp: '17:00 - April 24',
    icon: 'star',
    unread: true,
  },
  {
    id: 'n3',
    section: 'Yesterday',
    title: 'Transactions',
    description: 'A new transaction has been registered',
    metaText: 'Groceries | Pantry | -$100.00',
    timestamp: '17:00 - April 24',
    icon: 'dollar',
  },
  {
    id: 'n4',
    section: 'Yesterday',
    title: 'Reminder!',
    description: 'Set up your automatic savings to meet your savings goal...',
    timestamp: '17:00 - April 24',
    icon: 'bell',
  },
  {
    id: 'n5',
    section: 'This Weekend',
    title: 'Expense Record',
    description: 'We recommend that you be more attentive to your finances.',
    timestamp: '17:00 - April 24',
    icon: 'expense',
  },
  {
    id: 'n6',
    section: 'This Weekend',
    title: 'Transactions',
    description: 'A new transaction has been registered',
    metaText: 'Food | Dinner | -$70.40',
    timestamp: '17:00 - April 24',
    icon: 'dollar',
  },
];

const SECTIONS: NotificationItem['section'][] = [
  'Today',
  'Yesterday',
  'This Weekend',
];

export function NotificationScreen() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const handlePressItem = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    if (item.title === 'Transactions') {
      router.push('/transactions');
    } else if (item.title === 'Reminder!') {
      router.push('/savings');
    }
  };

  const renderIcon = (type: NotificationIconType) => {
    switch (type) {
      case 'bell':
        return <Ionicons name="notifications-outline" size={20} color={DARK_TEXT} />;
      case 'star':
        return <Ionicons name="star-outline" size={20} color={DARK_TEXT} />;
      case 'dollar':
        return <MaterialCommunityIcons name="currency-usd" size={20} color={DARK_TEXT} />;
      case 'expense':
        return <Ionicons name="trending-down-outline" size={20} color={DARK_TEXT} />;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.headerSection}>
        <SafeAreaView edges={['top']} style={styles.headerSafe}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.back()}
              style={styles.backButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="arrow-back" size={22} color={SOFT_MINT_BG} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Notification</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleMarkAllRead}
              style={styles.bellBadgeButton}
            >
              <Ionicons name="notifications-outline" size={18} color={DARK_TEXT} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Rounded Mint Sheet */}
      <View style={styles.sheetContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {SECTIONS.map((section) => {
            const sectionItems = notifications.filter(
              (item) => item.section === section
            );
            return (
              <View key={section} style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>{section}</Text>

                {sectionItems.map((item, idx) => {
                  const isLast = idx === sectionItems.length - 1;
                  return (
                    <View key={item.id}>
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => handlePressItem(item)}
                        style={styles.notificationRow}
                      >
                        <View style={styles.iconTile}>{renderIcon(item.icon)}</View>

                        <View style={styles.textColumn}>
                          <View style={styles.titleLine}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            {item.unread ? <View style={styles.unreadDot} /> : null}
                          </View>

                          <Text style={styles.itemDescription}>
                            {item.description}
                          </Text>

                          {item.metaText ? (
                            <Text style={styles.itemMeta}>{item.metaText}</Text>
                          ) : null}

                          <Text style={styles.itemTimestamp}>{item.timestamp}</Text>
                        </View>
                      </TouchableOpacity>

                      {!isLast ? <View style={styles.rowDivider} /> : null}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Bottom Floating / Docked Menu */}
      <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/home')}
            style={styles.navItem}
          >
            <Ionicons name="home-outline" size={22} color={DARK_TEXT} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/analytics')}
            style={styles.navItem}
          >
            <Ionicons name="stats-chart-outline" size={22} color={DARK_TEXT} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/transactions')}
            style={styles.navItem}
          >
            <Ionicons name="swap-horizontal-outline" size={22} color={DARK_TEXT} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/categories')}
            style={styles.navItem}
          >
            <Ionicons name="layers-outline" size={22} color={DARK_TEXT} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/profile')}
            style={styles.navItem}
          >
            <Ionicons name="person-outline" size={22} color={DARK_TEXT} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_GREEN,
  },
  headerSection: {
    backgroundColor: PRIMARY_GREEN,
    paddingHorizontal: 22,
    paddingBottom: 26,
  },
  headerSafe: {
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_TEXT,
    letterSpacing: -0.2,
  },
  bellBadgeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: SOFT_MINT_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: SOFT_MINT_BG,
    borderTopLeftRadius: 52,
    borderTopRightRadius: 52,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    gap: 20,
  },
  sectionBlock: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: DARK_TEXT,
    marginBottom: 2,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingVertical: 4,
  },
  iconTile: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textColumn: {
    flex: 1,
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: DARK_TEXT,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: PRIMARY_GREEN,
  },
  itemDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: MUTED_TEXT,
    marginTop: 3,
  },
  itemMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: BLUE_ACCENT,
    marginTop: 4,
  },
  itemTimestamp: {
    fontSize: 11,
    color: MUTED_TEXT,
    marginTop: 5,
  },
  rowDivider: {
    height: 1,
    backgroundColor: DIVIDER_COLOR,
    marginTop: 12,
    marginLeft: 56,
  },
  bottomNavWrapper: {
    backgroundColor: INPUT_PILL_BG,
  },
  bottomNav: {
    height: 62,
    backgroundColor: INPUT_PILL_BG,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});