import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingsTopTabs from './TrainingsTopTabs';
import ExerciseListScreen from '../screens/ExerciseListScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createStackNavigator();

export default function TrainingStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.textPrimary },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="TrainingsTopTabs"
        component={TrainingsTopTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exercises"
        component={ExerciseListScreen}
        options={{ title: 'Ćwiczenia' }}
      />
    </Stack.Navigator>
  );
}
