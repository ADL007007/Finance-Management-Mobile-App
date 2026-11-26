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

type CalendarTabMode = 'Spends' | 'Categories';

interface CalendarTransaction {
  id: string;
  day: number;
  title: string;
  category: string;
  timeAndDate: string;
  amount: number;
  icon: 'cart' | 'wallet' | 'fork' | 'home';
  tint: string;
}

interface CategoryShare {
  label: string;
  percent: number;
  color: string;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const YEARS = [2023, 2024, 2025, 2026];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CALENDAR_TRANSACTIONS: CalendarTransaction[] = [
  {
    id: '1',
    day: 24,
    title: 'Groceries',
    category: 'Pantry',
    timeAndDate: '17:00 - April 24',
    amount: -100.0,
    icon: 'cart',
    tint: '#6DB6FE',
  },
  {
    id: '2',
    day: 24,
    title: 'Others',
    category: 'Payments',
    timeAndDate: '17:00 - April 24',
    amount: 120.0,
    icon: 'wallet',
    tint: '#3299FF',
  },
  {
    id: '3',
    day: 30,
    title: 'Dinner',
    category: 'Food',
    timeAndDate: '18:27 - April 30',
    amount: -26.0,
    icon: 'fork',
    tint: '#0068FF',
  },
  {
    id: '4',
    day: 12,
    title: 'Rent & Bills',
    category: 'Housing',
    timeAndDate: '11:15 - April 12',
    amount: -450.0,
    icon: 'home',
    tint: '#00D09E',
  },
];

const CATEGORY_SHARES: CategoryShare[] = [
  { label: 'Groceries', percent: 79, color: '#3299FF' },
  { label: 'Others', percent: 10, color: '#6DB6FE' },
  { label: 'Dining', percent: 11, color: '#00D09E' },
];

export function CalendarScreen() {
  const [monthIndex, setMonthIndex] = useState(3);
  const [yearIndex, setYearIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [activeTab, setActiveTab] = useState<CalendarTabMode>('Spends');

  const currentMonth = MONTHS[monthIndex];
  const currentYear = YEARS[yearIndex];

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, monthIndex + 1, 0).getDate();
  }, [currentYear, monthIndex]);

  const leadingEmptySlots = useMemo(() => {
    const jsDay = new Date(currentYear, monthIndex, 1).getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }, [currentYear, monthIndex]);

  const calendarCells = useMemo(() => {
    const cells: Array<{ key: string; day: number | null }> = [];
    for (let i = 0; i < leadingEmptySlots; i += 1) {
      cells.push({ key: `empty-${i}`, day: null });
    }
    for (let d = 1; d <= daysInMonth; d += 1) {
      cells.push({ key: `day-${d}`, day: d });
    }
    return cells;
  }, [daysInMonth, leadingEmptySlots]);

  const visibleTransactions = useMemo(() => {
    const exactDayItems = CALENDAR_TRANSACTIONS.filter(
      (tx) => tx.day === selectedDay
    );
    if (exactDayItems.length > 0) {
      return exactDayItems;
    }
    return CALENDAR_TRANSACTIONS.slice(0, 2);
  }, [selectedDay]);

  const cycleMonth = () => {
    setMonthIndex((prev) => (prev + 1) % MONTHS.length);
    setSelectedDay(1);
  };

  const cycleYear = () => {
    setYearIndex((prev) => (prev + 1) % YEARS.length);
  };

  const renderTxIcon = (icon: CalendarTransaction['icon']) => {
    switch (icon) {
      case 'cart':
        return <Ionicons name="cart-outline" size={20} color="#FFFFFF" />;
      case 'wallet':
        return <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />;
      case 'fork':
        return (
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={20}
            color="#FFFFFF"
          />
        );
      case 'home':
        return <Ionicons name="home-outline" size={20} color="#FFFFFF" />;
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

          <Text style={styles.headerTitle}>Calendar</Text>

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
        >
          <View style={styles.monthYearRow}>
            <Pressable onPress={cycleMonth} style={styles.pickerBadge}>
              <Text style={styles.pickerText}>{currentMonth}</Text>
              <Ionicons name="chevron-down" size={16} color="#093030" />
            </Pressable>

            <Pressable onPress={cycleYear} style={styles.pickerBadge}>
              <Text style={styles.pickerText}>{currentYear}</Text>
              <Ionicons name="chevron-down" size={16} color="#093030" />
            </Pressable>
          </View>

          <View style={styles.weekdaysRow}>
            {WEEKDAYS.map((dayName) => (
              <Text key={dayName} style={styles.weekdayLabel}>
                {dayName}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarCells.map((cell) => {
              if (cell.day === null) {
                return <View key={cell.key} style={styles.dayCell} />;
              }

              const isSelected = cell.day === selectedDay;
              const hasEvent = CALENDAR_TRANSACTIONS.some(
                (t) => t.day === cell.day
              );

              return (
                <Pressable
                  key={cell.key}
                  onPress={() => setSelectedDay(cell.day as number)}
                  style={[
                    styles.dayCell,
                    isSelected && styles.dayCellSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {cell.day}
                  </Text>
                  {hasEvent && !isSelected && <View style={styles.eventDot} />}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.modeTabsRow}>
            {(['Spends', 'Categories'] as CalendarTabMode[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.modeTabButton,
                    isActive && styles.modeTabButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.modeTabText,
                      isActive && styles.modeTabTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {activeTab === 'Spends' ? (
            <View style={styles.spendsList}>
              {visibleTransactions.map((tx) => {
                const isPositive = tx.amount > 0;
                const formattedAmount = isPositive
                  ? `$${tx.amount.toFixed(2)}`
                  : `-$${Math.abs(tx.amount).toFixed(2)}`;

                return (
                  <Pressable
                    key={tx.id}
                    onPress={() => router.push('/transactions')}
                    style={styles.spendCard}
                  >
                    <View
                      style={[
                        styles.spendIconBox,
                        { backgroundColor: tx.tint },
                      ]}
                    >
                      {renderTxIcon(tx.icon)}
                    </View>

                    <View style={styles.spendTitleCol}>
                      <Text style={styles.spendTitle}>{tx.title}</Text>
                      <Text style={styles.spendDate}>{tx.timeAndDate}</Text>
                    </View>

                    <View style={styles.spendCategoryCol}>
                      <Text style={styles.spendCategory}>{tx.category}</Text>
                    </View>

                    <Text
                      style={[
                        styles.spendAmount,
                        isPositive
                          ? styles.spendAmountPositive
                          : styles.spendAmountNegative,
                      ]}
                    >
                      {formattedAmount}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <View style={styles.categoriesChartCard}>
              <View style={styles.pieVisualRow}>
                <View style={styles.pieCircle}>
                  <View style={styles.pieSliceMain}>
                    <Text style={styles.pieSliceLightText}>79%</Text>
                  </View>
                  <View style={styles.pieSliceSide}>
                    <Text style={styles.pieSliceDarkText}>11%</Text>
                  </View>
                  <View style={styles.pieSliceBottom}>
                    <Text style={styles.pieSliceDarkText}>10%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.legendRow}>
                {CATEGORY_SHARES.map((item) => (
                  <View key={item.label} style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendDot,
                        { backgroundColor: item.color },
                      ]}
                    />
                    <Text style={styles.legendText}>
                      {item.label} ({item.percent}%)
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
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
              style={[styles.navItem, styles.navItemActive]}
              accessibilityLabel="Analysis"
            >
              <Ionicons name="stats-chart" size={20} color="#093030" />
            </Pressable>

            <Pressable
              onPress={() => router.push('/transactions')}
              style={styles.navItem}
              accessibilityLabel="Transfers"
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
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 105,
  },
  monthYearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  pickerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#E2F7EB',
  },
  pickerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  weekdaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayLabel: {
    width: '14.2857%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#3299FF',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  dayCell: {
    width: '14.2857%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    position: 'relative',
  },
  dayCellSelected: {
    backgroundColor: '#00D09E',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
  },
  dayTextSelected: {
    color: '#093030',
    fontWeight: '800',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3299FF',
  },
  modeTabsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  modeTabButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 16,
    backgroundColor: '#DFF5EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeTabButtonActive: {
    backgroundColor: '#00D09E',
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
  modeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#093030',
  },
  modeTabTextActive: {
    fontWeight: '700',
  },
  spendsList: {
    gap: 12,
  },
  spendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E3F4EC',
  },
  spendIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  spendTitleCol: {
    flex: 1.25,
  },
  spendTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  spendDate: {
    fontSize: 11,
    fontWeight: '500',
    color: '#3299FF',
    marginTop: 2,
  },
  spendCategoryCol: {
    flex: 0.85,
    alignItems: 'center',
    paddingHorizontal: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DDF0E7',
  },
  spendCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B635D',
  },
  spendAmount: {
    flex: 0.9,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '800',
  },
  spendAmountPositive: {
    color: '#093030',
  },
  spendAmountNegative: {
    color: '#3299FF',
  },
  categoriesChartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3F4EC',
  },
  pieVisualRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  pieCircle: {
    width: 156,
    height: 156,
    borderRadius: 78,
    overflow: 'hidden',
    backgroundColor: '#3299FF',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieSliceMain: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3299FF',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 22,
  },
  pieSliceSide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 78,
    height: 82,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingRight: 10,
  },
  pieSliceBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 78,
    height: 74,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
    paddingRight: 10,
  },
  pieSliceLightText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pieSliceDarkText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#093030',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#093030',
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