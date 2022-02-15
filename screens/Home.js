import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Switch, ScrollView } from 'react-native';
import React, {useState} from 'react';
import {AntDesign, Entypo} from "@expo/vector-icons"
import { Slider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import DataCollect from './DataCollect';
import { firebase } from '../firebase/config';

const Home = () => {
    const firebaseAccess = firebase.firestore()
    const navigation = useNavigation();

    const clearFireBase = () => {
        firebaseAccess
            .collection('data')
            .doc('matchData')
            .set({})
    }
    return(
    <View style = {styles.container}>
        <Text style = {styles.title} onPress = {clearFireBase}>
            Techno Titans
        </Text>
        <View style = {styles.buttonView}>
        <TouchableOpacity
            style = {styles.ButtonsContainer}
            onPress = {() => {navigation.navigate('DataCollect')}}
        >
            <Text style = {styles.Buttontext}>
                Scout Data
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.ButtonsContainer}
            onPress = {() => {navigation.navigate('Pits')}}
        >
            <Text style = {styles.Buttontext}>
                pit scouting
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.ButtonsContainer}
            onPress = {() => {navigation.navigate('DisplayContainer')}}
        >
            <Text style = {styles.Buttontext}>
                View Data
            </Text>
        </TouchableOpacity>

        </View>
    </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
      
    },
    buttonView: {
        marginTop: 150
    },

    ButtonsContainer: {
        backgroundColor: "#0782F9",
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 10,
        marginTop: 20
    },
    Buttontext: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700'
    },
    title: {
        fontSize: 40,
        marginTop: 10,
    }
  });