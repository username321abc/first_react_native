import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#1E1E1E' : '#F5F7FA' }]}>
            <Text style={[styles.title, { color: isDark ? '#FFF' : '#111827' }]}>Twój profil</Text>

            <View style={styles.switchContainer}>
                <Text style={{ color: isDark ? '#FFF' : '#111827', fontSize: 16 }}>Tryb ciemny</Text>
                <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#767577', true: '#4F46E5' }}
                    thumbColor={isDark ? '#FFD700' : '#f4f3f4'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 40 },
    switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '60%' },
});
