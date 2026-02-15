import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext.js';
import { useNavigation } from '@react-navigation/native';
import { useFetchTrainings } from '../hooks/useFetchTrainings.js';
import { TrainingCard } from '../components/TrainingCard.js'; // The component we discussed

export default function TrainingScreen() {
  const { theme, colors, toggleTheme } = useTheme();
  const navigation = useNavigation();

  // Everything logic-related is now one line!
  const { trainings, loading, error, refresh } = useFetchTrainings();

  if (loading && trainings.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary, fontSize:35, marginBottom: 20 }]}>Twoje treningi</Text>
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TrainingCard
            training={item}
            onStart={(t) => navigation.navigate('Exercises', { training: t })}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: colors.textSecondary }}>
            Brak treningów
          </Text>
        }

        // Bonus: Pull-to-refresh functionality
        onRefresh={refresh}
        refreshing={loading}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 25, paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});