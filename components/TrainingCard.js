import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Play } from 'lucide-react-native';

export const TrainingCard = ({ training, isDark, onStart }) => {
  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#2D2D2D' : '#fff' }]}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: isDark ? '#FFF' : '#111827' }]}>
          {training.name}
        </Text>
        <Text style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>
          {training.for_day}
        </Text>
      </View>
      
      <Text style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>8 exercises</Text>
      
      <Pressable 
        onPress={() => onStart(training)}
        style={[styles.button, { backgroundColor: isDark ? '#FFD700' : '#4F46E5' }]}
      >
        <Text style={[styles.buttonText, { color: isDark ? '#1E1E1E' : '#fff' }]}>
          Start Training
        </Text>
        <Play color={isDark ? '#1E1E1E' : '#fff'} size={20} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  button: { marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 8 },
  buttonText: { marginRight: 8, fontWeight: 'bold' }
});