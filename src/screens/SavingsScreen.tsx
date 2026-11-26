import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

type GoalIconKey = 'airplane' | 'house' | 'car' | 'rings' | 'piggy';
type DepositMonth =
  | 'November'
  | 'September'
  | 'July'
  | 'May'
  | 'April'
  | 'January';

interface DepositEntry {
  id: string;
  month: DepositMonth;
  title: string;
  dateLabel: string;
  amount: number;
  note?: string;
}

interface SavingGoal {
  id: string;
  name: string;
  badgeLabel: string;
  icon: GoalIconKey;
  goalAmount: number;
  savedAmount: number;
  progressPercent: number;
  defaultDate: string;
  defaultCategory: string;
  defaultAmount: string;
  defaultTitle: string;
  deposits: DepositEntry[];
}

const GOAL_CATEGORY_OPTIONS = [
  'Wedding',
  'Car',
  'House',
  'Travel',
  'Savings',
];

const INITIAL_GOALS: SavingGoal[] = [
  {
    id: 'travel',
    name: 'Travel',
    badgeLabel: 'Travel',
    icon: 'airplane',
    goalAmount: 1962.93,
    savedAmount: 653.31,
    progressPercent: 40,
    defaultDate: 'April 30,2024',
    defaultCategory: 'House',
    defaultAmount: '$217.77',
    defaultTitle: 'Travel Deposit',
    deposits: [
      {
        id: 'tr-1',
        month: 'April',
        title: 'Travel Deposit',
        dateLabel: '19:56 - April 30',
        amount: 217.77,
      },
      {
        id: 'tr-2',
        month: 'April',
        title: 'Travel Deposit',
        dateLabel: '17:42 - April 14',
        amount: 217.77,
      },
      {
        id: 'tr-3',
        month: 'April',
        title: 'Travel Deposit',
        dateLabel: '12:30 - April 02',
        amount: 217.77,
      },
    ],
  },
  {
    id: 'new-house',
    name: 'New House',
    badgeLabel: 'House',
    icon: 'house',
    goalAmount: 569200,
    savedAmount: 625.48,
    progressPercent: 30,
    defaultDate: 'April 5,2024',
    defaultCategory: 'House',
    defaultAmount: '$217.77',
    defaultTitle: 'House Deposit',
    deposits: [
      {
        id: 'nh-1',
        month: 'April',
        title: 'House Deposit',
        dateLabel: '19:56 - April 5',
        amount: 477.77,
      },
      {
        id: 'nh-2',
        month: 'January',
        title: 'House Deposit',
        dateLabel: '20:25 - January 16',
        amount: 102.67,
      },
      {
        id: 'nh-3',
        month: 'January',
        title: 'House Deposit',
        dateLabel: '15:56 - January 02',
        amount: 45.04,
      },
    ],
  },
  {
    id: 'car',
    name: 'Car',
    badgeLabel: 'Travel',
    icon: 'car',
    goalAmount: 14390,
    savedAmount: 596.25,
    progressPercent: 15,
    defaultDate: 'July 5,2024',
    defaultCategory: 'Car',
    defaultAmount: '$387.32',
    defaultTitle: 'Car Deposit',
    deposits: [
      {
        id: 'c-1',
        month: 'July',
        title: 'Car Deposit',
        dateLabel: '14:16 - July 5',
        amount: 387.32,
      },
      {
        id: 'c-2',
        month: 'May',
        title: 'Car Deposit',
        dateLabel: '21:45 - May 30',
        amount: 122.99,
      },
      {
        id: 'c-3',
        month: 'May',
        title: 'House Deposit',
        dateLabel: '14:25 - May 05',
        amount: 85.94,
      },
    ],
  },
  {
    id: 'wedding',
    name: 'Wedding',
    badgeLabel: 'Wedding',
    icon: 'rings',
    goalAmount: 34700,
    savedAmount: 296.25,
    progressPercent: 10,
    defaultDate: 'November 15,2024',
    defaultCategory: 'Wedding',
    defaultAmount: '$87.32',
    defaultTitle: 'Wedding Deposit',
    deposits: [
      {
        id: 'w-1',
        month: 'November',
        title: 'Wedding Deposit',
        dateLabel: '18:46 - November 15',
        amount: 87.32,
      },
      {
        id: 'w-2',
        month: 'September',
        title: 'Wedding Deposit',
        dateLabel: '21:45 - September 30',
        amount: 22.99,
      },
      {
        id: 'w-3',
        month: 'September',
        title: 'Wedding Deposit',
        dateLabel: '12:25 - September 15',
        amount: 185.94,
      },
    ],
  },
];

const DEPOSIT_MONTHS: DepositMonth[] = [
  'November',
  'September',
  'July',
  'May',
  'April',
  'January',
];

const formatMoney = (val: number) =>
  `$${Math.abs(val).toLocaleString('en-US', {
    minimumFractionDigits: val % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

const formatDepositAmount = (val: number) =>
  `$${Math.abs(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const inferDepositMonth = (dateStr: string): DepositMonth => {
  const lower = dateStr.toLowerCase();
  if (lower.includes('nov')) return 'November';
  if (lower.includes('sep')) return 'September';
  if (lower.includes('jul')) return 'July';
  if (lower.includes('may')) return 'May';
  if (lower.includes('jan')) return 'January';
  return 'April';
};

export function SavingsScreen() {
  const [goals, setGoals] = useState<SavingGoal[]>(INITIAL_GOALS);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [isAddingSaving, setIsAddingSaving] = useState<boolean>(false);

  const [addGoalModalVisible, setAddGoalModalVisible] = useState<boolean>(false);
  const [newGoalName, setNewGoalName] = useState<string>('');
  const [newGoalTarget, setNewGoalTarget] = useState<string>('5000');

  const [dateText, setDateText] = useState<string>('April 30,2024');
  const [categoryText, setCategoryText] = useState<string>('House');
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [amountText, setAmountText] = useState<string>('$217.77');
  const [titleText, setTitleText] = useState<string>('Travel Deposit');
  const [messageText, setMessageText] = useState<string>('');

  const activeGoal = useMemo(
    () => goals.find((g) => g.id === selectedGoalId) ?? null,
    [goals, selectedGoalId]
  );

  const groupedDeposits = useMemo(() => {
    if (!activeGoal) return [];
    return DEPOSIT_MONTHS.map((month) => ({
      month,
      items: activeGoal.deposits.filter((d) => d.month === month),
    })).filter((group) => group.items.length > 0);
  }, [activeGoal]);

  const handleBackPress = () => {
    if (isAddingSaving) {
      setIsAddingSaving(false);
      return;
    }
    if (activeGoal) {
      setSelectedGoalId(null);
      return;
    }
    router.back();
  };

  const handleOpenGoalDetail = (goal: SavingGoal) => {
    setSelectedGoalId(goal.id);
    setIsAddingSaving(false);
  };

  const handleOpenAddSaving = () => {
    if (!activeGoal) return;
    setDateText(activeGoal.defaultDate);
    setCategoryText(activeGoal.defaultCategory);
    setAmountText(activeGoal.defaultAmount);
    setTitleText(activeGoal.defaultTitle);
    setMessageText('');
    setPickerOpen(false);
    setIsAddingSaving(true);
  };

  const handleSaveDeposit = () => {
    if (!activeGoal) return;
    const parsed = parseFloat(
      amountText.replace(/[^0-9.,]/g, '').replace(',', '.')
    );
    const depositValue = Number.isNaN(parsed) ? 217.77 : Math.abs(parsed);
    const targetMonth = inferDepositMonth(dateText);
    const shortDate = dateText.split(',')[0]?.trim() || `${targetMonth} 30`;

    const newDeposit: DepositEntry = {
      id: `dep-${Date.now()}`,
      month: targetMonth,
      title: titleText.trim() || `${activeGoal.name} Deposit`,
      dateLabel: `18:46 - ${shortDate}`,
      amount: depositValue,
      note: messageText.trim() || undefined,
    };

    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== activeGoal.id) return goal;
        const nextSaved = Number((goal.savedAmount + depositValue).toFixed(2));
        const nextPercent = Math.min(
          100,
          Math.max(
            goal.progressPercent,
            Math.round((nextSaved / Math.max(1, goal.goalAmount)) * 100) ||
              goal.progressPercent
          )
        );
        return {
          ...goal,
          savedAmount: nextSaved,
          progressPercent: nextPercent,
          deposits: [newDeposit, ...goal.deposits],
        };
      })
    );

    setIsAddingSaving(false);
  };

  const handleCreateGoal = () => {
    const trimmedName = newGoalName.trim();
    if (!trimmedName) return;
    const parsedGoal = parseFloat(
      newGoalTarget.replace(/[^0-9.,]/g, '').replace(',', '.')
    );
    const targetValue =
      Number.isNaN(parsedGoal) || parsedGoal <= 0 ? 5000 : parsedGoal;

    const created: SavingGoal = {
      id: `goal-${Date.now()}`,
      name: trimmedName,
      badgeLabel: trimmedName,
      icon: 'piggy',
      goalAmount: targetValue,
      savedAmount: 0,
      progressPercent: 15,
      defaultDate: 'April 30,2024',
      defaultCategory: 'House',
      defaultAmount: '$150.00',
      defaultTitle: `${trimmedName} Deposit`,
      deposits: [
        {
          id: `init-${Date.now()}`,
          month: 'April',
          title: `${trimmedName} Deposit`,
          dateLabel: '18:00 - April 30',
          amount: 150.0,
        },
      ],
    };

    setGoals((prev) => [...prev, created]);
    setNewGoalName('');
    setNewGoalTarget('5000');
    setAddGoalModalVisible(false);
    setSelectedGoalId(created.id);
  };

  const renderGoalIcon = (icon: GoalIconKey, size: number, color: string) => {
    switch (icon) {
      case 'airplane':
        return <Ionicons name="airplane" size={size} color={color} />;
      case 'house':
        return <Ionicons name="home" size={size} color={color} />;
      case 'car':
        return <Ionicons name="car-sport" size={size} color={color} />;
      case 'rings':
        return <MaterialCommunityIcons name="ring" size={size} color={color} />;
      case 'piggy':
      default:
        return (
          <MaterialCommunityIcons
            name="piggy-bank-outline"
            size={size}
            color={color}
          />
        );
    }
  };

  const headerTitle = isAddingSaving
    ? 'Add Savings'
    : activeGoal
    ? activeGoal.name
    : 'Savings';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={handleBackPress}
            style={styles.iconButton}
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </Pressable>

          <Text style={styles.headerTitle}>{headerTitle}</Text>

          <Pressable
            onPress={() => router.push('/notifications')}
            style={styles.bellButton}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#093030" />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        {!activeGoal && !isAddingSaving && (
          <>
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
                <Text
                  style={styles.balanceValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
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
          </>
        )}
      </View>

      <View style={styles.contentSheet}>
        {isAddingSaving && activeGoal ? (
          <ScrollView
            contentContainerStyle={styles.formScrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Date</Text>
              <View style={styles.formInputPill}>
                <TextInput
                  value={dateText}
                  onChangeText={setDateText}
                  style={styles.formInputFlex}
                  placeholderTextColor="#7A8F8A"
                />
                <Pressable
                  onPress={() => router.push('/calendar')}
                  accessibilityLabel="Select date"
                >
                  <Ionicons name="calendar-outline" size={18} color="#00D09E" />
                </Pressable>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Category</Text>
              <Pressable
                onPress={() => setPickerOpen((prev) => !prev)}
                style={styles.formInputPill}
              >
                <Text style={styles.formInputValue}>{categoryText}</Text>
                <Ionicons
                  name={pickerOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#00D09E"
                />
              </Pressable>

              {pickerOpen && (
                <View style={styles.pickerDropdown}>
                  {GOAL_CATEGORY_OPTIONS.map((opt) => (
                    <Pressable
                      key={opt}
                      onPress={() => {
                        setCategoryText(opt);
                        setPickerOpen(false);
                      }}
                      style={styles.pickerOption}
                    >
                      <Text style={styles.pickerOptionText}>{opt}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Amount</Text>
              <View style={styles.formInputPill}>
                <TextInput
                  value={amountText}
                  onChangeText={setAmountText}
                  keyboardType="decimal-pad"
                  style={styles.formInputFlex}
                  placeholder="$0.00"
                  placeholderTextColor="#7A8F8A"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Expense Title</Text>
              <View style={styles.formInputPill}>
                <TextInput
                  value={titleText}
                  onChangeText={setTitleText}
                  style={styles.formInputFlex}
                  placeholder="Deposit title..."
                  placeholderTextColor="#7A8F8A"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <TextInput
                value={messageText}
                onChangeText={setMessageText}
                placeholder="Enter Message"
                placeholderTextColor="#00D09E"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={styles.messageBox}
              />
            </View>

            <Pressable
              onPress={handleSaveDeposit}
              style={({ pressed }) => [
                styles.ctaButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.ctaButtonText}>Save</Text>
            </Pressable>
          </ScrollView>
        ) : activeGoal ? (
          <ScrollView
            contentContainerStyle={styles.detailScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.goalHeroRow}>
              <View style={styles.goalStatsCol}>
                <View style={styles.goalStatItem}>
                  <View style={styles.goalStatIconWrap}>
                    <MaterialCommunityIcons
                      name="cash-multiple"
                      size={15}
                      color="#093030"
                    />
                  </View>
                  <View>
                    <Text style={styles.goalStatLabel}>Goal</Text>
                    <Text style={styles.goalTargetAmount}>
                      {formatMoney(activeGoal.goalAmount)}
                    </Text>
                  </View>
                </View>

                <View style={styles.goalStatItem}>
                  <View style={styles.goalStatIconWrap}>
                    <MaterialCommunityIcons
                      name="piggy-bank-outline"
                      size={15}
                      color="#093030"
                    />
                  </View>
                  <View>
                    <Text style={styles.goalStatLabel}>Amount Saved</Text>
                    <Text style={styles.goalSavedAmount}>
                      {formatDepositAmount(activeGoal.savedAmount)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.goalCircleCard}>
                <View style={styles.goalCircleRing}>
                  {renderGoalIcon(activeGoal.icon, 34, '#FFFFFF')}
                </View>
                <Text style={styles.goalCircleCaption} numberOfLines={1}>
                  {activeGoal.badgeLabel}
                </Text>
              </View>
            </View>

            <View style={styles.goalProgressBlock}>
              <View style={styles.goalProgressTrack}>
                <View
                  style={[
                    styles.goalProgressFill,
                    { width: `${activeGoal.progressPercent}%` },
                  ]}
                >
                  <Text style={styles.goalProgressFillText}>
                    {activeGoal.progressPercent}%
                  </Text>
                </View>
                <Text style={styles.goalProgressRightText}>
                  {formatDepositAmount(activeGoal.goalAmount)}
                </Text>
              </View>

              <View style={styles.statusRow}>
                <Ionicons name="checkmark-circle" size={16} color="#093030" />
                <Text style={styles.statusText}>
                  30% Of Your Expenses, Looks Good.
                </Text>
              </View>
            </View>

            {groupedDeposits.map((group, gIdx) => (
              <View key={group.month} style={styles.monthSection}>
                <View style={styles.monthHeaderRow}>
                  <Text style={styles.monthTitle}>{group.month}</Text>
                  {gIdx === 0 && (
                    <Pressable
                      onPress={() => router.push('/calendar')}
                      style={styles.calendarBadge}
                      accessibilityLabel="Calendar"
                    >
                      <Ionicons
                        name="calendar-outline"
                        size={16}
                        color="#093030"
                      />
                    </Pressable>
                  )}
                </View>

                <View style={styles.depositsList}>
                  {group.items.map((dep) => (
                    <View key={dep.id} style={styles.depositRow}>
                      <View style={styles.depositIconBox}>
                        {renderGoalIcon(activeGoal.icon, 20, '#FFFFFF')}
                      </View>
                      <View style={styles.depositTextCol}>
                        <Text style={styles.depositTitle}>{dep.title}</Text>
                        <Text style={styles.depositDate}>{dep.dateLabel}</Text>
                      </View>
                      <Text style={styles.depositAmount}>
                        {formatDepositAmount(dep.amount)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <Pressable
              onPress={handleOpenAddSaving}
              style={({ pressed }) => [
                styles.ctaButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.ctaButtonText}>Add Savings</Text>
            </Pressable>
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.gridScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.goalsGrid}>
              {goals.map((goal) => (
                <Pressable
                  key={goal.id}
                  onPress={() => handleOpenGoalDetail(goal)}
                  style={styles.goalTile}
                >
                  <View
                    style={[
                      styles.goalTileBox,
                      goal.id === 'travel'
                        ? styles.goalTileActive
                        : styles.goalTileDefault,
                    ]}
                  >
                    {renderGoalIcon(goal.icon, 30, '#FFFFFF')}
                  </View>
                  <Text style={styles.goalTileLabel} numberOfLines={1}>
                    {goal.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={() => setAddGoalModalVisible(true)}
              style={({ pressed }) => [
                styles.ctaButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.ctaButtonText}>Add More</Text>
            </Pressable>
          </ScrollView>
        )}

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
              style={styles.navItem}
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
              style={[styles.navItem, styles.navItemActive]}
              accessibilityLabel="Categories"
            >
              <Ionicons name="layers" size={22} color="#093030" />
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

      <Modal
        visible={addGoalModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddGoalModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Saving Goal</Text>
            <TextInput
              value={newGoalName}
              onChangeText={setNewGoalName}
              placeholder="Goal title (e.g. Vacation)"
              placeholderTextColor="#7A8F8A"
              style={styles.modalInput}
              autoFocus
            />
            <TextInput
              value={newGoalTarget}
              onChangeText={setNewGoalTarget}
              placeholder="Target amount (e.g. 5000)"
              placeholderTextColor="#7A8F8A"
              keyboardType="decimal-pad"
              style={styles.modalInput}
            />
            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setAddGoalModalVisible(false)}
                style={styles.modalCancelBtn}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleCreateGoal}
                style={styles.modalConfirmBtn}
              >
                <Text style={styles.modalConfirmText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#F1FFF3',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: 'hidden',
  },
  gridScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 115,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 28,
  },
  goalTile: {
    width: '30%',
    alignItems: 'center',
  },
  goalTileBox: {
    width: 82,
    height: 78,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  goalTileActive: {
    backgroundColor: '#0068FF',
  },
  goalTileDefault: {
    backgroundColor: '#6DB6FE',
  },
  goalTileLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    textAlign: 'center',
  },
  detailScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 115,
  },
  goalHeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  goalStatsCol: {
    flex: 1,
    gap: 12,
    marginRight: 14,
  },
  goalStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  goalStatIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#D6F5E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalStatLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#093030',
  },
  goalTargetAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#093030',
  },
  goalSavedAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0068FF',
  },
  goalCircleCard: {
    width: 112,
    height: 112,
    borderRadius: 24,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  goalCircleRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  goalCircleCaption: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goalProgressBlock: {
    gap: 8,
    marginBottom: 20,
  },
  goalProgressTrack: {
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DFF5EC',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingRight: 12,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#093030',
    borderRadius: 11,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  goalProgressFillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goalProgressRightText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00D09E',
    marginLeft: 'auto',
  },
  monthSection: {
    marginBottom: 16,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    minHeight: 30,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  calendarBadge: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  depositsList: {
    gap: 10,
  },
  depositRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E3F4EC',
  },
  depositIconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  depositTextCol: {
    flex: 1,
  },
  depositTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  depositDate: {
    fontSize: 11,
    fontWeight: '500',
    color: '#3299FF',
    marginTop: 2,
  },
  depositAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#093030',
  },
  formScrollContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 115,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 8,
  },
  formInputPill: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DFF5EC',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formInputFlex: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#093030',
    paddingVertical: 0,
  },
  formInputValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#093030',
  },
  pickerDropdown: {
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D7EFE4',
    paddingVertical: 4,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  pickerOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
  },
  messageBox: {
    minHeight: 104,
    borderRadius: 20,
    backgroundColor: '#DFF5EC',
    padding: 16,
    fontSize: 14,
    color: '#093030',
  },
  ctaButton: {
    marginTop: 8,
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 42,
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  buttonPressed: {
    opacity: 0.88,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(3, 19, 20, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#093030',
  },
  modalInput: {
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F1FFF3',
    borderWidth: 1,
    borderColor: '#CBEBD9',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#093030',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 4,
  },
  modalCancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#E6F7F0',
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
  },
  modalConfirmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#00D09E',
  },
  modalConfirmText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#093030',
  },
});