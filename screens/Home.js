import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Entypo } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/core';
import DataCollect from './DataCollect';
import { firebase } from '../firebase/config';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("scoutingApp.db");

const Home = () => {
    const firebaseAccess = firebase.firestore()
    const navigation = useNavigation();

    const clearFireBase = () => {
        firebaseAccess
            .collection('data')
            .doc('matchData')
            .set({})
    }
    const addNewData = async (newList) => {
        const documentSnapshot = await firebase.firestore()
            .collection('data')
            .doc('matchData')
            .get()


        let existingData = Object.values(Object.seal(documentSnapshot.data()))

        let finalList = existingData.concat(newList)

        let finalObject = Object.assign({}, finalList)

        firebaseAccess
            .collection('data')
            .doc('matchData')
            .set(finalObject)
            .then(clearDBData)

    }
    const getDBData = () => {
        let sqlList
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM dataCollect', [],
                (tx, results) => {
                    console.log('results length: ', results.rows.length);
                    console.log("Query successful")
                    addNewData(results.rows._array);
                    sqlList = results.rows._array;
                })
        })

    }
    const clearDBData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM dataCollect"
            )
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title} onPress={clearFireBase}>
                Techno Titans
            </Text>

            <View style={styles.synchContainer}>
                <TouchableOpacity
                    style={styles.ButtonsContainer}
                    onPress={getDBData}
                >
                    <Text style={styles.Buttontext}>Upload Match Data</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.ButtonsContainer}
                    onPress={() => { navigation.navigate('DataCollect') }}
                >
                    <Text style={styles.Buttontext}>
                        Scout Data
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.ButtonsContainer}
                    onPress={() => { navigation.navigate('Pits') }}
                >
                    <Text style={styles.Buttontext}>
                        pit scouting
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.ButtonsContainer}
                    onPress={() => { navigation.navigate('DisplayContainer') }}
                >
                    <Text style={styles.Buttontext}>
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
        marginTop: 50
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
    },
    synchContainer: {
        flexDirection: 'row'
    }
});