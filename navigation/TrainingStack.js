import { createStackNavigator } from '@react-navigation/stack';
import TrainingScreen from '../screens/TrainingScreen';
import ExerciseListScreen from '../screens/ExerciseListScreen';

const Stack = createStackNavigator();

export default function TrainingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrainingScreen"
        component={TrainingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exercises"
        component={ExerciseListScreen}
      />
    </Stack.Navigator>
  );
}
