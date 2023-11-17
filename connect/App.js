import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import home from './components/home'
import Continue from './components/continue';
import list from './components/list'
const Stack=createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="home" component={home} options={{title:''}}/> */}
        <Stack.Screen name="list" component={list} options={{title:''}}/>
      </Stack.Navigator>
    </NavigationContainer>
     
  );
}
 
