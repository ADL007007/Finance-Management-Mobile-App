import React, { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

type MonthName = 'April' | 'March' | 'February' | 'January';

interface CategoryExpenseItem {
  id: string;
  month: MonthName;
  title: string;
  dateLabel: string;
  amount: number;
  note?: string;
}

const CATEGORY_OPTIONS = [
  'Food',
  'Transport',
  'Medicine',
  'Groceries',
  'Rent',
  'Gifts',
  'Savings',
  'Entertainment',
];

const INITIAL_ITEMS_BY_CATEGORY: Record<string, CategoryExpenseItem[]> = {
  Food: [
    {
      id: 'f-1',
      month: 'April',
      title: 'Dinner',
      dateLabel: '18:27 - April 30',
      amount: -26.0,
    },
    {
      id: 'f-2',
      month: 'April',
      title: 'Delivery Pizza',
      dateLabel: '15:00 - April 24',
      amount: -18.35,
    },
    {
      id: 'f-3',
      month: 'April',
      title: 'Lunch',
      dateLabel: '12:30 - April 15',
      amount: -15.4,
    },
    {
      id: 'f-4',
      month: 'April',
      title: 'Brunch',
      dateLabel: '9:30 - April 08',
      amount: -12.13,
    },
    {
      id: 'f-5',
      month: 'March',
      title: 'Dinner',
      dateLabel: '20:50 - March 31',
      amount: -27.2,
    },
  ],
  Transport: [
    {
      id: 't-1',
      month: 'March',
      title: 'Fuel',
      dateLabel: '18:27 - March 30',
      amount: -38.5,
    },
    {
      id: 't-2',
      month: 'March',
      title: 'Car Parts',
      dateLabel: '15:00 - March 30',
      amount: -64.0,
    },
    {
      id: 't-3',
      month: 'February',
      title: 'New Tires',
      dateLabel: '12:47 - February 10',
      amount: -210.0,
    },
    {
      id: 't-4',
      month: 'February',
      title: 'Car Wash',
      dateLabel: '9:30 - February 09',
      amount: -18.0,
    },
    {
      id: 't-5',
      month: 'February',
      title: 'Public Transport',
      dateLabel: '7:50 - February 01',
      amount: -14.2,
    },
  ],
  Groceries: [
    {
      id: 'g-1',
      month: 'March',
      title: 'Pantry',
      dateLabel: '18:27 - March 10',
      amount: -53.59,
    },
    {
      id: 'g-2',
      month: 'March',
      title: 'Snacks',
      dateLabel: '15:00 - March 01',
      amount: -35.03,
    },
    {
      id: 'g-3',
      month: 'February',
      title: 'Canned Food',
      dateLabel: '10:47 - February 20',
      amount: -11.82,
    },
    {
      id: 'g-4',
      month: 'February',
      title: 'Veggies',
      dateLabel: '7:30 - February 20',
      amount: -14.79,
    },
    {
      id: 'g-5',
      month: 'February',
      title: 'Groceries',
      dateLabel: '18:50 - February 01',
      amount: -175.35,
    },
  ],
  Rent: [
    {
      id: 'r-1',
      month: 'April',
      title: 'Rent',
      dateLabel: '18:27 - April 15',
      amount: -674.4,
    },
    {
      id: 'r-2',
      month: 'March',
      title: 'Rent',
      dateLabel: '15:00 - March 15',
      amount: -674.4,
    },
    {
      id: 'r-3',
      month: 'February',
      title: 'Rent',
      dateLabel: '11:47 - February 15',
      amount: -674.4,
    },
    {
      id: 'r-4',
      month: 'January',
      title: 'Rent',
      dateLabel: '18:50 - January 15',
      amount: -674.4,
    },
  ],
  Gifts: [
    {
      id: 'gf-1',
      month: 'April',
      title: 'Perfume',
      dateLabel: '10:27 - April 28',
      amount: -30.0,
    },
    {
      id: 'gf-2',
      month: 'April',
      title: 'Make-Up',
      dateLabel: '16:28 - April 15',
      amount: -60.35,
    },
    {
      id: 'gf-3',
      month: 'March',
      title: 'Teddy Bear',
      dateLabel: '8:30 - March 10',
      amount: -20.0,
    },
    {
      id: 'gf-4',
      month: 'March',
      title: 'Cooking Lessons',
      dateLabel: '14:24 - March 02',
      amount: -128.0,
    },
    {
      id: 'gf-5',
      month: 'February',
      title: 'Toys For Dani',
      dateLabel: '11:15 - February 18',
      amount: -50.2,
    },
  ],
  Medicine: [
    {
      id: 'm-1',
      month: 'April',
      title: 'Acetaminophen',
      dateLabel: '12:11 - April 30',
      amount: -2.0,
    },
    {
      id: 'm-2',
      month: 'March',
      title: 'Vitamin C',
      dateLabel: '12:30 - March 20',
      amount: -8.2,
    },
    {
      id: 'm-3',
      month: 'March',
      title: 'Muscle Pain Cream',
      dateLabel: '9:30 - March 12',
      amount: -10.13,
    },
    {
      id: 'm-4',
      month: 'February',
      title: 'Aspirin',
      dateLabel: '18:30 - February 02',
      amount: -2.2,
    },
  ],
  Entertainment: [
    {
      id: 'e-1',
      month: 'April',
      title: 'Cinema',
      dateLabel: '20:15 - April 29',
      amount: -30.0,
    },
    {
      id: 'e-2',
      month: 'April',
      title: 'Netflix',
      dateLabel: '16:15 - April 12',
      amount: -12.27,
    },
    {
      id: 'e-3',
      month: 'April',
      title: 'Karaoke',
      dateLabel: '18:00 - April 05',
      amount: -10.0,
    },
    {
      id: 'e-4',
      month: 'March',
      title: 'Video Game',
      dateLabel: '20:50 - March 24',
      amount: -60.2,
    },
    {
      id: 'e-5',
      month: 'March',
      title: 'Netflix',
      dateLabel: '16:15 - March 12',
      amount: -12.27,
    },
  ],
};

const DEFAULT_CATEGORY_ITEMS: CategoryExpenseItem[] = [
  {
    id: 'def-1',
    month: 'April',
    title: 'Weekly Item',
    dateLabel: '16:15 - April 24',
    amount: -45.0,
  },
  {
    id: 'def-2',
    month: 'March',
    title: 'Monthly Charge',
    dateLabel: '11:20 - March 28',
    amount: -82.5,
  },
];

const MONTHS_ORDER: MonthName[] = ['April', 'March', 'February', 'January'];

const formatExpenseAmount = (amount: number) =>
  `-$${Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const inferMonthFromDate = (dateStr: string): MonthName => {
  const lower = dateStr.toLowerCase();
  if (lower.includes('jan')) return 'January';
  if (lower.includes('feb')) return 'February';
  if (lower.includes('mar')) return 'March';
  return 'April';
};

export function CategoryDetailScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const resolvedCategory =
    typeof params.category === 'string' && params.category.trim().length > 0
      ? params.category.trim()
      : 'Food';

  const [currentCategory, setCurrentCategory] =
    useState<string>(resolvedCategory);
  const [items, setItems] = useState<CategoryExpenseItem[]>(
    INITIAL_ITEMS_BY_CATEGORY[resolvedCategory] ?? DEFAULT_CATEGORY_ITEMS
  );

  const [isAddingExpense, setIsAddingExpense] = useState<boolean>(false);
  const [dateText, setDateText] = useState<string>('April 30, 2024');
  const [selectedCategory, setSelectedCategory] =
    useState<string>(resolvedCategory);
  const [categoryPickerOpen, setCategoryPickerOpen] = useState<boolean>(false);
  const [amountText, setAmountText] = useState<string>('$26,00');
  const [titleText, setTitleText] = useState<string>('Dinner');
  const [messageText, setMessageText] = useState<string>('');

  useEffect(() => {
    setCurrentCategory(resolvedCategory);
    setSelectedCategory(resolvedCategory);
    setItems(
      INITIAL_ITEMS_BY_CATEGORY[resolvedCategory] ?? DEFAULT_CATEGORY_ITEMS
    );
    setIsAddingExpense(false);
    setCategoryPickerOpen(false);
  }, [resolvedCategory]);

  const groupedItems = useMemo(() => {
    return MONTHS_ORDER.map((month) => ({
      month,
      list: items.filter((item) => item.month === month),
    })).filter((group) => group.list.length > 0);
  }, [items]);

  const handleOpenAddExpense = () => {
    setSelectedCategory(currentCategory);
    setCategoryPickerOpen(false);
    setMessageText('');

    switch (currentCategory) {
      case 'Groceries':
        setDateText('March 10, 2024');
        setAmountText('$53.59');
        setTitleText('Pantry');
        break;
      case 'Transport':
        setDateText('March 30, 2024');
        setAmountText('$38.50');
        setTitleText('Fuel');
        break;
      case 'Rent':
        setDateText('April 15, 2024');
        setAmountText('$674.40');
        setTitleText('Rent');
        break;
      case 'Gifts':
        setDateText('April 28, 2024');
        setAmountText('$30,00');
        setTitleText('Perfume');
        break;
      case 'Medicine':
        setDateText('April 30, 2024');
        setAmountText('$2,00');
        setTitleText('Acetaminophen');
        break;
      case 'Entertainment':
        setDateText('April 29, 2024');
        setAmountText('30,00');
        setTitleText('Cinema');
        break;
      default:
        setDateText('April 30, 2024');
        setAmountText('$26,00');
        setTitleText('Dinner');
        break;
    }

    setIsAddingExpense(true);
  };

  const handleSaveExpense = () => {
    const cleanedNumber = parseFloat(
      amountText.replace(/[^0-9.,]/g, '').replace(',', '.')
    );
    const validAmount = Number.isNaN(cleanedNumber)
      ? 26.0
      : Math.abs(cleanedNumber);
    const finalTitle = titleText.trim() || selectedCategory;
    const targetMonth = inferMonthFromDate(dateText);
    const shortDate = dateText.split(',')[0]?.trim() || `${targetMonth} 30`;

    const newEntry: CategoryExpenseItem = {
      id: `exp-${Date.now()}`,
      month: targetMonth,
      title: finalTitle,
      dateLabel: `18:30 - ${shortDate}`,
      amount: -validAmount,
      note: messageText.trim() || undefined,
    };

    if (selectedCategory !== currentCategory) {
      setCurrentCategory(selectedCategory);
      const targetList =
        INITIAL_ITEMS_BY_CATEGORY[selectedCategory] ?? DEFAULT_CATEGORY_ITEMS;
      setItems([newEntry, ...targetList]);
    } else {
      setItems((prev) => [newEntry, ...prev]);
    }

    setIsAddingExpense(false);
  };

  const renderCategoryIcon = () => {
    switch (currentCategory.toLowerCase()) {
      case 'transport':
        return <Ionicons name="bus-outline" size={20} color="#FFFFFF" />;
      case 'medicine':
        return <MaterialCommunityIcons name="pill" size={20} color="#FFFFFF" />;
      case 'groceries':
        return <Ionicons name="bag-handle-outline" size={20} color="#FFFFFF" />;
      case 'rent':
        return (
          <MaterialCommunityIcons name="key-variant" size={20} color="#FFFFFF" />
        );
      case 'gifts':
        return <Ionicons name="gift-outline" size={20} color="#FFFFFF" />;
      case 'savings':
        return (
          <MaterialCommunityIcons
            name="piggy-bank-outline"
            size={20}
            color="#FFFFFF"
          />
        );
      case 'entertainment':
        return <Ionicons name="ticket-outline" size={20} color="#FFFFFF" />;
      default:
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
            onPress={() => {
              if (isAddingExpense) {
                setIsAddingExpense(false);
              } else {
                router.back();
              }
            }}
            style={styles.iconButton}
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </Pressable>

          <Text style={styles.headerTitle}>
            {isAddingExpense ? 'Add Expenses' : currentCategory}
          </Text>

          <Pressable
            onPress={() => router.push('/notifications')}
            style={styles.bellButton}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#093030" />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        {!isAddingExpense && (
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
        {isAddingExpense ? (
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
                  accessibilityLabel="Pick date"
                >
                  <Ionicons name="calendar-outline" size={18} color="#00D09E" />
                </Pressable>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Category</Text>
              <Pressable
                onPress={() => setCategoryPickerOpen((prev) => !prev)}
                style={styles.formInputPill}
              >
                <Text style={styles.formInputValue}>{selectedCategory}</Text>
                <Ionicons
                  name={categoryPickerOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#00D09E"
                />
              </Pressable>

              {categoryPickerOpen && (
                <View style={styles.pickerDropdown}>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => {
                        setSelectedCategory(cat);
                        setCategoryPickerOpen(false);
                      }}
                      style={styles.pickerOption}
                    >
                      <Text style={styles.pickerOptionText}>{cat}</Text>
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
                  placeholder="Enter title..."
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
              onPress={handleSaveExpense}
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.primaryButtonPressed,
              ]}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.listScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {groupedItems.map((group, groupIndex) => (
              <View key={group.month} style={styles.monthBlock}>
                <View style={styles.monthHeaderRow}>
                  <Text style={styles.monthLabel}>{group.month}</Text>
                  {groupIndex === 0 && (
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

                <View style={styles.rowsStack}>
                  {group.list.map((entry) => (
                    <View key={entry.id} style={styles.expenseItemRow}>
                      <View style={styles.itemIconTile}>
                        {renderCategoryIcon()}
                      </View>

                      <View style={styles.itemInfoCol}>
                        <Text style={styles.itemTitle}>{entry.title}</Text>
                        <Text style={styles.itemDate}>{entry.dateLabel}</Text>
                      </View>

                      <Text style={styles.itemAmount}>
                        {formatExpenseAmount(entry.amount)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <Pressable
              onPress={handleOpenAddExpense}
              style={({ pressed }) => [
                styles.addExpenseButton,
                pressed && styles.primaryButtonPressed,
              ]}
            >
              <Text style={styles.addExpenseButtonText}>Add Expenses</Text>
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
  listScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 110,
  },
  monthBlock: {
    marginBottom: 18,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    minHeight: 30,
  },
  monthLabel: {
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
  rowsStack: {
    gap: 12,
  },
  expenseItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E3F4EC',
  },
  itemIconTile: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfoCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  itemDate: {
    fontSize: 11,
    fontWeight: '500',
    color: '#3299FF',
    marginTop: 2,
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3299FF',
  },
  addExpenseButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 38,
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  addExpenseButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  formScrollContent: {
    paddingHorizontal: 22,
    paddingTop: 26,
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
  saveButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 56,
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  primaryButtonPressed: {
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
});