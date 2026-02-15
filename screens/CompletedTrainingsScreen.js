import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFetchTrainings } from '../hooks/useFetchTrainings';
import { TrainingCard } from '../components/TrainingCard';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


export default function CompletedTrainingsScreen() {
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const { trainings, loading, error, refresh } = useFetchTrainings();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const completedTrainings = trainings.filter(t => t.completed == 1);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {completedTrainings.length === 0 && !loading ? (
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 50 }}>
          Brak ukończonych treningów
        </Text>
      ) : (
        <FlatList
          data={completedTrainings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TrainingCard style={{ opacity: 0.6 }} // Visual hint that it's completed
              training={item}
              onStart={(t) => navigation.navigate('Exercises', { training: t })}
            />
          )}
          onRefresh={refresh}
          refreshing={loading}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
});
