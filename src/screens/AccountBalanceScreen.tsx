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
const BLUE_ICON_BG = '#6DB6FF';
const MUTED_TEXT = '#4B6B63';
const WHITE = '#FFFFFF';

type FilterType = 'all' | 'income' | 'expense';

interface AccountTransaction {
  id: string;
  title: string;
  dateLabel: string;
  category: string;
  amount: number;
  icon: 'cash' | 'cart' | 'home' | 'bus';
}

const INITIAL_TRANSACTIONS: AccountTransaction[] = [
  {
    id: 't1',
    title: 'Salary',
    dateLabel: '18:27 - April 30',
    category: 'Monthly',
    amount: 4000,
    icon: 'cash',
  },
  {
    id: 't2',
    title: 'Groceries',
    dateLabel: '17:00 - April 24',
    category: 'Pantry',
    amount: -100,
    icon: 'cart',
  },
  {
    id: 't3',
    title: 'Rent',
    dateLabel: '8:30 - April 15',
    category: 'Rent',
    amount: -674.4,
    icon: 'home',
  },
  {
    id: 't4',
    title: 'Transport',
    dateLabel: '9:30 - April 08',
    category: 'Fuel',
    amount: -4.13,
    icon: 'bus',
  },
];

function formatAmount(value: number): string {
  const abs = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `-$${abs}` : `$${abs}`;
}

export function AccountBalanceScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [transactions] = useState<AccountTransaction[]>(INITIAL_TRANSACTIONS);

  const visibleTransactions = transactions.filter((item) => {
    if (filter === 'income') return item.amount > 0;
    if (filter === 'expense') return item.amount < 0;
    return true;
  });

  const renderIcon = (icon: AccountTransaction['icon']) => {
    switch (icon) {
      case 'cash':
        return <MaterialCommunityIcons name="cash-multiple" size={22} color={WHITE} />;
      case 'cart':
        return <Ionicons name="cart-outline" size={20} color={WHITE} />;
      case 'home':
        return <Ionicons name="home-outline" size={20} color={WHITE} />;
      case 'bus':
        return <Ionicons name="bus-outline" size={20} color={WHITE} />;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Top Green Header & Balance Overview */}
      <View style={styles.topSection}>
        <SafeAreaView edges={['top']} style={styles.topSafe}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.back()}
              style={styles.iconBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="arrow-back" size={22} color={SOFT_MINT_BG} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Account Balance</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/notifications')}
              style={styles.bellBtn}
            >
              <Ionicons name="notifications-outline" size={18} color={DARK_TEXT} />
            </TouchableOpacity>
          </View>

          <View style={styles.totalsRow}>
            <View style={styles.totalCol}>
              <View style={styles.totalLabelRow}>
                <View style={styles.miniBadge}>
                  <Ionicons name="wallet-outline" size={12} color={DARK_TEXT} />
                </View>
                <Text style={styles.totalLabel}>Total Balance</Text>
              </View>
              <Text style={styles.balanceText}>$7,783.00</Text>
            </View>

            <View style={styles.vDivider} />

            <View style={styles.totalCol}>
              <View style={styles.totalLabelRow}>
                <View style={styles.miniBadge}>
                  <Ionicons name="card-outline" size={12} color={DARK_TEXT} />
                </View>
                <Text style={styles.totalLabel}>Total Expense</Text>
              </View>
              <Text style={styles.expenseText}>-$1,187.40</Text>
            </View>
          </View>

          <View style={styles.progressWrap}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
              <Text style={styles.progressPercent}>30%</Text>
              <Text style={styles.progressLimit}>$20,000.00</Text>
            </View>

            <View style={styles.progressNoteRow}>
              <Ionicons name="checkbox-outline" size={14} color={DARK_TEXT} />
              <Text style={styles.progressNoteText}>
                30% Of Your Expenses, Looks Good.
              </Text>
            </View>
          </View>

          {/* Income & Expense Cards */}
          <View style={styles.cardsRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                setFilter((prev) => (prev === 'income' ? 'all' : 'income'))
              }
              style={[
                styles.summaryBox,
                filter === 'income' && styles.summaryBoxActive,
              ]}
            >
              <View style={styles.summaryBoxIcon}>
                <Ionicons name="trending-up-outline" size={20} color={DARK_TEXT} />
              </View>
              <Text style={styles.summaryBoxLabel}>Income</Text>
              <Text style={styles.summaryBoxIncome}>$4,000.00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                setFilter((prev) => (prev === 'expense' ? 'all' : 'expense'))
              }
              style={[
                styles.summaryBox,
                filter === 'expense' && styles.summaryBoxActive,
              ]}
            >
              <View style={styles.summaryBoxIcon}>
                <Ionicons name="trending-down-outline" size={20} color={DARK_TEXT} />
              </View>
              <Text style={styles.summaryBoxLabel}>Expense</Text>
              <Text style={styles.summaryBoxExpense}>$1,187.40</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Rounded Mint Transactions Sheet */}
      <View style={styles.sheetContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listHeaderRow}>
            <Text style={styles.listTitle}>Transactions</Text>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setFilter('all')}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.txList}>
            {visibleTransactions.map((tx) => {
              const isPositive = tx.amount >= 0;
              return (
                <TouchableOpacity
                  key={tx.id}
                  activeOpacity={0.75}
                  onPress={() => router.push('/transactions')}
                  style={styles.txRow}
                >
                  <View style={styles.txLeft}>
                    <View style={styles.txIconBox}>{renderIcon(tx.icon)}</View>
                    <View style={styles.txInfo}>
                      <Text style={styles.txTitle}>{tx.title}</Text>
                      <Text style={styles.txDate}>{tx.dateLabel}</Text>
                    </View>
                  </View>

                  <View style={styles.txCategoryWrap}>
                    <View style={styles.txSep} />
                    <Text style={styles.txCategory}>{tx.category}</Text>
                    <View style={styles.txSep} />
                  </View>

                  <Text
                    style={[
                      styles.txAmount,
                      isPositive ? styles.txPositive : styles.txNegative,
                    ]}
                  >
                    {formatAmount(tx.amount)}
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

export default AccountBalanceScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_GREEN,
  },
  topSection: {
    backgroundColor: PRIMARY_GREEN,
    paddingHorizontal: 22,
    paddingBottom: 22,
  },
  topSafe: {
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconBtn: {
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
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: SOFT_MINT_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  totalCol: {
    flex: 1,
  },
  totalLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  miniBadge: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: SOFT_MINT_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: DARK_TEXT,
  },
  balanceText: {
    fontSize: 22,
    fontWeight: '800',
    color: SOFT_MINT_BG,
  },
  expenseText: {
    fontSize: 22,
    fontWeight: '800',
    color: BLUE_ACCENT,
  },
  vDivider: {
    width: 1,
    height: 38,
    backgroundColor: 'rgba(9, 48, 48, 0.25)',
    marginHorizontal: 14,
  },
  progressWrap: {
    gap: 8,
    marginBottom: 16,
  },
  progressBar: {
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
  progressPercent: {
    fontSize: 11,
    fontWeight: '700',
    color: DARK_TEXT,
    zIndex: 2,
  },
  progressLimit: {
    fontSize: 12,
    fontWeight: '700',
    color: SOFT_MINT_BG,
    zIndex: 2,
  },
  progressNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressNoteText: {
    fontSize: 12,
    fontWeight: '500',
    color: DARK_TEXT,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: SOFT_MINT_BG,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 4,
  },
  summaryBoxActive: {
    borderWidth: 2,
    borderColor: DARK_TEXT,
  },
  summaryBoxIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: INPUT_PILL_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryBoxLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: DARK_TEXT,
  },
  summaryBoxIncome: {
    fontSize: 16,
    fontWeight: '800',
    color: DARK_TEXT,
  },
  summaryBoxExpense: {
    fontSize: 16,
    fontWeight: '800',
    color: BLUE_ACCENT,
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
    paddingBottom: 20,
    gap: 14,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_TEXT,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: DARK_TEXT,
    textDecorationLine: 'underline',
  },
  txList: {
    gap: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1.3,
  },
  txIconBox: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: BLUE_ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txInfo: {
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
  txCategoryWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 6,
  },
  txSep: {
    width: 1,
    height: 22,
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
    minWidth: 72,
  },
  txPositive: {
    color: DARK_TEXT,
  },
  txNegative: {
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
});