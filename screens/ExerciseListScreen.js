import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ExerciseListScreen({ route }) {
  const { training } = route.params;
  const { colors } = useTheme();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch(`http://192.168.100.17:3000/trainings/${training.id}/exercises`);
      const data = await response.json();
      setExercises(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (exercise) => {
    try {
      const response = await fetch(`http://192.168.100.17:3000/exercises/${exercise.plan_id}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !exercise.completed }) // przełączamy completed
      });

      if (!response.ok) throw new Error('Nie udało się zaktualizować ćwiczenia');

      // Aktualizacja stanu lokalnego, żeby UI od razu zmienił się
      setExercises(prev =>
        prev.map(e =>
          e.plan_id === exercise.plan_id ? { ...e, completed: !e.completed } : e
        )
      );
    } catch (err) {
      console.error(err);
    }
    const allCompleted = exercises.every(e => e.plan_id === exercise.plan_id ? !e.completed : e.completed);
    console.log('Czy wszystkie ćwiczenia ukończone?', allCompleted);
    if (allCompleted) {
      try {
        await fetch(`http://192.168.100.17:3000/trainings/${training.id}/complete`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        console.error('Błąd podczas ustawiania treningu jako ukończonego:', err);
      }
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{training.name}</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.plan_id.toString()}
        renderItem={({ item }) => {
          const isCompleted = item.completed;
          return (
            <View style={[
              styles.card, 
              { backgroundColor: isCompleted ? colors.successBackground : colors.card }
            ]}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={[
                    styles.exerciseName, 
                    { color: isCompleted ? colors.successText : colors.textPrimary, textDecorationLine: isCompleted ? 'line-through' : 'none' }
                  ]}>
                    {item.exercise_name}
                  </Text>
                  <Text style={{ color: colors.textSecondary }}>
                    Powtórzenia: {item.reps}, Ciężar: {item.weight} kg
                  </Text>
                </View>

                <TouchableOpacity 
                  style={[styles.completeButton, { backgroundColor: isCompleted ? colors.accent : colors.success }]}
                  onPress={() => toggleComplete(item)}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {isCompleted ? 'Cofnij' : '✔'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 20 }}>Brak ćwiczeń</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: { padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  exerciseName: { fontSize: 18, fontWeight: '600' },
  completeButton: { 
    padding: 10, 
    borderRadius: 5,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
