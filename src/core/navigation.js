import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '../features/auth/AuthScreen';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import DashboardScreen from '../features/dashboard/DashboardScreen';
import CopilotScreen from '../features/ai_copilot/CopilotScreen';
import VaccineScreen from '../features/vaccines/VaccineScreen';
import ActivitiesScreen from '../features/activities/ActivitiesScreen';
import JournalScreen from '../features/journal/JournalScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Copilot" component={CopilotScreen} />
        <Stack.Screen name="Vaccines" component={VaccineScreen} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
