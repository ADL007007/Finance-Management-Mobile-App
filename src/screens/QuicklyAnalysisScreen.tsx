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

type MonthKey = 'April' | 'May' | 'June';

interface WeeklyBarPoint {
  label: string;
  value: number;
}

interface AnalysisTransaction {
  id: string;
  title: string;
  dateLabel: string;
  category: string;
  amount: number;
  icon: 'cash' | 'cart' | 'home';
}

const CHART_BY_MONTH: Record<MonthKey, WeeklyBarPoint[]> = {
  April: [
    { label: '1st Week', value: 4.5 },
    { label: '2nd Week', value: 8.8 },
    { label: '3rd Week', value: 4.2 },
    { label: '4th Week', value: 9.6 },
  ],
  May: [
    { label: '1st Week', value: 6.2 },
    { label: '2nd Week', value: 7.4 },
    { label: '3rd Week', value: 11.0 },
    { label: '4th Week', value: 8.1 },
  ],
  June: [
    { label: '1st Week', value: 3.8 },
    { label: '2nd Week', value: 9.5 },
    { label: '3rd Week', value: 6.7 },
    { label: '4th Week', value: 12.4 },
  ],
};

const TRANSACTIONS: AnalysisTransaction[] = [
  {
    id: 'a1',
    title: 'Salary',
    dateLabel: '18:27 - April 30',
    category: 'Monthly',
    amount: 4000,
    icon: 'cash',
  },
  {
    id: 'a2',
    title: 'Groceries',
    dateLabel: '17:00 - April 24',
    category: 'Pantry',
    amount: -100,
    icon: 'cart',
  },
  {
    id: 'a3',
    title: 'Rent',
    dateLabel: '8:30 - April 15',
    category: 'Rent',
    amount: -674.4,
    icon: 'home',
  },
];

const MONTHS: MonthKey[] = ['April', 'May', 'June'];
const MAX_SCALE = 15;
const CHART_HEIGHT = 126;

function formatAmount(value: number): string {
  const abs = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `-$${abs}` : `$${abs}`;
}

export function QuicklyAnalysisScreen() {
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);

  const activeMonth = MONTHS[monthIndex];
  const bars = useMemo(() => CHART_BY_MONTH[activeMonth], [activeMonth]);

  const handleCycleMonth = () => {
    setSelectedBarIndex(null);
    setMonthIndex((prev) => (prev + 1) % MONTHS.length);
  };

  const renderTxIcon = (type: AnalysisTransaction['icon']) => {
    switch (type) {
      case 'cash':
        return <MaterialCommunityIcons name="cash-multiple" size={22} color={WHITE} />;
      case 'cart':
        return <Ionicons name="cart-outline" size={20} color={WHITE} />;
      case 'home':
        return <Ionicons name="home-outline" size={20} color={WHITE} />;
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

            <Text style={styles.headerTitle}>Quickly Analysis</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/notifications')}
              style={styles.bellBtn}
            >
              <Ionicons name="notifications-outline" size={18} color={DARK_TEXT} />
            </TouchableOpacity>
          </View>

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
                onPress={() => router.push('/account-balance')}
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
                onPress={() => router.push('/account-balance')}
                style={styles.metricItem}
              >
                <Ionicons name="restaurant-outline" size={22} color={DARK_TEXT} />
                <View>
                  <Text style={styles.metricTitle}>Food Last Week</Text>
                  <Text style={styles.metricNegative}>- $100.00</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.sheetContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>{activeMonth} Expenses</Text>

              <View style={styles.chartActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push('/analytics')}
                  style={styles.chartActionBadge}
                >
                  <Ionicons name="search-outline" size={16} color={DARK_TEXT} />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleCycleMonth}
                  style={styles.chartActionBadge}
                >
                  <Ionicons name="calendar-outline" size={16} color={DARK_TEXT} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.chartBody}>
              <View style={styles.yAxisCol}>
                <Text style={styles.yAxisLabel}>15k</Text>
                <Text style={styles.yAxisLabel}>10k</Text>
                <Text style={styles.yAxisLabel}>5k</Text>
                <Text style={styles.yAxisLabel}>1k</Text>
              </View>

              <View style={styles.plotArea}>
                <View style={styles.gridLines} pointerEvents="none">
                  <View style={styles.gridLine} />
                  <View style={styles.gridLine} />
                  <View style={styles.gridLine} />
                  <View style={styles.gridLine} />
                </View>

                <View style={styles.barsRow}>
                  {bars.map((bar, index) => {
                    const ratio = Math.min(Math.max(bar.value / MAX_SCALE, 0.12), 1);
                    const barHeight = Math.round(ratio * CHART_HEIGHT);
                    const isSelected = selectedBarIndex === index;

                    return (
                      <TouchableOpacity
                        key={bar.label}
                        activeOpacity={0.85}
                        onPress={() =>
                          setSelectedBarIndex((prev) =>
                            prev === index ? null : index
                          )
                        }
                        style={styles.barColumn}
                      >
                        {isSelected ? (
                          <Text style={styles.barTooltip}>${bar.value.toFixed(1)}k</Text>
                        ) : null}
                        <View style={styles.barTrack}>
                          <View
                            style={[
                              styles.barFill,
                              { height: barHeight },
                              isSelected && styles.barFillSelected,
                            ]}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            <View style={styles.xAxisRow}>
              <View style={styles.xAxisSpacer} />
              <View style={styles.xAxisLabels}>
                {bars.map((bar) => (
                  <Text key={bar.label} style={styles.xAxisLabel} numberOfLines={1}>
                    {bar.label}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.txList}>
            {TRANSACTIONS.map((tx) => {
              const isPositive = tx.amount >= 0;
              return (
                <TouchableOpacity
                  key={tx.id}
                  activeOpacity={0.75}
                  onPress={() => router.push('/transactions')}
                  style={styles.txRow}
                >
                  <View style={styles.txLeft}>
                    <View style={styles.txIconBox}>{renderTxIcon(tx.icon)}</View>
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
            style={styles.navActivePill}
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

export default QuicklyAnalysisScreen;

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
  summaryCard: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 6,
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
    gap: 16,
  },
  chartCard: {
    backgroundColor: INPUT_PILL_BG,
    borderRadius: 24,
    padding: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: DARK_TEXT,
  },
  chartActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chartActionBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartBody: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: CHART_HEIGHT,
  },
  yAxisCol: {
    width: 32,
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  yAxisLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: BLUE_ACCENT,
  },
  plotArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#C5E8D4',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: CHART_HEIGHT,
    zIndex: 2,
  },
  barColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  barTooltip: {
    fontSize: 10,
    fontWeight: '700',
    color: DARK_TEXT,
    marginBottom: 3,
  },
  barTrack: {
    width: 10,
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barFill: {
    width: 8,
    borderRadius: 4,
    backgroundColor: PRIMARY_GREEN,
  },
  barFillSelected: {
    backgroundColor: BLUE_ACCENT,
  },
  xAxisRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  xAxisSpacer: {
    width: 32,
  },
  xAxisLabels: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  xAxisLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: DARK_TEXT,
    textAlign: 'center',
    flex: 1,
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
  navActivePill: {
    width: 44,
    height: 40,
    borderRadius: 16,
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
});