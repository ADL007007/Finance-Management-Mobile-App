import React, { useMemo, useState } from 'react';
import {
  Linking,
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

type HelpTab = 'faq' | 'contact';
type HelpTopic = 'General' | 'Account' | 'Services';

interface FaqEntry {
  id: string;
  topic: HelpTopic;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqEntry[] = [
  {
    id: 'faq-1',
    topic: 'General',
    question: 'How to use FinWise?',
    answer:
      'Track your daily income and expenses, set monthly budgets, and monitor saving goals directly from the main tabs.',
  },
  {
    id: 'faq-2',
    topic: 'General',
    question: 'How much does it cost to use FinWise?',
    answer:
      'Core expense tracking, categories, and savings goals are available for free with optional pro analytics.',
  },
  {
    id: 'faq-3',
    topic: 'Services',
    question: 'How to contact support?',
    answer:
      'Open Contact Us and choose one of the available communication channels.',
  },
  {
    id: 'faq-4',
    topic: 'Account',
    question: 'How can I reset my password if I forgot it?',
    answer:
      'Go to Security or Password Settings, or use the Forgot Password option on the sign-in screen.',
  },
  {
    id: 'faq-5',
    topic: 'Account',
    question: 'Are there any privacy or data security measures in place?',
    answer:
      'Your profile can be protected with PIN codes, biometric authentication, and privacy controls.',
  },
  {
    id: 'faq-6',
    topic: 'Services',
    question: 'Can I customize settings within the application?',
    answer:
      'Yes, you can manage notifications, security preferences, and account options in Settings.',
  },
  {
    id: 'faq-7',
    topic: 'Account',
    question: 'How can I delete my account?',
    answer:
      'Open Profile -> Setting -> Delete Account, review the warning details, and confirm deletion.',
  },
  {
    id: 'faq-8',
    topic: 'Services',
    question: 'How do I access my expense history?',
    answer:
      'Open the Transactions tab or Analysis screen to filter and review past income and expense records.',
  },
  {
    id: 'faq-9',
    topic: 'General',
    question: 'Can I use the app offline?',
    answer:
      'You can view and log entries locally anytime, and sync changes once your connection is back.',
  },
];

export function HelpScreen() {
  const [activeTab, setActiveTab] = useState<HelpTab>('faq');
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic>('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesTopic = item.topic === selectedTopic || q.length > 0;
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesTopic && matchesQuery;
    });
  }, [searchQuery, selectedTopic]);

  const handleOpenExternal = (url: string) => {
    Linking.openURL(url).catch(() => {});
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

          <Text style={styles.headerTitle}>Help & FAQS</Text>

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
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heroTitle}>How Can We Help You?</Text>

          <View style={styles.modeSwitchRow}>
            <Pressable
              onPress={() => setActiveTab('faq')}
              style={[
                styles.modePill,
                activeTab === 'faq'
                  ? styles.modePillActive
                  : styles.modePillInactive,
              ]}
            >
              <Text
                style={[
                  styles.modePillText,
                  activeTab === 'faq'
                    ? styles.modePillTextActive
                    : styles.modePillTextInactive,
                ]}
              >
                FAQ
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab('contact')}
              style={[
                styles.modePill,
                activeTab === 'contact'
                  ? styles.modePillActive
                  : styles.modePillInactive,
              ]}
            >
              <Text
                style={[
                  styles.modePillText,
                  activeTab === 'contact'
                    ? styles.modePillTextActive
                    : styles.modePillTextInactive,
                ]}
              >
                Contact Us
              </Text>
            </Pressable>
          </View>

          <View style={styles.topicTabsRow}>
            {(['General', 'Account', 'Services'] as HelpTopic[]).map(
              (topic) => {
                const isSelected = selectedTopic === topic;
                return (
                  <Pressable
                    key={topic}
                    onPress={() => setSelectedTopic(topic)}
                    style={[
                      styles.topicChip,
                      isSelected && styles.topicChipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.topicChipText,
                        isSelected && styles.topicChipTextSelected,
                      ]}
                    >
                      {topic}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </View>

          <View style={styles.searchBox}>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search"
              placeholderTextColor="#6B8A82"
              style={styles.searchInput}
            />
            <Ionicons name="search-outline" size={18} color="#4B635E" />
          </View>

          {activeTab === 'faq' ? (
            <View style={styles.faqList}>
              {filteredFaqs.map((item) => {
                const isExpanded = expandedFaqId === item.id;
                return (
                  <View key={item.id}>
                    <Pressable
                      onPress={() =>
                        setExpandedFaqId(isExpanded ? null : item.id)
                      }
                      style={styles.faqRow}
                    >
                      <Text style={styles.faqQuestion}>{item.question}</Text>
                      <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color="#093030"
                      />
                    </Pressable>
                    {isExpanded && (
                      <Text style={styles.faqAnswer}>{item.answer}</Text>
                    )}
                    <View style={styles.hairline} />
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.contactList}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.contactRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.contactIconCircle}>
                  <MaterialCommunityIcons
                    name="headset"
                    size={20}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.contactLabel}>Customer Service</Text>
                <Ionicons name="chevron-forward" size={18} color="#093030" />
              </Pressable>

              <Pressable
                onPress={() => handleOpenExternal('https://example.com')}
                style={({ pressed }) => [
                  styles.contactRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.contactIconCircle}>
                  <Ionicons name="globe-outline" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.contactLabel}>Website</Text>
                <Ionicons name="chevron-forward" size={18} color="#093030" />
              </Pressable>

              <Pressable
                onPress={() => handleOpenExternal('https://facebook.com')}
                style={({ pressed }) => [
                  styles.contactRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.contactIconCircle}>
                  <Ionicons name="logo-facebook" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.contactLabel}>Facebook</Text>
                <Ionicons name="chevron-forward" size={18} color="#093030" />
              </Pressable>

              <Pressable
                onPress={() => handleOpenExternal('https://whatsapp.com')}
                style={({ pressed }) => [
                  styles.contactRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.contactIconCircle}>
                  <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.contactLabel}>Whatsapp</Text>
                <Ionicons name="chevron-forward" size={18} color="#093030" />
              </Pressable>

              <Pressable
                onPress={() => handleOpenExternal('https://instagram.com')}
                style={({ pressed }) => [
                  styles.contactRow,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.contactIconCircle}>
                  <Ionicons name="logo-instagram" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.contactLabel}>Instagram</Text>
                <Ionicons name="chevron-forward" size={18} color="#093030" />
              </Pressable>
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
              style={styles.navItem}
              accessibilityLabel="Categories"
            >
              <Ionicons name="layers-outline" size={22} color="#093030" />
            </Pressable>

            <Pressable
              onPress={() => router.push('/profile')}
              style={[styles.navItem, styles.navItemActive]}
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
    paddingBottom: 24,
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
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 115,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#093030',
    textAlign: 'center',
    marginBottom: 14,
  },
  modeSwitchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  modePill: {
    flex: 1,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modePillActive: {
    backgroundColor: '#00D09E',
  },
  modePillInactive: {
    backgroundColor: '#DFF5EC',
  },
  modePillText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  modePillTextActive: {
    color: '#093030',
  },
  modePillTextInactive: {
    color: '#2B574E',
  },
  topicTabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  topicChip: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F7F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicChipSelected: {
    backgroundColor: '#6DB6FE',
  },
  topicChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#093030',
  },
  topicChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  searchBox: {
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6EFE3',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#093030',
    paddingVertical: 0,
    marginRight: 8,
  },
  faqList: {
    gap: 2,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    gap: 10,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
  },
  faqAnswer: {
    fontSize: 12,
    lineHeight: 17,
    color: '#4B635E',
    paddingBottom: 10,
  },
  hairline: {
    height: 1,
    backgroundColor: '#D6EFE3',
  },
  contactList: {
    gap: 14,
    paddingTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  contactIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#093030',
  },
  pressed: {
    opacity: 0.85,
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