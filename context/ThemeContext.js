import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1️⃣ Zdefiniuj kolory
const themes = {
    light: {
        background: '#F5F7FA',
        card: '#FFFFFF',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        accent: '#4F46E5',
        achievement: '#60db7a',
    },
    dark: {
        background: '#1E1E1E',
        card: '#2D2D2D',
        textPrimary: '#FFFFFF',
        textSecondary: '#A1A1AA',
        accent: '#FFD700',
        achievement: '#60db7a',
    },
};

// 2️⃣ Stwórz context
const ThemeContext = createContext();

// 3️⃣ Provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('@theme');
                if (savedTheme) setTheme(savedTheme);
            } catch (e) {
                console.error('Failed to load theme:', e);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try {
            await AsyncStorage.setItem('@theme', newTheme);
        } catch (e) {
            console.error('Failed to save theme:', e);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, colors: themes[theme], toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 4️⃣ Custom hook do używania contextu
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
