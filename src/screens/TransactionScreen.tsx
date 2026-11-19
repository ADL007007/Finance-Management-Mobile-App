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

type MonthSectionKey = 'April' | 'March';

interface TransactionRecord {
  id: string;
  month: MonthSectionKey;
  title: string;
  dateLabel: string;
  category: string;
  amount: number;
  icon: 'cash' | 'cart' | 'home' | 'bus' | 'food';
}

const TRANSACTIONS_DATA: TransactionRecord[] = [
  {
    id: 'tr-1',
    month: 'April',
    title: 'Salary',
    dateLabel: '18:27 - April 30',
    category: 'Monthly',
    amount: 4000,
    icon: 'cash',
  },
  {
    id: 'tr-2',
    month: 'April',
    title: 'Groceries',
    dateLabel: '17:00 - April 24',
    category: 'Pantry',
    amount: -100,
    icon: 'cart',
  },
  {
    id: 'tr-3',
    month: 'April',
    title: 'Rent',
    dateLabel: '8:30 - April 15',
    category: 'Rent',
    amount: -674.4,
    icon: 'home',
  },
  {
    id: 'tr-4',
    month: 'April',
    title: 'Transport',
    dateLabel: '9:30 - April 08',
    category: 'Fuel',
    amount: -4.13,
    icon: 'bus',
  },
  {
    id: 'tr-5',
    month: 'March',
    title: 'Food',
    dateLabel: '19:30 - March 31',
    category: 'Dinner',
    amount: -70.4,
    icon: 'food',
  },
];

const MONTHS_ORDER: MonthSectionKey[] = ['April', 'March'];

function formatTransactionAmount(value: number): string {
  const abs = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `-$${abs}` : `$${abs}`;
}

export function TransactionScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const groupedByMonth = useMemo(() => {
    return MONTHS_ORDER.map((month) => ({
      month,
      items: TRANSACTIONS_DATA.filter((item) => item.month === month),
    }));
  }, []);

  const renderIcon = (icon: TransactionRecord['icon']) => {
    switch (icon) {
      case 'cash':
        return <MaterialCommunityIcons name="cash-multiple" size={22} color={WHITE} />;
      case 'cart':
        return <Ionicons name="cart-outline" size={20} color={WHITE} />;
      case 'home':
        return <Ionicons name="home-outline" size={20} color={WHITE} />;
      case 'bus':
        return <Ionicons name="bus-outline" size={20} color={WHITE} />;
      case 'food':
        return <Ionicons name="restaurant-outline" size={20} color={WHITE} />;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

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

            <Text style={styles.headerTitle}>Transaction</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/notifications')}
              style={styles.bellBtn}
            >
              <Ionicons name="notifications-outline" size={18} color={DARK_TEXT} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/account-balance')}
            style={styles.totalBalanceCard}
          >
            <Text style={styles.totalBalanceLabel}>Total Balance</Text>
            <Text style={styles.totalBalanceValue}>$7,783.00</Text>
          </TouchableOpacity>

          <View style={styles.metricsRow}>
            <View style={styles.metricCol}>
              <View style={styles.metricHeader}>
                <View style={styles.miniBadge}>
                  <Ionicons name="wallet-outline" size={12} color={DARK_TEXT} />
                </View>
                <Text style={styles.metricTitle}>Total Balance</Text>
              </View>
              <Text style={styles.metricBalanceValue}>$7,783.00</Text>
            </View>

            <View style={styles.verticalSep} />

            <View style={styles.metricCol}>
              <View style={styles.metricHeader}>
                <View style={styles.miniBadge}>
                  <Ionicons name="card-outline" size={12} color={DARK_TEXT} />
                </View>
                <Text style={styles.metricTitle}>Total Expense</Text>
              </View>
              <Text style={styles.metricExpenseValue}>-$1,187.40</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
              <Text style={styles.progressPercent}>30%</Text>
              <Text style={styles.progressCap}>$20,000.00</Text>
            </View>

            <View style={styles.progressFooter}>
              <Ionicons name="checkbox-outline" size={14} color={DARK_TEXT} />
              <Text style={styles.progressCaption}>
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
          {groupedByMonth.map((group) => (
            <View key={group.month} style={styles.monthGroup}>
              <View style={styles.monthHeaderRow}>
                <Text style={styles.monthTitle}>{group.month}</Text>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => router.push('/quickly-analysis')}
                  style={styles.monthFilterBadge}
                >
                  <Ionicons name="calendar-outline" size={15} color={DARK_TEXT} />
                </TouchableOpacity>
              </View>

              <View style={styles.itemsList}>
                {group.items.map((item) => {
                  const isPositive = item.amount >= 0;
                  const isSelected = selectedId === item.id;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.75}
                      onPress={() =>
                        setSelectedId((prev) => (prev === item.id ? null : item.id))
                      }
                      style={[
                        styles.txRow,
                        isSelected && styles.txRowSelected,
                      ]}
                    >
                      <View style={styles.txLeft}>
                        <View style={styles.txIconCircle}>{renderIcon(item.icon)}</View>
                        <View style={styles.txMeta}>
                          <Text style={styles.txTitle}>{item.title}</Text>
                          <Text style={styles.txDate}>{item.dateLabel}</Text>
                        </View>
                      </View>

                      <View style={styles.txCategoryBlock}>
                        <View style={styles.txDivider} />
                        <Text style={styles.txCategory}>{item.category}</Text>
                        <View style={styles.txDivider} />
                      </View>

                      <Text
                        style={[
                          styles.txAmount,
                          isPositive ? styles.txAmountPositive : styles.txAmountNegative,
                        ]}
                      >
                        {formatTransactionAmount(item.amount)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

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
            onPress={() => router.push('/quickly-analysis')}
            style={styles.navItem}
          >
            <Ionicons name="stats-chart-outline" size={22} color={DARK_TEXT} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/transactions')}
            style={styles.navActiveCircle}
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

export default TransactionScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_GREEN,
  },
  topSection: {
    backgroundColor: PRIMARY_GREEN,
    paddingHorizontal: 22,
    paddingBottom: 20,
  },
  topSafe: {
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
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
  totalBalanceCard: {
    backgroundColor: SOFT_MINT_BG,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  totalBalanceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: DARK_TEXT,
  },
  totalBalanceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: DARK_TEXT,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricCol: {
    flex: 1,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  miniBadge: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: SOFT_MINT_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: DARK_TEXT,
  },
  metricBalanceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: SOFT_MINT_BG,
  },
  metricExpenseValue: {
    fontSize: 18,
    fontWeight: '800',
    color: BLUE_ACCENT,
  },
  verticalSep: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(9, 48, 48, 0.25)',
    marginHorizontal: 14,
  },
  progressSection: {
    gap: 6,
  },
  progressTrack: {
    height: 22,
    borderRadius: 11,
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
    borderRadius: 11,
  },
  progressPercent: {
    fontSize: 11,
    fontWeight: '700',
    color: DARK_TEXT,
    zIndex: 2,
  },
  progressCap: {
    fontSize: 11,
    fontWeight: '700',
    color: SOFT_MINT_BG,
    zIndex: 2,
  },
  progressFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressCaption: {
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
    paddingBottom: 20,
    gap: 18,
  },
  monthGroup: {
    gap: 12,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: DARK_TEXT,
  },
  monthFilterBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: INPUT_PILL_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsList: {
    gap: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 14,
  },
  txRowSelected: {
    backgroundColor: INPUT_PILL_BG,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1.3,
  },
  txIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: BLUE_ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txMeta: {
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
  txCategoryBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 6,
  },
  txDivider: {
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