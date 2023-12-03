import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import Continue from './components/profile';
import List from './components/list';
import History from './components/history';
import Messages from './components/message';
import GetStarted from './components/getstarted';
import profile from './components/profile'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="getstarted" component={GetStarted} options={{ title: '' }} />
        <Stack.Screen name="home" component={Home} options={{ title: ' ' }} />
        <Stack.Screen name="list" component={List} options={{ title: '' }} />
        <Stack.Screen name="history" component={History} options={{ title: '' }} />
        <Stack.Screen name="profile" component={profile} options={{ title: '' }} />
        <Stack.Screen name="messages" component={Messages} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
