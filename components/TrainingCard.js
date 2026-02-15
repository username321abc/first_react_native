import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Play } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

export const TrainingCard = ({ training, onStart }) => {
    const { theme, colors, toggleTheme } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                    {training.name}
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                    {training.for_day}
                </Text>
            </View>

            <Pressable
                onPress={() => onStart(training)}
                style={[styles.button, { backgroundColor: colors.accent }]}
            >
                <Text style={styles.buttonText}>Start</Text>
                <Play color="#fff" size={18} />
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    card: {
        padding: 18,
        borderRadius: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        gap: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
