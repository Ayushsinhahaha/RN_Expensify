import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

const Stack=createNativeStackNavigator();

const appNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" >
            <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}} />
            <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}} />
            <Stack.Screen name="AddTrip" component={AddTripScreen}  options={{headerShown:false}} />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen}  options={{headerShown:false}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default appNavigation

const styles = StyleSheet.create({})