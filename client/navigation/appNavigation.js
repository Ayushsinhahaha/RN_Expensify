import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import {useDispatch, useSelector} from 'react-redux';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import app from '../config/firebase';
import {setUser} from '../redux/slices/user';

const Stack = createNativeStackNavigator();

const appNavigation = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const auth = getAuth(app);
  onAuthStateChanged(auth, user => {
    // Check for user status
    console.log('got user', user);
    dispatch(setUser(user));
  });

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddTrip"
            component={AddTripScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TripExpense"
            component={TripExpensesScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default appNavigation;

const styles = StyleSheet.create({});
