import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
export default function TrainingScreen() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('http://192.168.100.17:3000/trainings');
      const data = await response.json();
      setTrainings(data);
    } catch (error) {
      console.log('Błąd:', error);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1E1E1E' : '#F5F7FA' }]}>
      {trainings.map((training) => (
        <View key={training.id} style={[styles.trainingCard, { backgroundColor: isDark ? '#2D2D2D' : '#fff' }]}>
          <Text style={[styles.trainingName, { color: isDark ? '#FFF' : '#111827' }]}>{training.name}</Text>
          <Text style={[styles.exercisesList, { color: isDark ? '#A1A1AA' : '#6B7280' }]}>Ćwiczenia: {training.for_day}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // trochę odstępu od status bara
    paddingHorizontal: 20,
    backgroundColor: '#F5F7FA',
    // usuń justifyContent i alignItems
  },

  trainingCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  trainingName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },

  exercisesList: {
    fontSize: 14,
    color: '#6B7280',
  },

});
