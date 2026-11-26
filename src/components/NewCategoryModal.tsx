import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface NewCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (categoryName: string) => void;
}

export function NewCategoryModal({
  visible,
  onClose,
  onSave,
}: NewCategoryModalProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (visible) {
      setName('');
    }
  }, [visible]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      onClose();
      return;
    }
    onSave(trimmed);
    setName('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>New Category</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Write..."
            placeholderTextColor="#68C5A8"
            style={styles.input}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleSave}
          />

          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.saveButtonText}>Save</Text>
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
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DFF5EC',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#093030',
    marginBottom: 14,
  },
  saveButton: {
    width: '72%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  cancelButton: {
    width: '72%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DFF5EC',
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