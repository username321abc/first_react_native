import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Dumbbell, User } from 'lucide-react-native';

import { ThemeProvider, useTheme } from './context/ThemeContext';

import HomeScreen from './screens/HomeScreen';
import TrainingScreen from './screens/TrainingScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  const { theme } = useTheme();

  const colors = {
    light: {
      background: '#F5F7FA',
      active: '#4F46E5',
      inactive: '#A1A1AA',
    },
    dark: {
      background: '#1E1E1E',
      active: '#FFD700',
      inactive: '#6B7280',
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors[theme].active,
        tabBarInactiveTintColor: colors[theme].inactive,
        tabBarStyle: { height: 90, paddingBottom: 5, paddingTop: 5, backgroundColor: colors[theme].background },
        tabBarIcon: ({ color, size }) => {
          size = 24;
          if (route.name === 'Home') return <Home color={color} size={size} />;
          if (route.name === 'Trainings') return <Dumbbell color={color} size={size} />;
          if (route.name === 'Profile') return <User color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trainings" component={TrainingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
