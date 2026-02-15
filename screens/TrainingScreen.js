// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { useTheme } from '../context/ThemeContext';
// import { Play } from 'lucide-react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function TrainingScreen() {
//   const { theme, toggleTheme } = useTheme();

//   const isDark = theme === 'dark';
//   const [trainings, setTrainings] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchTrainings();
//   }, []);

//   const fetchTrainings = async () => {
//     try {
//       const response = await fetch('http://192.168.100.17:3000/trainings');
//       const data = await response.json();
//       setTrainings(data);
//     } catch (error) {
//       console.log('Błąd:', error);
//     }
//   };
//   return (
//     <View style={[styles.container, { backgroundColor: isDark ? '#1E1E1E' : '#F5F7FA' }]}>
//       {trainings.map((training) => (
//         <View key={training.id} style={[styles.trainingCard, { backgroundColor: isDark ? '#2D2D2D' : '#fff' }]}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Text style={[styles.trainingName, { color: isDark ? '#FFF' : '#111827' }]}>{training.name}</Text>
//             <Text style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>{training.for_day}</Text>
//           </View>
//           <Text style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>8 exercises</Text>
//           <Pressable onPress={() => navigation.navigate('Exercises', { training })}
//             style={[styles.startButton, { backgroundColor: isDark ? '#FFD700' : '#4F46E5', }]}>
//             <Text style={styles.startButtonText}>Start Training</Text>
//             <Play color={isDark ? '#1E1E1E' : '#fff'} size={20} />
//           </Pressable>
//         </View>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 25,
//     paddingHorizontal: 20,
//     backgroundColor: '#F5F7FA',
//   },

//   trainingCard: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 4,
//   },
//   trainingName: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#111827',
//   },
//   startButton: {
//     marginTop: 10,
//     color: '#fff',
//     flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 8
//   },
//   startButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
// });
import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useFetchTrainings } from '../hooks/useFetchTrainings';
import { TrainingCard } from '../components/TrainingCard.js'; // The component we discussed

export default function TrainingScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const isDark = theme === 'dark';

  // Everything logic-related is now one line!
  const { trainings, loading, error, refresh } = useFetchTrainings();

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: isDark ? '#1E1E1E' : '#F5F7FA' }]}>
        <ActivityIndicator size="large" color={isDark ? '#FFD700' : '#4F46E5'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: isDark ? '#1E1E1E' : '#F5F7FA' }]}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1E1E1E' : '#F5F7FA' }]}>
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TrainingCard 
            training={item} 
            isDark={isDark} 
            onStart={(t) => navigation.navigate('Exercises', { training: t })} 
          />
        )}
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