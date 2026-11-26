import React, { useMemo, useState } from 'react';
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
import { router } from 'expo-router';

type ReportType = 'Income' | 'Expense';

interface TransactionItem {
  id: string;
  title: string;
  category: string;
  dateLabel: string;
  timeAndDate: string;
  amount: number;
  type: ReportType;
}

const CATEGORIES = [
  'All Categories',
  'Food & Dining',
  'Transport',
  'Shopping',
  'Salary & Freelance',
  'Utilities',
];

const DATE_PRESETS = [
  '30 /APR/2023',
  '15 /MAY/2023',
  '01 /JUN/2023',
  'All Dates',
];

const MOCK_TRANSACTIONS: TransactionItem[] = [
  {
    id: '1',
    title: 'Dinner',
    category: 'Food & Dining',
    dateLabel: '30 /APR/2023',
    timeAndDate: '18:27 - April 30',
    amount: -26.0,
    type: 'Expense',
  },
  {
    id: '2',
    title: 'Groceries Market',
    category: 'Food & Dining',
    dateLabel: '30 /APR/2023',
    timeAndDate: '14:10 - April 30',
    amount: -84.5,
    type: 'Expense',
  },
  {
    id: '3',
    title: 'Client UI Sprint',
    category: 'Salary & Freelance',
    dateLabel: '30 /APR/2023',
    timeAndDate: '10:00 - April 30',
    amount: 1450.0,
    type: 'Income',
  },
  {
    id: '4',
    title: 'Metro Pass',
    category: 'Transport',
    dateLabel: '15 /MAY/2023',
    timeAndDate: '08:45 - May 15',
    amount: -32.0,
    type: 'Expense',
  },
  {
    id: '5',
    title: 'Monthly Bonus',
    category: 'Salary & Freelance',
    dateLabel: '01 /JUN/2023',
    timeAndDate: '09:15 - June 1',
    amount: 650.0,
    type: 'Income',
  },
];

export function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('30 /APR/2023');
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('Expense');
  const [hasSearched, setHasSearched] = useState(false);

  const filteredResults = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((item) => {
      const matchesQuery =
        searchQuery.trim().length === 0 ||
        item.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.trim().toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' ||
        item.category === selectedCategory;

      const matchesDate =
        selectedDate === 'All Dates' || item.dateLabel === selectedDate;

      const matchesReport = item.type === reportType;

      return matchesQuery && matchesCategory && matchesDate && matchesReport;
    });
  }, [searchQuery, selectedCategory, selectedDate, reportType]);

  const handleSearchPress = () => {
    setCategoryMenuOpen(false);
    setDateMenuOpen(false);
    setHasSearched(true);
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

          <Text style={styles.headerTitle}>Search</Text>

          <Pressable
            onPress={() => router.push('/notifications')}
            style={styles.bellButton}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#093030" />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        <View style={styles.searchInputWrapper}>
          <TextInput
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setHasSearched(true);
            }}
            placeholder="Search..."
            placeholderTextColor="#7A8F8A"
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={handleSearchPress}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              accessibilityLabel="Clear search"
            >
              <Ionicons name="close-circle" size={18} color="#7A8F8A" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.contentSheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Categories</Text>
            <Pressable
              onPress={() => {
                setCategoryMenuOpen((prev) => !prev);
                setDateMenuOpen(false);
              }}
              style={styles.dropdownField}
            >
              <Text
                style={[
                  styles.dropdownValueText,
                  selectedCategory === 'All Categories' &&
                    styles.dropdownPlaceholder,
                ]}
              >
                {selectedCategory === 'All Categories'
                  ? 'Select the category'
                  : selectedCategory}
              </Text>
              <Ionicons
                name={categoryMenuOpen ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#00D09E"
              />
            </Pressable>

            {categoryMenuOpen && (
              <View style={styles.dropdownMenu}>
                {CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat}
                    onPress={() => {
                      setSelectedCategory(cat);
                      setCategoryMenuOpen(false);
                      setHasSearched(true);
                    }}
                    style={[
                      styles.dropdownMenuItem,
                      selectedCategory === cat && styles.dropdownMenuItemActive,
                    ]}
                  >
                    <Text style={styles.dropdownMenuItemText}>{cat}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Date</Text>
            <Pressable
              onPress={() => {
                setDateMenuOpen((prev) => !prev);
                setCategoryMenuOpen(false);
              }}
              style={styles.dropdownField}
            >
              <Text style={styles.dropdownValueText}>{selectedDate}</Text>
              <Ionicons name="calendar-outline" size={18} color="#00D09E" />
            </Pressable>

            {dateMenuOpen && (
              <View style={styles.dropdownMenu}>
                {DATE_PRESETS.map((datePreset) => (
                  <Pressable
                    key={datePreset}
                    onPress={() => {
                      setSelectedDate(datePreset);
                      setDateMenuOpen(false);
                      setHasSearched(true);
                    }}
                    style={[
                      styles.dropdownMenuItem,
                      selectedDate === datePreset &&
                        styles.dropdownMenuItemActive,
                    ]}
                  >
                    <Text style={styles.dropdownMenuItemText}>{datePreset}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Report</Text>
            <View style={styles.radioRow}>
              {(['Income', 'Expense'] as ReportType[]).map((type) => {
                const isSelected = reportType === type;
                return (
                  <Pressable
                    key={type}
                    onPress={() => {
                      setReportType(type);
                      setHasSearched(true);
                    }}
                    style={styles.radioOption}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterActive,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.radioLabel}>{type}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            onPress={handleSearchPress}
            style={({ pressed }) => [
              styles.searchButton,
              pressed && styles.searchButtonPressed,
            ]}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>

          {hasSearched && (
            <View style={styles.resultsSection}>
              {filteredResults.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyText}>
                    No {reportType.toLowerCase()} items match your filters.
                  </Text>
                </View>
              ) : (
                filteredResults.map((tx) => {
                  const isIncome = tx.type === 'Income';
                  const formattedAmount = isIncome
                    ? `+$${tx.amount.toFixed(2)}`
                    : `-$${Math.abs(tx.amount).toFixed(2)}`;

                  return (
                    <Pressable
                      key={tx.id}
                      onPress={() => router.push('/transactions')}
                      style={styles.resultRowCard}
                    >
                      <View style={styles.resultIconTile}>
                        <MaterialCommunityIcons
                          name={isIncome ? 'cash-plus' : 'silverware-fork-knife'}
                          size={20}
                          color="#FFFFFF"
                        />
                      </View>

                      <View style={styles.resultInfo}>
                        <Text style={styles.resultTitle}>{tx.title}</Text>
                        <Text style={styles.resultSubtitle}>
                          {tx.timeAndDate}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.resultAmount,
                          isIncome
                            ? styles.resultAmountIncome
                            : styles.resultAmountExpense,
                        ]}
                      >
                        {formattedAmount}
                      </Text>
                    </Pressable>
                  );
                })
              )}
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
  searchInputWrapper: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#093030',
    paddingVertical: 0,
  },
  contentSheet: {
    flex: 1,
    backgroundColor: '#F4FBF8',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 105,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 8,
  },
  dropdownField: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DFF5EC',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#093030',
  },
  dropdownPlaceholder: {
    color: '#7EA596',
  },
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#DFF5EC',
    shadowColor: '#093030',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  dropdownMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownMenuItemActive: {
    backgroundColor: '#E8FBF4',
  },
  dropdownMenuItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
    marginTop: 4,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#00D09E',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00D09E',
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#093030',
  },
  searchButton: {
    marginTop: 12,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 52,
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  searchButtonPressed: {
    opacity: 0.88,
  },
  searchButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  resultsSection: {
    marginTop: 24,
    gap: 10,
  },
  resultRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5F4EE',
  },
  resultIconTile: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  resultSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0068FF',
    marginTop: 2,
  },
  resultAmount: {
    fontSize: 14,
    fontWeight: '800',
  },
  resultAmountIncome: {
    color: '#00D09E',
  },
  resultAmountExpense: {
    color: '#0068FF',
  },
  emptyCard: {
    backgroundColor: '#EAF7F1',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '500',
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