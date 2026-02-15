import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Flame, Medal } from 'lucide-react-native';

export default function HomeScreen() {
    const { theme, colors, toggleTheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Witaj ponownie! </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 16, marginVertical: 5 }}>Gotowy na swoje treningi?</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={[styles.infoCard, { backgroundColor: colors.info }]}>
                    <Flame color={colors.accent} size={24} />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}><Text style={{ color: colors.textSecondary, fontSize: 14 }}>W tym tygodniu:</Text>
                        <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: 'bold' }}>3 treningi</Text></View>
                </View>
                <View style={[styles.infoCard, { backgroundColor: colors.info, marginLeft: 25 }]}>
                    <Medal color={colors.accent} size={24} />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}><Text style={{ color: colors.textSecondary, fontSize: 14 }}>Ostatni trening:</Text>
                        <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: 'bold' }}>14.02.2026</Text></View>
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
