import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import TrainingsTopTabs from './navigation/TrainingsTopTabs.js';
import ProfileScreen from './screens/ProfileScreen';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Home, User, Dumbbell } from 'lucide-react-native';
import TrainingStack from './navigation/TrainingStack';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.background, height: 90, paddingBottom: 25 },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => <Home color={color} size={20} /> }}
      />
      <Tab.Screen
        name="Trainings"
        component={TrainingStack}
        options={{ tabBarIcon: ({ color }) => <Dumbbell color={color} size={20} /> }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <User color={color} size={20} /> }}
      />
    </Tab.Navigator>
  );
}
