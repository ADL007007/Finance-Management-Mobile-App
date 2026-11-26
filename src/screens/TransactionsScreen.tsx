import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

type FilterMode = 'All' | 'Income' | 'Expense';

interface TransactionEntry {
  id: string;
  month: 'April' | 'March' | 'February';
  title: string;
  category: string;
  dateLabel: string;
  amount: number;
  type: 'Income' | 'Expense';
  icon: 'salary' | 'cart' | 'home' | 'car' | 'fork' | 'wallet';
  tint: string;
}

const TRANSACTIONS_DATA: TransactionEntry[] = [
  {
    id: '1',
    month: 'April',
    title: 'Salary',
    category: 'Monthly',
    dateLabel: '18:27 - April 30',
    amount: 4000.0,
    type: 'Income',
    icon: 'salary',
    tint: '#6DB6FE',
  },
  {
    id: '2',
    month: 'April',
    title: 'Groceries',
    category: 'Pantry',
    dateLabel: '17:00 - April 24',
    amount: -100.0,
    type: 'Expense',
    icon: 'cart',
    tint: '#4D9BFF',
  },
  {
    id: '3',
    month: 'April',
    title: 'Rent',
    category: 'Rent',
    dateLabel: '8:30 - April 15',
    amount: -674.4,
    type: 'Expense',
    icon: 'home',
    tint: '#0068FF',
  },
  {
    id: '4',
    month: 'April',
    title: 'Transport',
    category: 'Fuel',
    dateLabel: '7:30 - April 08',
    amount: -4.13,
    type: 'Expense',
    icon: 'car',
    tint: '#6DB6FE',
  },
  {
    id: '5',
    month: 'April',
    title: 'Others',
    category: 'Payments',
    dateLabel: '17:00 - April 24',
    amount: 120.0,
    type: 'Income',
    icon: 'wallet',
    tint: '#4D9BFF',
  },
  {
    id: '6',
    month: 'March',
    title: 'Food',
    category: 'Dinner',
    dateLabel: '19:30 - March 31',
    amount: -70.4,
    type: 'Expense',
    icon: 'fork',
    tint: '#0068FF',
  },
  {
    id: '7',
    month: 'March',
    title: 'Salary',
    category: 'Monthly',
    dateLabel: '18:27 - March 31',
    amount: 4000.0,
    type: 'Income',
    icon: 'salary',
    tint: '#6DB6FE',
  },
  {
    id: '8',
    month: 'March',
    title: 'Others',
    category: 'Upwork',
    dateLabel: '9:30 - April 12',
    amount: 340.0,
    type: 'Income',
    icon: 'wallet',
    tint: '#4D9BFF',
  },
  {
    id: '9',
    month: 'March',
    title: 'Rent',
    category: 'Rent',
    dateLabel: '18:39 - March 31',
    amount: -674.4,
    type: 'Expense',
    icon: 'home',
    tint: '#0068FF',
  },
  {
    id: '10',
    month: 'February',
    title: 'Others',
    category: 'Upwork',
    dateLabel: '10:15 - February 20',
    amount: 340.0,
    type: 'Income',
    icon: 'wallet',
    tint: '#4D9BFF',
  },
];

const MONTHS_ORDER: Array<'April' | 'March' | 'February'> = [
  'April',
  'March',
  'February',
];

const formatMoney = (amount: number) => {
  const absFormatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount < 0 ? `-$${absFormatted}` : `$${absFormatted}`;
};

export function TransactionsScreen() {
  const [filterMode, setFilterMode] = useState<FilterMode>('All');

  const groupedByMonth = useMemo(() => {
    const filtered = TRANSACTIONS_DATA.filter((item) => {
      if (filterMode === 'All') return true;
      return item.type === filterMode;
    });

    return MONTHS_ORDER.map((month) => ({
      month,
      items: filtered.filter((item) => item.month === month),
    })).filter((group) => group.items.length > 0);
  }, [filterMode]);

  const toggleMode = (target: 'Income' | 'Expense') => {
    setFilterMode((prev) => (prev === target ? 'All' : target));
  };

  const renderIcon = (icon: TransactionEntry['icon']) => {
    switch (icon) {
      case 'salary':
        return (
          <MaterialCommunityIcons
            name="briefcase-outline"
            size={20}
            color="#FFFFFF"
          />
        );
      case 'cart':
        return <Ionicons name="cart-outline" size={20} color="#FFFFFF" />;
      case 'home':
        return <Ionicons name="home-outline" size={20} color="#FFFFFF" />;
      case 'car':
        return <Ionicons name="car-outline" size={20} color="#FFFFFF" />;
      case 'fork':
        return (
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={20}
            color="#FFFFFF"
          />
        );
      case 'wallet':
        return <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Green Summary Header */}
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.iconButton}
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </Pressable>

          <Text style={styles.headerTitle}>Transaction</Text>

          <Pressable
            onPress={() => router.push('/notifications')}
            style={styles.bellButton}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#093030" />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        {/* Total Balance Banner */}
        <Pressable
          onPress={() => setFilterMode('All')}
          style={styles.balanceBanner}
        >
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$7,783.00</Text>
        </Pressable>

        {/* Income & Expense Filter Cards */}
        <View style={styles.filterCardsRow}>
          <Pressable
            onPress={() => toggleMode('Income')}
            style={[
              styles.summaryCard,
              filterMode === 'Income' && styles.summaryCardActive,
            ]}
          >
            <View style={styles.summaryIconBadge}>
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={18}
                color={filterMode === 'Income' ? '#FFFFFF' : '#0068FF'}
              />
            </View>
            <Text
              style={[
                styles.summaryCardTitle,
                filterMode === 'Income' && styles.summaryCardTextActive,
              ]}
            >
              Income
            </Text>
            <Text
              style={[
                styles.summaryIncomeValue,
                filterMode === 'Income' && styles.summaryCardTextActive,
              ]}
            >
              $4,120.00
            </Text>
          </Pressable>

          <Pressable
            onPress={() => toggleMode('Expense')}
            style={[
              styles.summaryCard,
              filterMode === 'Expense' && styles.summaryCardActive,
            ]}
          >
            <View style={styles.summaryIconBadge}>
              <MaterialCommunityIcons
                name="arrow-bottom-left"
                size={18}
                color={filterMode === 'Expense' ? '#FFFFFF' : '#0068FF'}
              />
            </View>
            <Text
              style={[
                styles.summaryCardTitle,
                filterMode === 'Expense' && styles.summaryCardTextActive,
              ]}
            >
              Expense
            </Text>
            <Text
              style={[
                styles.summaryExpenseValue,
                filterMode === 'Expense' && styles.summaryCardTextActive,
              ]}
            >
              $1,187.40
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content Sheet */}
      <View style={styles.contentSheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {groupedByMonth.map((group) => (
            <View key={group.month} style={styles.monthSection}>
              <View style={styles.monthHeaderRow}>
                <Text style={styles.monthTitle}>{group.month}</Text>
                <Pressable
                  onPress={() => router.push('/calendar')}
                  style={styles.calendarShortcut}
                  accessibilityLabel="Open calendar"
                >
                  <Ionicons name="calendar-outline" size={16} color="#093030" />
                </Pressable>
              </View>

              <View style={styles.itemsList}>
                {group.items.map((item) => {
                  const isExpense = item.amount < 0;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => router.push('/search')}
                      style={styles.txRow}
                    >
                      <View
                        style={[styles.txIconTile, { backgroundColor: item.tint }]}
                      >
                        {renderIcon(item.icon)}
                      </View>

                      <View style={styles.txMainCol}>
                        <Text style={styles.txTitle}>{item.title}</Text>
                        <Text style={styles.txDate}>{item.dateLabel}</Text>
                      </View>

                      <View style={styles.txCategoryCol}>
                        <Text style={styles.txCategory}>{item.category}</Text>
                      </View>

                      <Text
                        style={[
                          styles.txAmount,
                          isExpense
                            ? styles.txAmountExpense
                            : styles.txAmountIncome,
                        ]}
                      >
                        {formatMoney(item.amount)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Floating Navigation Bar */}
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
              style={[styles.navItem, styles.navItemActive]}
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
              style={styles.navItem}
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
    paddingBottom: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  balanceBanner: {
    backgroundColor: '#F1FFF3',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#093030',
  },
  filterCardsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#F1FFF3',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#093030',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryCardActive: {
    backgroundColor: '#0068FF',
  },
  summaryIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: 'rgba(109, 182, 254, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  summaryCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 2,
  },
  summaryIncomeValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#093030',
  },
  summaryExpenseValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0068FF',
  },
  summaryCardTextActive: {
    color: '#FFFFFF',
  },
  contentSheet: {
    flex: 1,
    backgroundColor: '#F1FFF3',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 105,
  },
  monthSection: {
    marginBottom: 18,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  calendarShortcut: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsList: {
    gap: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E4F4EC',
  },
  txIconTile: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  txMainCol: {
    flex: 1.25,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  txDate: {
    fontSize: 11,
    fontWeight: '500',
    color: '#0068FF',
    marginTop: 2,
  },
  txCategoryCol: {
    flex: 0.85,
    alignItems: 'center',
    paddingHorizontal: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DCEEE5',
  },
  txCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: '#57706A',
  },
  txAmount: {
    flex: 0.95,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '800',
  },
  txAmountIncome: {
    color: '#093030',
  },
  txAmountExpense: {
    color: '#0068FF',
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