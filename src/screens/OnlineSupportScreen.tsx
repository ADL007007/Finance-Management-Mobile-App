import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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

type ChannelTab = 'Support Assistant' | 'Help Center';

interface ChatItem {
  id: string;
  channel: ChannelTab;
  title: string;
  preview: string;
  meta: string;
  status: 'active' | 'ended';
}

interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  text: string;
  time: string;
}

const INITIAL_CHATS: ChatItem[] = [
  {
    id: 'chat-active-1',
    channel: 'Support Assistant',
    title: 'Support Assistant',
    preview: 'Hello! I’m here to assist you',
    meta: '2 Min Ago',
    status: 'active',
  },
  {
    id: 'chat-ended-1',
    channel: 'Help Center',
    title: 'Help Center',
    preview: 'Your account is ready to usa...',
    meta: 'Feb 08 - 2024',
    status: 'ended',
  },
  {
    id: 'chat-ended-2',
    channel: 'Support Assistant',
    title: 'Support Assistant',
    preview: 'Hello! I’m here to assist you',
    meta: 'Dec 24 - 2023',
    status: 'ended',
  },
  {
    id: 'chat-ended-3',
    channel: 'Support Assistant',
    title: 'Support Assistant',
    preview: 'Hello! I’m here to assist you',
    meta: 'Sep 10 - 2023',
    status: 'ended',
  },
  {
    id: 'chat-ended-4',
    channel: 'Help Center',
    title: 'Help Center',
    preview: 'Hi, how are you today?',
    meta: 'June 12 - 2023',
    status: 'ended',
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'support',
    text: 'Welcome, I am your virtual assistant.',
    time: '14:00',
  },
  {
    id: 'm-2',
    sender: 'support',
    text: 'How can I help you today?',
    time: '14:00',
  },
  {
    id: 'm-3',
    sender: 'user',
    text: 'Hello! I have a question. How can I record my expenses by date?',
    time: '14:01',
  },
  {
    id: 'm-4',
    sender: 'support',
    text: 'Response to your request:\nYou can register expenses in the top menu of the homepage.',
    time: '14:02',
  },
  {
    id: 'm-5',
    sender: 'support',
    text: 'Enter the purchase information, including the date, etc.',
    time: '14:03',
  },
  {
    id: 'm-6',
    sender: 'user',
    text: 'OK, thanks a lot.',
    time: '14:04',
  },
  {
    id: 'm-7',
    sender: 'support',
    text: 'It was a pleasure to accommodate your request. See you soon!',
    time: '14:05',
  },
];

export function OnlineSupportScreen() {
  const [inConversation, setInConversation] = useState(false);
  const [activeChannel, setActiveChannel] =
    useState<ChannelTab>('Support Assistant');
  const [chats, setChats] = useState<ChatItem[]>(INITIAL_CHATS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');

  const activeChats = useMemo(
    () => chats.filter((item) => item.status === 'active'),
    [chats]
  );

  const endedChats = useMemo(
    () => chats.filter((item) => item.status === 'ended'),
    [chats]
  );

  const handleBack = () => {
    if (inConversation) {
      setInConversation(false);
      return;
    }
    router.back();
  };

  const handleOpenChat = (item: ChatItem) => {
    setActiveChannel(item.channel);
    setInConversation(true);
  };

  const handleStartAnotherChat = () => {
    const newChat: ChatItem = {
      id: `chat-${Date.now()}`,
      channel: 'Support Assistant',
      title: 'Support Assistant',
      preview: 'Hello! I’m here to assist you',
      meta: 'Just Now',
      status: 'active',
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChannel('Support Assistant');
    setInConversation(true);
  };

  const handleSendMessage = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');

    const outgoing: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: `${hh}:${mm}`,
    };

    setMessages((prev) => [...prev, outgoing]);
    setDraft('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={handleBack}
              style={styles.iconButton}
              accessibilityLabel="Back"
            >
              <Ionicons name="arrow-back" size={22} color="#093030" />
            </Pressable>

            <Text style={styles.headerTitle}>Online Support</Text>

            <Pressable
              onPress={() => router.push('/notifications')}
              style={styles.bellButton}
              accessibilityLabel="Notifications"
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#093030"
              />
              <View style={styles.bellDot} />
            </Pressable>
          </View>
        </View>

        <View style={styles.contentSheet}>
          {!inConversation ? (
            <ScrollView
              contentContainerStyle={styles.listScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sectionLabel}>Active Chats</Text>

              <View style={styles.chatGroup}>
                {activeChats.map((chat) => (
                  <Pressable
                    key={chat.id}
                    onPress={() => handleOpenChat(chat)}
                    style={({ pressed }) => [
                      styles.chatCard,
                      pressed && styles.pressed,
                    ]}
                  >
                    <View style={styles.chatBadgeIcon}>
                      <MaterialCommunityIcons
                        name="headset"
                        size={20}
                        color="#093030"
                      />
                    </View>
                    <View style={styles.chatBody}>
                      <Text style={styles.chatCardTitle}>{chat.title}</Text>
                      <Text style={styles.chatCardPreview} numberOfLines={1}>
                        {chat.preview}
                      </Text>
                    </View>
                    <Text style={styles.chatCardMeta}>{chat.meta}</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.sectionLabel}>Ended Chats</Text>

              <View style={styles.chatGroup}>
                {endedChats.map((chat) => (
                  <Pressable
                    key={chat.id}
                    onPress={() => handleOpenChat(chat)}
                    style={({ pressed }) => [
                      styles.chatCard,
                      pressed && styles.pressed,
                    ]}
                  >
                    <View style={styles.chatBadgeIcon}>
                      <MaterialCommunityIcons
                        name="headset"
                        size={20}
                        color="#093030"
                      />
                    </View>
                    <View style={styles.chatBody}>
                      <Text style={styles.chatCardTitle}>{chat.title}</Text>
                      <Text style={styles.chatCardPreview} numberOfLines={1}>
                        {chat.preview}
                      </Text>
                    </View>
                    <Text style={styles.chatCardMeta}>{chat.meta}</Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={handleStartAnotherChat}
                style={({ pressed }) => [
                  styles.startChatBtn,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.startChatBtnText}>Start Another Chat</Text>
              </Pressable>
            </ScrollView>
          ) : (
            <View style={styles.chatRoomWrap}>
              <View style={styles.channelSwitcher}>
                {(['Support Assistant', 'Help Center'] as ChannelTab[]).map(
                  (channel) => {
                    const active = activeChannel === channel;
                    return (
                      <Pressable
                        key={channel}
                        onPress={() => setActiveChannel(channel)}
                        style={[
                          styles.channelPill,
                          active
                            ? styles.channelPillActive
                            : styles.channelPillInactive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.channelPillText,
                            active
                              ? styles.channelPillTextActive
                              : styles.channelPillTextInactive,
                          ]}
                        >
                          {channel}
                        </Text>
                      </Pressable>
                    );
                  }
                )}
              </View>

              <ScrollView
                contentContainerStyle={styles.messagesScrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <View
                      key={msg.id}
                      style={[
                        styles.messageBlock,
                        isUser
                          ? styles.messageBlockRight
                          : styles.messageBlockLeft,
                      ]}
                    >
                      <View
                        style={[
                          styles.bubble,
                          isUser ? styles.bubbleUser : styles.bubbleSupport,
                        ]}
                      >
                        <Text style={styles.bubbleText}>{msg.text}</Text>
                      </View>
                      <Text style={styles.messageTime}>{msg.time}</Text>
                    </View>
                  );
                })}
                <Text style={styles.endedNotice}>14:06 | Chat Ended</Text>
              </ScrollView>

              <View style={styles.composerBar}>
                <Pressable
                  onPress={() => {}}
                  style={styles.composerActionBtn}
                  accessibilityLabel="Attach photo"
                >
                  <Ionicons name="camera-outline" size={20} color="#093030" />
                </Pressable>

                <TextInput
                  value={draft}
                  onChangeText={setDraft}
                  placeholder="Write Here..."
                  placeholderTextColor="#6B8A82"
                  style={styles.composerInput}
                  returnKeyType="send"
                  onSubmitEditing={handleSendMessage}
                />

                <Pressable
                  onPress={() => {}}
                  style={styles.composerActionBtn}
                  accessibilityLabel="Voice message"
                >
                  <Ionicons name="mic-outline" size={20} color="#093030" />
                </Pressable>

                <Pressable
                  onPress={handleSendMessage}
                  style={styles.sendCircleBtn}
                  accessibilityLabel="Send message"
                >
                  <Ionicons name="send" size={16} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
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
                <Ionicons
                  name="stats-chart-outline"
                  size={20}
                  color="#093030"
                />
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
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
  listScrollContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 115,
  },
  sectionLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 10,
  },
  chatGroup: {
    gap: 10,
    marginBottom: 16,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF5EC',
    borderRadius: 18,
    paddingVertical: 11,
    paddingHorizontal: 12,
    gap: 10,
  },
  chatBadgeIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBody: {
    flex: 1,
  },
  chatCardTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#093030',
  },
  chatCardPreview: {
    fontSize: 11.5,
    color: '#4B635E',
    marginTop: 2,
  },
  chatCardMeta: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#4B635E',
  },
  startChatBtn: {
    marginTop: 6,
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 30,
  },
  startChatBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#093030',
  },
  chatRoomWrap: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 78,
  },
  channelSwitcher: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  channelPill: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelPillActive: {
    backgroundColor: '#00D09E',
  },
  channelPillInactive: {
    backgroundColor: '#DFF5EC',
  },
  channelPillText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  channelPillTextActive: {
    color: '#093030',
  },
  channelPillTextInactive: {
    color: '#3B6158',
  },
  messagesScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  messageBlock: {
    maxWidth: '82%',
  },
  messageBlockLeft: {
    alignSelf: 'flex-start',
  },
  messageBlockRight: {
    alignSelf: 'flex-end',
  },
  bubble: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bubbleSupport: {
    backgroundColor: '#E1F0FF',
  },
  bubbleUser: {
    backgroundColor: '#00D09E',
  },
  bubbleText: {
    fontSize: 12,
    lineHeight: 16.5,
    color: '#093030',
  },
  messageTime: {
    fontSize: 10,
    color: '#5C736D',
    marginTop: 2,
    paddingHorizontal: 4,
  },
  endedNotice: {
    fontSize: 10.5,
    color: '#5C736D',
    textAlign: 'left',
    marginTop: 4,
  },
  composerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF5EC',
    marginHorizontal: 16,
    marginBottom: 6,
    borderRadius: 24,
    paddingLeft: 8,
    paddingRight: 6,
    paddingVertical: 5,
    gap: 6,
  },
  composerActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  composerInput: {
    flex: 1,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingHorizontal: 12,
    fontSize: 12.5,
    color: '#093030',
    paddingVertical: 0,
  },
  sendCircleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
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