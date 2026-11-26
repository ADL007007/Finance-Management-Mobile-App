import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export type PeriodKey = 'Daily' | 'Weekly' | 'Monthly' | 'Year';

interface BarDatum {
  label: string;
  income: number;
  expense: number;
}

interface PeriodConfig {
  incomeTotal: number;
  expenseTotal: number;
  targetTitle: string;
  targetProgress: string;
  bars: BarDatum[];
}

interface AnalysisScreenProps {
  initialPeriod?: PeriodKey;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_HEIGHT = 140;

const PERIOD_DATA: Record<PeriodKey, PeriodConfig> = {
  Daily: {
    incomeTotal: 4120.0,
    expenseTotal: 1187.4,
    targetTitle: 'Daily Spending Limit',
    targetProgress: '$169.60 / $250.00',
    bars: [
      { label: 'Mon', income: 520, expense: 290 },
      { label: 'Tue', income: 640, expense: 310 },
      { label: 'Wed', income: 480, expense: 190 },
      { label: 'Thu', income: 790, expense: 420 },
      { label: 'Fri', income: 690, expense: 240 },
      { label: 'Sat', income: 560, expense: 180 },
      { label: 'Sun', income: 440, expense: 150 },
    ],
  },
  Weekly: {
    incomeTotal: 11420.0,
    expenseTotal: 20000.2,
    targetTitle: 'Weekly Savings Goal',
    targetProgress: '$1,850 / $2,500',
    bars: [
      { label: '1st Week', income: 2900, expense: 4800 },
      { label: '2nd Week', income: 3400, expense: 5600 },
      { label: '3rd Week', income: 2520, expense: 4900 },
      { label: '4th Week', income: 2600, expense: 4700 },
    ],
  },
  Monthly: {
    incomeTotal: 47200.0,
    expenseTotal: 35300.2,
    targetTitle: 'Monthly Investment',
    targetProgress: '$6,450 / $10,000',
    bars: [
      { label: 'Jan', income: 7800, expense: 5400 },
      { label: 'Feb', income: 8200, expense: 6100 },
      { label: 'Mar', income: 7400, expense: 5800 },
      { label: 'Apr', income: 8600, expense: 6200 },
      { label: 'May', income: 7900, expense: 5700 },
      { label: 'Jun', income: 7300, expense: 6100 },
    ],
  },
  Year: {
    incomeTotal: 430560.0,
    expenseTotal: 320300.0,
    targetTitle: 'Annual Net Worth Goal',
    targetProgress: '$110,260 / $150,000',
    bars: [
      { label: '2019', income: 68000, expense: 52000 },
      { label: '2020', income: 74000, expense: 58000 },
      { label: '2021', income: 86000, expense: 64000 },
      { label: '2022', income: 98000, expense: 71000 },
      { label: '2023', income: 104560, expense: 75300 },
    ],
  },
};

const PERIODS: PeriodKey[] = ['Daily', 'Weekly', 'Monthly', 'Year'];

const formatCurrency = (val: number, withDecimals = true) =>
  '$' +
  val.toLocaleString('en-US', {
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  });

const formatAxisValue = (val: number) => {
  if (val === 0) return '0';
  if (val >= 1000) {
    const kVal = val / 1000;
    return `${Number.isInteger(kVal) ? kVal : kVal.toFixed(1)}k`;
  }
  return `${Math.round(val)}`;
};

export function AnalysisScreen({ initialPeriod = 'Daily' }: AnalysisScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>(initialPeriod);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const [chartMode, setChartMode] = useState<'bars' | 'trend'>('bars');

  const currentData = PERIOD_DATA[selectedPeriod];
  const barWidth = Math.max(
    5,
    Math.min(10, Math.floor((SCREEN_WIDTH - 135) / (currentData.bars.length * 2.4)))
  );

  const maxBarValue = useMemo(() => {
    const rawMax = Math.max(
      ...currentData.bars.flatMap((b) => [b.income, b.expense]),
      100
    );
    return Math.ceil(rawMax * 1.15);
  }, [currentData]);

  const yAxisTicks = useMemo(
    () => [
      maxBarValue,
      Math.round(maxBarValue * 0.75),
      Math.round(maxBarValue * 0.5),
      Math.round(maxBarValue * 0.25),
      0,
    ],
    [maxBarValue]
  );

  const handleSelectPeriod = (period: PeriodKey) => {
    setSelectedPeriod(period);
    setActiveBarIndex(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topHeaderSection}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.iconButton}
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </Pressable>

          <Text style={styles.headerTitle}>Analysis</Text>

          <Pressable
            onPress={() => router.push('/notifications')}
            style={styles.bellButton}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#093030" />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        <View style={styles.summaryTopRow}>
          <View style={styles.summaryColumn}>
            <View style={styles.summaryLabelRow}>
              <View style={styles.miniBadge}>
                <MaterialCommunityIcons
                  name="checkbox-marked"
                  size={12}
                  color="#093030"
                />
              </View>
              <Text style={styles.summaryLabel}>Total Balance</Text>
            </View>
            <Text style={styles.balanceValue} numberOfLines={1} adjustsFontSizeToFit>
              $7,783.00
            </Text>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.summaryColumn}>
            <View style={styles.summaryLabelRow}>
              <View style={styles.miniBadge}>
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={12}
                  color="#093030"
                />
              </View>
              <Text style={styles.summaryLabel}>Total Expense</Text>
            </View>
            <Text
              style={styles.expenseHeaderValue}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              -$1,187.40
            </Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '30%' }]}>
              <Text style={styles.progressFillText}>30%</Text>
            </View>
            <Text style={styles.progressGoalText}>$20,000.00</Text>
          </View>

          <View style={styles.statusRow}>
            <Ionicons name="checkmark-circle" size={16} color="#093030" />
            <Text style={styles.statusText}>
              30% Of Your Expenses, Looks Good.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.contentSheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.segmentedContainer}>
            {PERIODS.map((period) => {
              const isActive = selectedPeriod === period;
              return (
                <Pressable
                  key={period}
                  onPress={() => handleSelectPeriod(period)}
                  style={[
                    styles.segmentTab,
                    isActive && styles.segmentTabActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      isActive && styles.segmentTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Income &amp; Expenses</Text>
              <View style={styles.chartActionsRow}>
                <Pressable
                  onPress={() =>
                    setChartMode((prev) => (prev === 'bars' ? 'trend' : 'bars'))
                  }
                  style={[
                    styles.chartActionBtn,
                    chartMode === 'trend' && styles.chartActionBtnActive,
                  ]}
                  accessibilityLabel="Toggle chart mode"
                >
                  <Ionicons
                    name="analytics-outline"
                    size={16}
                    color={chartMode === 'trend' ? '#FFFFFF' : '#093030'}
                  />
                </Pressable>

                <Pressable
                  onPress={() => router.push('/search')}
                  style={styles.chartActionBtn}
                  accessibilityLabel="Search transactions"
                >
                  <Ionicons name="search-outline" size={16} color="#093030" />
                </Pressable>
              </View>
            </View>

            {activeBarIndex !== null && currentData.bars[activeBarIndex] && (
              <View style={styles.tooltipBanner}>
                <Text style={styles.tooltipTitle}>
                  {currentData.bars[activeBarIndex].label}:
                </Text>
                <Text style={styles.tooltipIncome}>
                  In {formatCurrency(currentData.bars[activeBarIndex].income, false)}
                </Text>
                <Text style={styles.tooltipExpense}>
                  Out {formatCurrency(currentData.bars[activeBarIndex].expense, false)}
                </Text>
              </View>
            )}

            <View style={styles.chartBody}>
              <View style={styles.yAxisColumn}>
                {yAxisTicks.map((tick, idx) => (
                  <Text key={`${tick}-${idx}`} style={styles.yAxisText}>
                    {formatAxisValue(tick)}
                  </Text>
                ))}
              </View>

              <View style={styles.barsArea}>
                <View style={styles.gridLinesOverlay} pointerEvents="none">
                  {yAxisTicks.map((_, idx) => (
                    <View key={`grid-${idx}`} style={styles.gridLine} />
                  ))}
                </View>

                <View style={styles.barsRow}>
                  {currentData.bars.map((item, index) => {
                    const incomeHeight = Math.max(
                      6,
                      Math.round((item.income / maxBarValue) * CHART_HEIGHT)
                    );
                    const expenseHeight = Math.max(
                      6,
                      Math.round((item.expense / maxBarValue) * CHART_HEIGHT)
                    );
                    const isSelected = activeBarIndex === index;

                    return (
                      <Pressable
                        key={item.label}
                        onPress={() =>
                          setActiveBarIndex((prev) =>
                            prev === index ? null : index
                          )
                        }
                        style={[
                          styles.barGroupTouchable,
                          isSelected && styles.barGroupSelected,
                        ]}
                      >
                        <View style={styles.pairBarsContainer}>
                          <View
                            style={[
                              styles.barItem,
                              styles.incomeBar,
                              {
                                width: barWidth,
                                height:
                                  chartMode === 'trend'
                                    ? Math.round(incomeHeight * 0.85)
                                    : incomeHeight,
                              },
                            ]}
                          />
                          <View
                            style={[
                              styles.barItem,
                              styles.expenseBar,
                              {
                                width: barWidth,
                                height:
                                  chartMode === 'trend'
                                    ? Math.round(expenseHeight * 0.85)
                                    : expenseHeight,
                              },
                            ]}
                          />
                        </View>
                        <Text
                          style={[
                            styles.xAxisLabel,
                            isSelected && styles.xAxisLabelActive,
                          ]}
                          numberOfLines={1}
                        >
                          {item.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomTotalsRow}>
            <Pressable
              onPress={() => router.push('/search')}
              style={styles.totalCard}
            >
              <View style={styles.totalIconBox}>
                <MaterialCommunityIcons
                  name="arrow-bottom-left"
                  size={20}
                  color="#00D09E"
                />
              </View>
              <Text style={styles.totalCardLabel}>Income</Text>
              <Text style={styles.totalIncomeValue} numberOfLines={1} adjustsFontSizeToFit>
                {formatCurrency(currentData.incomeTotal)}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/search')}
              style={styles.totalCard}
            >
              <View style={styles.totalIconBox}>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={20}
                  color="#0068FF"
                />
              </View>
              <Text style={styles.totalCardLabel}>Expense</Text>
              <Text style={styles.totalExpenseValue} numberOfLines={1} adjustsFontSizeToFit>
                {formatCurrency(currentData.expenseTotal)}
              </Text>
            </Pressable>
          </View>

          <View style={styles.targetsSection}>
            <Text style={styles.targetsTitle}>My Targets</Text>
            <View style={styles.targetsPreviewCard}>
              <Text style={styles.targetsSubtitle}>{currentData.targetTitle}</Text>
              <Text style={styles.targetsAmount}>{currentData.targetProgress}</Text>
            </View>
          </View>
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
          <View style={styles.bottomNavBar}>
            <Pressable
              onPress={() => router.replace('/home')}
              style={styles.navItem}
              accessibilityLabel="Home"
            >
              <Ionicons name="home-outline" size={22} color="#093030" />
            </Pressable>

            <Pressable
              onPress={() => {}}
              style={[styles.navItem, styles.navItemActive]}
              accessibilityLabel="Analysis"
            >
              <Ionicons name="stats-chart" size={20} color="#093030" />
            </Pressable>

            <Pressable
              onPress={() => router.replace('/transactions')}
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
              onPress={() => router.replace('/categories')}
              style={styles.navItem}
              accessibilityLabel="Categories"
            >
              <Ionicons name="layers-outline" size={22} color="#093030" />
            </Pressable>

            <Pressable
              onPress={() => router.replace('/profile')}
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
  topHeaderSection: {
    backgroundColor: '#00D09E',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
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
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  summaryColumn: {
    flex: 1,
  },
  summaryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  miniBadge: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#093030',
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#093030',
  },
  expenseHeaderValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0068FF',
  },
  verticalDivider: {
    width: 1.2,
    height: 38,
    backgroundColor: 'rgba(9, 48, 48, 0.25)',
    marginHorizontal: 14,
  },
  progressSection: {
    gap: 8,
  },
  progressTrack: {
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1FFF9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#093030',
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  progressFillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressGoalText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#093030',
    marginLeft: 'auto',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#093030',
  },
  contentSheet: {
    flex: 1,
    backgroundColor: '#F4FBF8',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 100,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#DFF5EC',
    borderRadius: 18,
    padding: 4,
    marginBottom: 18,
    gap: 4,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentTabActive: {
    backgroundColor: '#00D09E',
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
  },
  segmentTextActive: {
    fontWeight: '700',
  },
  chartCard: {
    backgroundColor: '#EAF7F1',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#093030',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#093030',
  },
  chartActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chartActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartActionBtnActive: {
    backgroundColor: '#093030',
  },
  tooltipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  tooltipTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#093030',
  },
  tooltipIncome: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00D09E',
  },
  tooltipExpense: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0068FF',
  },
  chartBody: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  yAxisColumn: {
    height: CHART_HEIGHT + 22,
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingBottom: 22,
    width: 42,
  },
  yAxisText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#0068FF',
    textAlign: 'right',
  },
  barsArea: {
    flex: 1,
    position: 'relative',
  },
  gridLinesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: CHART_HEIGHT,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: 'rgba(109, 182, 254, 0.25)',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barGroupTouchable: {
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 8,
  },
  barGroupSelected: {
    backgroundColor: 'rgba(0, 208, 158, 0.15)',
  },
  pairBarsContainer: {
    height: CHART_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  barItem: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  incomeBar: {
    backgroundColor: '#00D09E',
  },
  expenseBar: {
    backgroundColor: '#0068FF',
  },
  xAxisLabel: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '500',
    color: '#093030',
  },
  xAxisLabelActive: {
    fontWeight: '800',
    color: '#0068FF',
  },
  bottomTotalsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },
  totalCard: {
    flex: 1,
    backgroundColor: '#F4FBF8',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1F3EB',
  },
  totalIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#E5F7F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  totalCardLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 2,
  },
  totalIncomeValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#093030',
  },
  totalExpenseValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0068FF',
  },
  targetsSection: {
    gap: 8,
  },
  targetsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  targetsPreviewCard: {
    backgroundColor: '#EAF7F1',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  targetsSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
  },
  targetsAmount: {
    fontSize: 13,
    fontWeight: '700',
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