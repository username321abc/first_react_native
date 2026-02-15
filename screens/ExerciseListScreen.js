import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ExerciseListScreen({ route }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { training } = route.params;

  const exercises = [
    { id: 1, name: 'Push Ups' },
    { id: 2, name: 'Pull Ups' },
    { id: 3, name: 'Squats' },
    { id: 4, name: 'Plank' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1E1E1E' : '#F5F7FA' }]}>
      <Text style={[styles.title, { color: isDark ? '#FFF' : '#111827' }]}>
        {training.name}
      </Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: isDark ? '#2D2D2D' : '#fff' }]}>
            <Text style={{ color: isDark ? '#FFF' : '#111827' }}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});
