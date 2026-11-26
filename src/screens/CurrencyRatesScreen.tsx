import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { fetchExchangeRates, RateItem } from '../services/currencyApi';
import { useProfile } from '../context/ProfileContext';

const BASE_CURRENCIES = ['USD', 'EUR', 'GBP', 'KZT'];
const TARGET_QUOTES = ['KZT', 'USD', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD'];

export function CurrencyRatesScreen() {
  const { darkTheme } = useProfile();

  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [rates, setRates] = useState<RateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRates = async (base: string) => {
    setLoading(true);
    setError(null);
    try {
      const quotes = TARGET_QUOTES.filter((code) => code !== base);
      const list = await fetchExchangeRates(base, quotes);
      setRates(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const quotes = TARGET_QUOTES.filter((code) => code !== baseCurrency);
        const list = await fetchExchangeRates(baseCurrency, quotes);
        if (active) setRates(list);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Ошибка загрузки');
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [baseCurrency]);

  const sheetBg = darkTheme ? '#0E1C18' : '#F1FFF3';
  const cardBg = darkTheme ? '#1A312A' : '#DFF7E2';
  const textColor = darkTheme ? '#ECFFF9' : '#093030';
  const subTextColor = darkTheme ? '#8FA8A0' : '#5C736D';

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

          <Text style={styles.headerTitle}>Exchange Rates</Text>

          <Pressable
            onPress={() => loadRates(baseCurrency)}
            style={styles.refreshButton}
            accessibilityLabel="Refresh rates"
          >
            <Ionicons name="refresh" size={20} color="#093030" />
          </Pressable>
        </View>
      </View>

      <View style={[styles.contentSheet, { backgroundColor: sheetBg }]}>
        <View style={styles.switcherRow}>
          {BASE_CURRENCIES.map((code) => {
            const active = code === baseCurrency;
            return (
              <Pressable
                key={code}
                onPress={() => setBaseCurrency(code)}
                style={[
                  styles.baseChip,
                  { backgroundColor: active ? '#00D09E' : cardBg },
                ]}
              >
                <Text style={[styles.baseChipText, { color: '#093030' }]}>
                  1 {code}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {loading && (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#00D09E" />
          </View>
        )}

        {!loading && error && (
          <View style={styles.centerBox}>
            <Text style={[styles.errorText, { color: textColor }]}>{error}</Text>
            <Pressable
              onPress={() => loadRates(baseCurrency)}
              style={styles.retryBtn}
            >
              <Text style={styles.retryBtnText}>Повторить</Text>
            </Pressable>
          </View>
        )}

        {!loading && !error && (
          <ScrollView
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {rates[0]?.date && (
              <Text style={[styles.dateNote, { color: subTextColor }]}>
                Дата курсов: {rates[0].date}
              </Text>
            )}

            {rates.map((item) => (
              <View
                key={`${item.base}-${item.quote}`}
                style={[styles.rateCard, { backgroundColor: cardBg }]}
              >
                <View>
                  <Text style={[styles.pairTitle, { color: textColor }]}>
                    {item.base} → {item.quote}
                  </Text>
                  <Text style={[styles.pairSub, { color: subTextColor }]}>
                    1 {item.base} в {item.quote}
                  </Text>
                </View>

                <Text style={[styles.rateValue, { color: textColor }]}>
                  {item.quote === 'KZT'
                    ? item.rate.toFixed(2)
                    : item.rate.toFixed(4)}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
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
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1FFF9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSheet: {
    flex: 1,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingTop: 22,
  },
  switcherRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  baseChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },
  baseChipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: '#00D09E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  dateNote: {
    fontSize: 12,
    marginBottom: 4,
  },
  rateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 22,
  },
  pairTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  pairSub: {
    fontSize: 12,
    marginTop: 2,
  },
  rateValue: {
    fontSize: 17,
    fontWeight: '700',
  },
});