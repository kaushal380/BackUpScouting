import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// importing pages
import DisplayMenu from '../screens/DataDisplay/DisplayMenu';
import Climb from '../screens/DataDisplay/Climb';
import Shooting from '../screens/DataDisplay/Shooting';
import Defense from '../screens/DataDisplay/Defense';
import Autonomous from '../screens/DataDisplay/Autonomous';

const Stack = createNativeStackNavigator();
const DisplayContainer = () => {
  return (
    <Stack.Navigator initialRouteName='displayMenu'>
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Display Menu'}} name = "displayMenu" component = {DisplayMenu} />
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Shooting'}} name = "Shooting" component = {Shooting} />
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Defense'}} name = "Defense" component = {Defense} />
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Climb'}} name = "Climb" component = {Climb} />
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Autonomous'}} name = "Auto" component = {Autonomous} />
    </Stack.Navigator>
  
  )
}

export default DisplayContainer

const styles = StyleSheet.create({})