import React, { useMemo, useState } from 'react';
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
import { BottomNavigation } from '../components/BottomNavigation';

const PRIMARY_GREEN = '#00D09E';
const DARK_TEXT = '#093030';
const SOFT_MINT_BG = '#F1FFF3';
const INPUT_PILL_BG = '#DFF7E2';
const BLUE_ACCENT = '#3299FF';
const BLUE_ICON_BG = '#6DB6FF';
const MUTED_TEXT = '#4B6B63';
const WHITE = '#FFFFFF';

type PeriodTab = 'Daily' | 'Weekly' | 'Monthly';

interface HomeNavTransaction {
  id: string;
  title: string;
  dateLabel: string;
  category: string;
  amount: number;
  icon: 'cash' | 'cart' | 'home';
}

const DATA_BY_PERIOD: Record<PeriodTab, HomeNavTransaction[]> = {
  Daily: [
    {
      id: 'hn-d1',
      title: 'Coffee & Snacks',
      dateLabel: '10:15 - Today',
      category: 'Food',
      amount: -14.5,
      icon: 'cart',
    },
    {
      id: 'hn-d2',
      title: 'Freelance Bonus',
      dateLabel: '09:00 - Today',
      category: 'Income',
      amount: 250,
      icon: 'cash',
    },
    {
      id: 'hn-d3',
      title: 'Utility Top-up',
      dateLabel: '08:30 - Today',
      category: 'Home',
      amount: -45,
      icon: 'home',
    },
  ],
  Weekly: [
    {
      id: 'hn-w1',
      title: 'Weekly Allowance',
      dateLabel: '14:00 - April 28',
      category: 'Budget',
      amount: 1200,
      icon: 'cash',
    },
    {
      id: 'hn-w2',
      title: 'Supermarket',
      dateLabel: '18:20 - April 26',
      category: 'Pantry',
      amount: -186.4,
      icon: 'cart',
    },
    {
      id: 'hn-w3',
      title: 'Internet & Bills',
      dateLabel: '11:10 - April 24',
      category: 'Home',
      amount: -92,
      icon: 'home',
    },
  ],
  Monthly: [
    {
      id: 'hn-m1',
      title: 'Salary',
      dateLabel: '18:27 - April 30',
      category: 'Monthly',
      amount: 4000,
      icon: 'cash',
    },
    {
      id: 'hn-m2',
      title: 'Groceries',
      dateLabel: '17:00 - April 24',
      category: 'Pantry',
      amount: -100,
      icon: 'cart',
    },
    {
      id: 'hn-m3',
      title: 'Rent',
      dateLabel: '8:30 - April 15',
      category: 'Rent',
      amount: -674.4,
      icon: 'home',
    },
  ],
};

function formatMoney(value: number): string {
  const abs = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `-$${abs}` : `$${abs}`;
}

export function HomeBottomNavScreen() {
  const [period, setPeriod] = useState<PeriodTab>('Monthly');
  const transactions = useMemo(() => DATA_BY_PERIOD[period], [period]);

  const renderIcon = (type: HomeNavTransaction['icon']) => {
    switch (type) {
      case 'cash':
        return <MaterialCommunityIcons name="cash-multiple" size={24} color={WHITE} />;
      case 'cart':
        return <Ionicons name="cart-outline" size={22} color={WHITE} />;
      case 'home':
        return <Ionicons name="home-outline" size={22} color={WHITE} />;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <View style={styles.topSection}>
        <SafeAreaView edges={['top']} style={styles.topSafe}>
          <View style={styles.greetingRow}>
            <View>
              <Text style={styles.greetingTitle}>Hi, Welcome Back</Text>
              <Text style={styles.greetingSubtitle}>Good Morning</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/notifications')}
              style={styles.bellButton}
            >
              <Ionicons name="notifications-outline" size={20} color={DARK_TEXT} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/account-balance')}
              style={styles.statCol}
            >
              <View style={styles.statLabelRow}>
                <View style={styles.smallIconBox}>
                  <Ionicons name="wallet-outline" size={13} color={DARK_TEXT} />
                </View>
                <Text style={styles.statLabel}>Total Balance</Text>
              </View>
              <Text style={styles.balanceValue}>$7,783.00</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/account-balance')}
              style={styles.statCol}
            >
              <View style={styles.statLabelRow}>
                <View style={styles.smallIconBox}>
                  <Ionicons name="card-outline" size={13} color={DARK_TEXT} />
                </View>
                <Text style={styles.statLabel}>Total Expense</Text>
              </View>
              <Text style={styles.expenseValue}>-$1,187.40</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBlock}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
              <Text style={styles.progressPercentText}>30%</Text>
              <Text style={styles.progressTargetText}>$20,000.00</Text>
            </View>

            <View style={styles.progressCaptionRow}>
              <Ionicons name="checkbox-outline" size={15} color={DARK_TEXT} />
              <Text style={styles.progressCaptionText}>
                30% Of Your Expenses, Looks Good.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.sheetContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.summaryCard}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/savings')}
              style={styles.savingsBlock}
            >
              <View style={styles.savingsRing}>
                <Ionicons name="car-sport-outline" size={28} color={DARK_TEXT} />
              </View>
              <Text style={styles.savingsLabel}>Savings</Text>
              <Text style={styles.savingsLabel}>On Goals</Text>
            </TouchableOpacity>

            <View style={styles.cardVerticalDivider} />

            <View style={styles.rightMetricsCol}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/quickly-analysis')}
                style={styles.metricItem}
              >
                <Ionicons name="wallet-outline" size={22} color={DARK_TEXT} />
                <View>
                  <Text style={styles.metricTitle}>Revenue Last Week</Text>
                  <Text style={styles.metricPositive}>$4,000.00</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.metricHorizontalDivider} />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/quickly-analysis')}
                style={styles.metricItem}
              >
                <Ionicons name="restaurant-outline" size={22} color={DARK_TEXT} />
                <View>
                  <Text style={styles.metricTitle}>Food Last Week</Text>
                  <Text style={styles.metricNegative}>-$100.00</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tabsRow}>
            {(['Daily', 'Weekly', 'Monthly'] as PeriodTab[]).map((item) => {
              const active = period === item;
              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() => setPeriod(item)}
                  style={[styles.tabPill, active && styles.tabPillActive]}
                >
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.txList}>
            {transactions.map((tx) => {
              const isPositive = tx.amount >= 0;
              return (
                <TouchableOpacity
                  key={tx.id}
                  activeOpacity={0.75}
                  onPress={() => router.push('/transactions')}
                  style={styles.txRow}
                >
                  <View style={styles.txLeft}>
                    <View style={styles.txIconCircle}>{renderIcon(tx.icon)}</View>
                    <View style={styles.txTextCol}>
                      <Text style={styles.txTitle}>{tx.title}</Text>
                      <Text style={styles.txDate}>{tx.dateLabel}</Text>
                    </View>
                  </View>

                  <View style={styles.txMiddle}>
                    <View style={styles.txVerticalSep} />
                    <Text style={styles.txCategory}>{tx.category}</Text>
                    <View style={styles.txVerticalSep} />
                  </View>

                  <Text
                    style={[
                      styles.txAmount,
                      isPositive ? styles.txAmountPositive : styles.txAmountNegative,
                    ]}
                  >
                    {formatMoney(tx.amount)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <BottomNavigation activeTab="home" />
    </View>
  );
}

export default HomeBottomNavScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_GREEN,
  },
  topSection: {
    backgroundColor: PRIMARY_GREEN,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  topSafe: {
    paddingTop: 8,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_TEXT,
  },
  greetingSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: DARK_TEXT,
    marginTop: 2,
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: SOFT_MINT_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCol: {
    flex: 1,
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  smallIconBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: SOFT_MINT_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: DARK_TEXT,
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: SOFT_MINT_BG,
  },
  expenseValue: {
    fontSize: 22,
    fontWeight: '800',
    color: BLUE_ACCENT,
  },
  verticalDivider: {
    width: 1,
    height: 38,
    backgroundColor: 'rgba(9, 48, 48, 0.25)',
    marginHorizontal: 14,
  },
  progressBlock: {
    gap: 8,
  },
  progressTrack: {
    height: 24,
    borderRadius: 12,
    backgroundColor: DARK_TEXT,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: SOFT_MINT_BG,
    borderRadius: 12,
  },
  progressPercentText: {
    fontSize: 11,
    fontWeight: '700',
    color: DARK_TEXT,
    zIndex: 2,
  },
  progressTargetText: {
    fontSize: 12,
    fontWeight: '700',
    color: SOFT_MINT_BG,
    zIndex: 2,
  },
  progressCaptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressCaptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: DARK_TEXT,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: SOFT_MINT_BG,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
    gap: 18,
  },
  summaryCard: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsBlock: {
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savingsRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: BLUE_ACCENT,
    backgroundColor: INPUT_PILL_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  savingsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: DARK_TEXT,
    lineHeight: 15,
    textAlign: 'center',
  },
  cardVerticalDivider: {
    width: 1.5,
    height: 92,
    backgroundColor: SOFT_MINT_BG,
    marginHorizontal: 12,
  },
  rightMetricsCol: {
    flex: 1,
    gap: 10,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: DARK_TEXT,
  },
  metricPositive: {
    fontSize: 15,
    fontWeight: '800',
    color: SOFT_MINT_BG,
    marginTop: 2,
  },
  metricNegative: {
    fontSize: 15,
    fontWeight: '800',
    color: BLUE_ACCENT,
    marginTop: 2,
  },
  metricHorizontalDivider: {
    height: 1.5,
    backgroundColor: SOFT_MINT_BG,
  },
  tabsRow: {
    backgroundColor: INPUT_PILL_BG,
    borderRadius: 22,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabPill: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPillActive: {
    backgroundColor: PRIMARY_GREEN,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_TEXT,
  },
  tabTextActive: {
    fontWeight: '700',
    color: DARK_TEXT,
  },
  txList: {
    gap: 14,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1.3,
  },
  txIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: BLUE_ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txTextCol: {
    flexShrink: 1,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: DARK_TEXT,
  },
  txDate: {
    fontSize: 11,
    color: MUTED_TEXT,
    marginTop: 2,
  },
  txMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 6,
  },
  txVerticalSep: {
    width: 1,
    height: 24,
    backgroundColor: '#A6D8C5',
  },
  txCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: MUTED_TEXT,
    minWidth: 46,
    textAlign: 'center',
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    minWidth: 74,
  },
  txAmountPositive: {
    color: DARK_TEXT,
  },
  txAmountNegative: {
    color: BLUE_ACCENT,
  },
});