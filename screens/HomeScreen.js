import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Flame, Medal } from 'lucide-react-native';
export default function HomeScreen() {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';
    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#1E1E1E' : '#F5F7FA' }]}>
            <Text style={[styles.title, { color: isDark ? '#FFF' : '#111827' }]}>Witaj ponownie! </Text>
            <Text style={{ color: isDark ? '#A1A1AA' : '#6B7280', fontSize: 16, marginVertical: 5 }}>Gotowy na swoje treningi?</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={[styles.infoCard, { backgroundColor: isDark ? '#2D2D2D' : '#fff' }]}>
                    <Flame color={isDark ? '#FFD700' : '#4F46E5'} size={24} />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}><Text style={{ color: isDark ? '#A1A1AA' : '#6B7280', fontSize: 14 }}>W tym tygodniu:</Text>
                        <Text style={{ color: isDark ? '#FFF' : '#6B7280', fontSize: 18, fontWeight: 'bold' }}>3 treningi</Text></View>
                </View>
                <View style={[styles.infoCard, { backgroundColor: isDark ? '#2D2D2D' : '#fff', marginLeft: 25 }]}>
                    <Medal color={isDark ? '#FFD700' : '#4F46E5'} size={24} />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}><Text style={{ color: isDark ? '#A1A1AA' : '#6B7280', fontSize: 14 }}>Ostatni trening:</Text>
                        <Text style={{ color: isDark ? '#FFF' : '#6B7280', fontSize: 18, fontWeight: 'bold' }}>14.02.2026</Text></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 35, paddingLeft: 6 },
    title: { fontSize: 40, fontWeight: 'bold' },
    infoCard: {
        marginTop: 20,
        width: '45%',
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
    }
});
