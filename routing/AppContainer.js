import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Platform } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// importing pages
import Home from '../screens/Home';
import DataCollect from '../screens/DataCollect';
import DisplayContainer from './DisplayContainer';
import DisplayMenu from '../screens/DataDisplay/DisplayMenu';
import Pitscouting from '../screens/Pitscouting/Pitscouting';
import Login from '../screens/loginScreen/Login';
import PictureCollect from '../screens/picturesCollect/PictureCollect'
const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const [isDisplayHeaderShown, setDisplayShow] = useState(false);
  const handleDeviceBoolean =() => {
  if(Platform.OS === 'ios'){
    setDisplayShow(true)
  }
}
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen options = {{headerShown: true, headerTitle: 'login'}} name = "login" component={Login}/>
      <Stack.Screen options = {{headerShown: true, headerTitle: 'home', headerBackVisible: false}} name = "Home" component = {Home} />
      <Stack.Screen options = {{headerShown: true, headerTitle: 'pictures'}} name = "picture" component={PictureCollect}/>
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Data Input'}} name = "DataCollect" component = {DataCollect} />
      <Stack.Screen options = {{headerShown: true, headerTitle: 'Pitscouting'}} name = "Pits" component = {Pitscouting} />
      <Stack.Screen options = {{headerShown: isDisplayHeaderShown}} name = "DisplayContainer" component = {DisplayContainer} />
    </Stack.Navigator>
  
  )
}

export default AppContainer

const styles = StyleSheet.create({})