import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const OnboardingBScreen: React.FC = () => {
  const router = useRouter();

  const handleNextPress = () => {
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />

      {/* Верхний зеленый блок с вопросом */}
      <View style={styles.topSection}>
        <Text style={styles.headerTitle}>
          ¿Are You Ready To{'\n'}Take Control Of{'\n'}Your Finaces?
        </Text>
      </View>

      {/* Нижняя белая карточка со скруглением */}
      <View style={styles.bottomCard}>
        <View style={styles.illustrationWrapper}>
          <View style={styles.circleBackdrop}>
            <MaterialCommunityIcons name="cellphone-check" size={96} color="#00D09E" />
          </View>
        </View>

        <View style={styles.footerAction}>
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.7}
            onPress={handleNextPress}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>

          {/* Индикатор пагинации (шаг 2 активен) */}
          <View style={styles.paginationDots}>
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  topSection: {
    flex: 0.38,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#0E3E3E',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  bottomCard: {
    flex: 0.62,
    backgroundColor: '#F1FFF3',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 44,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  circleBackdrop: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#DFF7E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerAction: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  nextText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0E3E3E',
  },
  paginationDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  activeDot: {
    backgroundColor: '#00D09E',
  },
  inactiveDot: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#00D09E',
  },
});