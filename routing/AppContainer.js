import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// importing pages
import Home from '../screens/Home';
import DataCollect from '../screens/DataCollect';
import DisplayContainer from './DisplayContainer';
import Pitscouting from '../screens/Pitscouting/Pitscouting';

const Stack = createNativeStackNavigator();
const AppContainer = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen options = {{headerShown: true, headerTitle: 'home'}} name = "Home" component = {Home} />
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Data Input'}} name = "DataCollect" component = {DataCollect} />
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Pitscouting'}} name = "Pits" component = {Pitscouting} />
      <Stack.Screen options = {{headerShown: true}} name = "DisplayContainer" component = {DisplayContainer} />
    </Stack.Navigator>
  
  )
}

export default AppContainer

const styles = StyleSheet.create({})