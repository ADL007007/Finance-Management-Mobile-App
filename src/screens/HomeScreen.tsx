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

const PRIMARY_GREEN = '#00D09E';
const DARK_TEXT = '#093030';
const SOFT_MINT_BG = '#F1FFF3';
const INPUT_PILL_BG = '#DFF7E2';
const BLUE_ACCENT = '#3299FF';
const BLUE_ICON_BG = '#6DB6FF';
const MUTED_TEXT = '#4B6B63';
const WHITE = '#FFFFFF';

type PeriodKey = 'Daily' | 'Weekly' | 'Monthly';

interface TransactionItem {
  id: string;
  title: string;
  dateLabel: string;
  category: string;
  amount: number;
  icon: 'cash' | 'cart' | 'home';
}

const TRANSACTIONS_BY_PERIOD: Record<PeriodKey, TransactionItem[]> = {
  Daily: [
    {
      id: 'd1',
      title: 'Coffee & Snacks',
      dateLabel: '10:15 - Today',
      category: 'Food',
      amount: -14.5,
      icon: 'cart',
    },
    {
      id: 'd2',
      title: 'Freelance Bonus',
      dateLabel: '09:00 - Today',
      category: 'Income',
      amount: 250,
      icon: 'cash',
    },
    {
      id: 'd3',
      title: 'Utility Top-up',
      dateLabel: '08:30 - Today',
      category: 'Home',
      amount: -45,
      icon: 'home',
    },
  ],
  Weekly: [
    {
      id: 'w1',
      title: 'Weekly Allowance',
      dateLabel: '14:00 - April 28',
      category: 'Budget',
      amount: 1200,
      icon: 'cash',
    },
    {
      id: 'w2',
      title: 'Supermarket',
      dateLabel: '18:20 - April 26',
      category: 'Pantry',
      amount: -186.4,
      icon: 'cart',
    },
    {
      id: 'w3',
      title: 'Internet & Bills',
      dateLabel: '11:10 - April 24',
      category: 'Home',
      amount: -92,
      icon: 'home',
    },
  ],
  Monthly: [
    {
      id: 'm1',
      title: 'Salary',
      dateLabel: '18:27 - April 30',
      category: 'Monthly',
      amount: 4000,
      icon: 'cash',
    },
    {
      id: 'm2',
      title: 'Groceries',
      dateLabel: '17:00 - April 24',
      category: 'Pantry',
      amount: -100,
      icon: 'cart',
    },
    {
      id: 'm3',
      title: 'Rent',
      dateLabel: '8:30 - April 15',
      category: 'Rent',
      amount: -674.4,
      icon: 'home',
    },
  ],
};

function formatCurrency(value: number): string {
  const absFormatted = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `-$${absFormatted}` : `$${absFormatted}`;
}

export function HomeScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('Monthly');

  const items = useMemo(
    () => TRANSACTIONS_BY_PERIOD[selectedPeriod],
    [selectedPeriod]
  );

  const renderTxIcon = (type: TransactionItem['icon']) => {
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

      {/* Top Green Header & Summary */}
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

          {/* Balance & Expense Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <View style={styles.statLabelRow}>
                <View style={styles.smallIconBox}>
                  <Ionicons name="wallet-outline" size={13} color={DARK_TEXT} />
                </View>
                <Text style={styles.statLabel}>Total Balance</Text>
              </View>
              <Text style={styles.balanceValue}>$7,783.00</Text>
            </View>

            <View style={styles.verticalDivider} />

            <View style={styles.statCol}>
              <View style={styles.statLabelRow}>
                <View style={styles.smallIconBox}>
                  <Ionicons name="card-outline" size={13} color={DARK_TEXT} />
                </View>
                <Text style={styles.statLabel}>Total Expense</Text>
              </View>
              <Text style={styles.expenseValue}>-$1,187.40</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBlock}>
            <View style={styles.progressTrack}>
              <View style={styles.progressLabelLeft}>
                <Text style={styles.progressPercentText}>30%</Text>
              </View>
              <View style={styles.progressFill} />
              <View style={styles.progressLabelRight}>
                <Text style={styles.progressTargetText}>$20,000.00</Text>
              </View>
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

      {/* Rounded Mint Sheet */}
      <View style={styles.sheetContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Savings & Income/Expense Card */}
          <View style={styles.summaryCard}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/savings')}
              style={styles.savingsBlock}
            >
              <View style={styles.savingsRing}>
                <View style={styles.savingsInner}>
                  <Ionicons name="car-sport-outline" size={28} color={DARK_TEXT} />
                </View>
              </View>
              <Text style={styles.savingsLabel}>Savings</Text>
              <Text style={styles.savingsLabel}>On Goals</Text>
            </TouchableOpacity>

            <View style={styles.cardVerticalDivider} />

            <View style={styles.rightMetricsCol}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/transactions')}
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
                onPress={() => router.push('/transactions')}
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

          {/* Period Tabs */}
          <View style={styles.tabsRow}>
            {(['Daily', 'Weekly', 'Monthly'] as PeriodKey[]).map((period) => {
              const active = selectedPeriod === period;
              return (
                <TouchableOpacity
                  key={period}
                  activeOpacity={0.8}
                  onPress={() => setSelectedPeriod(period)}
                  style={[styles.tabPill, active && styles.tabPillActive]}
                >
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Transactions List */}
          <View style={styles.txList}>
            {items.map((item) => {
              const isPositive = item.amount >= 0;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.75}
                  onPress={() => router.push('/transactions')}
                  style={styles.txRow}
                >
                  <View style={styles.txLeft}>
                    <View style={styles.txIconCircle}>{renderTxIcon(item.icon)}</View>
                    <View style={styles.txTextCol}>
                      <Text style={styles.txTitle}>{item.title}</Text>
                      <Text style={styles.txDate}>{item.dateLabel}</Text>
                    </View>
                  </View>

                  <View style={styles.txMiddle}>
                    <View style={styles.txVerticalSep} />
                    <Text style={styles.txCategory}>{item.category}</Text>
                    <View style={styles.txVerticalSep} />
                  </View>

                  <Text
                    style={[
                      styles.txAmount,
                      isPositive ? styles.txAmountPositive : styles.txAmountNegative,
                    ]}
                  >
                    {formatCurrency(item.amount)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar */}
      <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/home')}
            style={styles.navActiveCircle}
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

export default HomeScreen;

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
    position: 'relative',
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: SOFT_MINT_BG,
    borderRadius: 12,
  },
  progressLabelLeft: {
    position: 'absolute',
    left: 12,
    zIndex: 2,
  },
  progressPercentText: {
    fontSize: 11,
    fontWeight: '700',
    color: DARK_TEXT,
  },
  progressLabelRight: {
    position: 'absolute',
    right: 12,
    zIndex: 2,
  },
  progressTargetText: {
    fontSize: 12,
    fontWeight: '700',
    color: SOFT_MINT_BG,
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
  savingsInner: {
    alignItems: 'center',
    justifyContent: 'center',
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
  navActiveCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
});