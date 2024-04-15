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
import bidding from './components/bidding';
import modal from './components/Modal';
import bid from './components/bid';
import msglist from './components/msglist';
import map from './components/Map';
import pendinglist from './components/PendingList'
import { GlobalProvider } from './GlobalContext';
import Active from './components/active';
import grievence from './components/grievence';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="getstarted" component={GetStarted} options={{ title: '' }} />
        <Stack.Screen name="home" component={Home} options={{ title: ' ' }} />
        <Stack.Screen name="list" component={List} options={{ title: 'Customers List' }} />
        <Stack.Screen name="history" component={History} options={{ title: '' }} />
        <Stack.Screen name="profile" component={profile} options={{ title: 'Personal Information' }} />
        <Stack.Screen name="messages" component={Messages} options={{ title: '' }} />
        <Stack.Screen name="bidding" component={bidding} options={{ title: '' }} />
        <Stack.Screen name="modal" component={modal} options={{ title: '' }} />
        <Stack.Screen name="bid" component={bid} options={{ title: '' }} />
        <Stack.Screen name="msglist" component={msglist} options={{ title: '' }} />
        <Stack.Screen name="map" component={map} options={{ title: '' }} />
        <Stack.Screen name="pendinglist" component={pendinglist} options={{ title: '' }} />
        <Stack.Screen name="grievence" component={grievence} options={{ title: '' }} />
        <Stack.Screen name="active" component={Active} options={{ title: 'Active Appointments' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GlobalProvider>
  );
}
