import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core';

const DisplayMenu = () => {
    const navigation = useNavigation();
  return (
    <ScrollView>
    <View style = {styles.container}>
      <Text style = {styles.title}>View teams based on: </Text>

    <View style = {styles.buttonView}>
    <TouchableOpacity
            style = {styles.ButtonsContainerAllTeams}
            onPress = {() => {navigation.navigate('allTeams')}}
        >
            <Text style = {styles.Buttontext}>
                All teams
            </Text>
    </TouchableOpacity>

      <TouchableOpacity
            style = {styles.ButtonsContainer}
            onPress = {() => {navigation.navigate('Shooting')}}
        >
            <Text style = {styles.Buttontext}>
                Best Shooters
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.ButtonsContainer}
            onPress = {() => {navigation.navigate('auto')}}
        >
            <Text style = {styles.Buttontext}>
                Best Autonomous
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.ButtonsContainer}
            onPress = {() => {navigation.navigate('Defense')}}
        >
            <Text style = {styles.Buttontext}>
                Best defense
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.ButtonsContainer}
            onPress = {() => {navigation.navigate('Climb')}}
        >
            <Text style = {styles.Buttontext}>
                Best climb
            </Text>
        </TouchableOpacity>
    </View>
    </View>
    </ScrollView>

  )
}

export default DisplayMenu


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
      
    },
    buttonView: {
        marginTop: 50
    },

    ButtonsContainer: {
        backgroundColor: "#0782F9",
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 10,
        marginTop: 20
    },
    ButtonsContainerAllTeams: {
        backgroundColor: "#0782F9",
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 10,
        marginBottom: 60
    },
    Buttontext: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700'
    },
    title: {
        fontSize: 30,
        marginTop: 10,
    }
  });