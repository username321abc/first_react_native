import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveTrainingsScreen from '../screens/ActiveTrainingsScreen';
import CompletedTrainingsScreen from '../screens/CompletedTrainingsScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createMaterialTopTabNavigator();

export default function TrainingsTopTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.background, paddingTop: 10 },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIndicatorStyle: { backgroundColor: colors.accent, height: 3 },
        tabBarLabelStyle: { fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Active"
        component={ActiveTrainingsScreen}
        options={{ title: 'Aktywne' }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTrainingsScreen}
        options={{ title: 'Ukończone' }}
      />
    </Tab.Navigator>
  );
}
