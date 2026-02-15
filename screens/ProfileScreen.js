import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
    const { theme, colors, toggleTheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                Ustawienia
            </Text>

            <View style={styles.row}>
                <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Tryb ciemny</Text>
                <Switch
                    value={theme === 'dark'}
                    onValueChange={toggleTheme}
                    thumbColor={theme === 'dark' ? '#fff' : '#fff'}
                    trackColor={{ false: '#ccc', true: '#4F46E5' }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
