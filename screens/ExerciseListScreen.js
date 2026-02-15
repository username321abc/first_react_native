import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ExerciseListScreen({ route }) {
    const { theme, colors, toggleTheme } = useTheme();
    const { training } = route.params;

    const exercises = [
        { id: 1, name: 'Push Ups' },
        { id: 2, name: 'Pull Ups' },
        { id: 3, name: 'Squats' },
        { id: 4, name: 'Plank' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                {training.name}
            </Text>

            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: colors.card }]}>
                        <Text style={{ color: colors.textPrimary }}>
                            {item.name}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
});
