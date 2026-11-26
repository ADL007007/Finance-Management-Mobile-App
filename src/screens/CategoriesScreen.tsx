import React, { useState } from 'react';
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

interface CategoryTile {
  id: string;
  label: string;
  icon:
    | 'fork'
    | 'bus'
    | 'pill'
    | 'cart'
    | 'rent'
    | 'gift'
    | 'savings'
    | 'ticket'
    | 'plus';
  isPrimary?: boolean;
}

const INITIAL_CATEGORIES: CategoryTile[] = [
  { id: 'food', label: 'Food', icon: 'fork', isPrimary: true },
  { id: 'transport', label: 'Transport', icon: 'bus' },
  { id: 'medicine', label: 'Medicine', icon: 'pill' },
  { id: 'groceries', label: 'Groceries', icon: 'cart' },
  { id: 'rent', label: 'Rent', icon: 'rent' },
  { id: 'gifts', label: 'Gifts', icon: 'gift' },
  { id: 'savings', label: 'Savings', icon: 'savings' },
  { id: 'entertainment', label: 'Entertainment', icon: 'ticket' },
  { id: 'more', label: 'More', icon: 'plus' },
];

export function CategoriesScreen() {
  const [categories, setCategories] = useState<CategoryTile[]>(INITIAL_CATEGORIES);
  const [selectedId, setSelectedId] = useState<string>('food');
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

 const handleTilePress = (tile: CategoryTile) => {
  if (tile.id === 'more') {
    setNewCategoryName('');
    setModalVisible(true);
    return;
  }

  if (tile.id === 'savings') {
    router.push('/savings');
    return;
  }

  setSelectedId(tile.id);
  router.push({
    pathname: '/category-detail',
    params: { category: tile.label },
  });
};

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    const customTile: CategoryTile = {
      id: `custom-${Date.now()}`,
      label: trimmed,
      icon: 'ticket',
    };

    setCategories((prev) => {
      const moreItem = prev.find((c) => c.id === 'more');
      const withoutMore = prev.filter((c) => c.id !== 'more');
      return moreItem
        ? [...withoutMore, customTile, moreItem]
        : [...withoutMore, customTile];
    });

    setSelectedId(customTile.id);
    setModalVisible(false);
    setNewCategoryName('');
  };

  const renderTileIcon = (icon: CategoryTile['icon'], isActive: boolean) => {
    const color = isActive ? '#FFFFFF' : '#FFFFFF';
    switch (icon) {
      case 'fork':
        return (
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={28}
            color={color}
          />
        );
      case 'bus':
        return <Ionicons name="bus-outline" size={28} color={color} />;
      case 'pill':
        return (
          <MaterialCommunityIcons name="pill" size={28} color={color} />
        );
      case 'cart':
        return <Ionicons name="bag-handle-outline" size={28} color={color} />;
      case 'rent':
        return (
          <MaterialCommunityIcons
            name="key-variant"
            size={28}
            color={color}
          />
        );
      case 'gift':
        return <Ionicons name="gift-outline" size={28} color={color} />;
      case 'savings':
        return (
          <MaterialCommunityIcons
            name="piggy-bank-outline"
            size={28}
            color={color}
          />
        );
      case 'ticket':
        return <Ionicons name="ticket-outline" size={28} color={color} />;
      case 'plus':
        return <Ionicons name="add" size={32} color={color} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Green Header & Balance Summary */}
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.iconButton}
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </Pressable>

          <Text style={styles.headerTitle}>Categories</Text>

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
      </View>

      {/* Main Content Sheet with 3-Column Category Grid */}
      <View style={styles.contentSheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gridContainer}>
            {categories.map((tile) => {
              const isSelected = selectedId === tile.id;
              return (
                <Pressable
                  key={tile.id}
                  onPress={() => handleTilePress(tile)}
                  style={styles.tileWrapper}
                >
                  <View
                    style={[
                      styles.iconBox,
                      isSelected ? styles.iconBoxActive : styles.iconBoxDefault,
                    ]}
                  >
                    {renderTileIcon(tile.icon, isSelected)}
                  </View>
                  <Text style={styles.tileLabel} numberOfLines={1}>
                    {tile.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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

      {/* Add Custom Category Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Category</Text>
            <TextInput
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="Enter category name..."
              placeholderTextColor="#7A8F8A"
              style={styles.modalInput}
              autoFocus
            />
            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.modalCancelBtn}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleAddCategory}
                style={styles.modalSaveBtn}
              >
                <Text style={styles.modalSaveText}>Add</Text>
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
    backgroundColor: '#F1FFF3',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 105,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },
  tileWrapper: {
    width: '30%',
    alignItems: 'center',
  },
  iconBox: {
    width: 78,
    height: 74,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconBoxDefault: {
    backgroundColor: '#6DB6FE',
  },
  iconBoxActive: {
    backgroundColor: '#0068FF',
  },
  tileLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    textAlign: 'center',
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
    gap: 14,
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
  modalSaveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#00D09E',
  },
  modalSaveText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#093030',
  },
});