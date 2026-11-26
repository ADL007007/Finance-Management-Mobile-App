import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface EndSessionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function EndSessionModal({
  visible,
  onClose,
  onConfirm,
}: EndSessionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>End Session</Text>
          <Text style={styles.subtitle}>Are you sure you want to log out?</Text>

          <Pressable
            onPress={onConfirm}
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.confirmButtonText}>Yes, End Session</Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(14, 62, 62, 0.58)',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#2B423D',
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmButton: {
    width: '78%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  cancelButton: {
    width: '78%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DFF7E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#093030',
  },
  pressed: {
    opacity: 0.88,
  },
});