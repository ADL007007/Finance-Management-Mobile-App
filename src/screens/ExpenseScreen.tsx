import React, { useMemo } from 'react';
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

interface ExpenseEntry {
  id: string;
  month: 'April' | 'March';
  title: string;
  category: string;
  dateLabel: string;
  amount: number;
  icon: 'cart' | 'home' | 'car' | 'fork';
  tint: string;
}

const EXPENSE_ITEMS: ExpenseEntry[] = [
  {
    id: 'exp-1',
    month: 'April',
    title: 'Groceries',
    category: 'Pantry',
    dateLabel: '17:00 - April 24',
    amount: -100.0,
    icon: 'cart',
    tint: '#3299FF',
  },
  {
    id: 'exp-2',
    month: 'April',
    title: 'Rent',
    category: 'Rent',
    dateLabel: '8:30 - April 15',
    amount: -674.4,
    icon: 'home',
    tint: '#0068FF',
  },
  {
    id: 'exp-3',
    month: 'April',
    title: 'Transport',
    category: 'Fuel',
    dateLabel: '7:30 - April 08',
    amount: -4.13,
    icon: 'car',
    tint: '#3299FF',
  },
  {
    id: 'exp-4',
    month: 'March',
    title: 'Food',
    category: 'Dinner',
    dateLabel: '19:30 - March 31',
    amount: -70.4,
    icon: 'fork',
    tint: '#6DB6FE',
  },
  {
    id: 'exp-5',
    month: 'March',
    title: 'Rent',
    category: 'Rent',
    dateLabel: '18:39 - March 31',
    amount: -674.4,
    icon: 'home',
    tint: '#0068FF',
  },
];

const MONTHS_ORDER: Array<'April' | 'March'> = ['April', 'March'];

const formatExpenseCurrency = (val: number) =>
  `-$${Math.abs(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export function ExpenseScreen() {
  const groupedExpense = useMemo(() => {
    return MONTHS_ORDER.map((month) => ({
      month,
      items: EXPENSE_ITEMS.filter((item) => item.month === month),
    })).filter((group) => group.items.length > 0);
  }, []);

  const renderIcon = (icon: ExpenseEntry['icon']) => {
    switch (icon) {
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
    }
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

        <Pressable
          onPress={() => router.push('/transactions')}
          style={styles.balanceBanner}
        >
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$7,783.00</Text>
        </Pressable>

        <View style={styles.summaryCardsRow}>
          <Pressable
            onPress={() => router.push('/income')}
            style={styles.summaryCard}
          >
            <View style={styles.inactiveIconBadge}>
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={18}
                color="#0068FF"
              />
            </View>
            <Text style={styles.inactiveCardTitle}>Income</Text>
            <Text style={styles.incomeCardAmount}>$4,120.00</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/expense')}
            style={[styles.summaryCard, styles.expenseCardActive]}
          >
            <View style={styles.activeIconBadge}>
              <MaterialCommunityIcons
                name="arrow-bottom-left"
                size={18}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.activeCardTitle}>Expense</Text>
            <Text style={styles.activeCardAmount}>$1,187.40</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.contentSheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {groupedExpense.map((group, idx) => (
            <View key={group.month} style={styles.monthSection}>
              <View style={styles.monthHeaderRow}>
                <Text style={styles.monthTitle}>{group.month}</Text>
                {idx === 0 && (
                  <Pressable
                    onPress={() => router.push('/calendar')}
                    style={styles.calendarButton}
                    accessibilityLabel="Open calendar"
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#093030"
                    />
                  </Pressable>
                )}
              </View>

              <View style={styles.itemsList}>
                {group.items.map((item) => (
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

                    <Text style={styles.txAmount}>
                      {formatExpenseCurrency(item.amount)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
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
  summaryCardsRow: {
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
  expenseCardActive: {
    backgroundColor: '#0068FF',
  },
  activeIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  inactiveIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#0068FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activeCardAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  inactiveCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 2,
  },
  incomeCardAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#093030',
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
    minHeight: 30,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  calendarButton: {
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
    color: '#3299FF',
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
    color: '#3299FF',
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