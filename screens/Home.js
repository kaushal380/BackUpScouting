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

    const createTableMatchData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                +"matchDataDownload "
                +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, matchNum TEXT, teamNum TEXT, taxi TEXT, humanShot TEXT, autoLowerCargo INTEGER, autoUpperCargo INTEGER, teleLowerCargo INTEGER, teleUpperCargo INTEGER, climb TEXT, drivetrainranking INTEGER, defenseRanking INTEGER, redCard INTEGER, yelloCard INTEGER, techFouls INTEGER, deactivated TEXT, disqualified TEXT, extraComments TEXT);"
            )
        })
    }

    const downloadMatchData = async() => {
        createTableMatchData()
        let existingData;
        try{
        const documentSnapshot = await firebase.firestore()
        .collection('data')
        .doc('matchData')
        .get()
        .then(
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM matchDataDownload"
                )
            })
        )

        existingData = Object.values(Object.seal(documentSnapshot.data()))
        }
        catch(e){
            alert(e);
            return;
        }

        existingData.forEach(element => {
            insertData(element);
        });
        
        getMatchDownload();
    }

    const insertData = (currentObject) => {
        let match =  currentObject.matchNum;
        let Team = currentObject.teamNum;
        let taxiToString = currentObject.taxi;
        let humanShotToText = currentObject.humanShot;
        let autoLower = currentObject.autoLowerCargo;
        let AutoUpper = currentObject.autoUpperCargo;
        let TeleLower = currentObject.teleLowerCargo;
        let TeleUpper = currentObject.teleUpperCargo;
        let hanger = currentObject.climb;
        let Drivetrainranking = currentObject.drivetrainranking;
        let DefenseRanking = currentObject.defenseRanking;
        let RedCard = currentObject.redCard;
        let YelloCard = currentObject.yelloCard;
        let techFoul = currentObject.techFouls;
        let isDeactivatedToString = currentObject.deactivated;
        let isDisqualifiedToString = currentObject.disqualified;
        let comments = currentObject.extraComments;

        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO matchDataDownload (matchNum, teamNum, taxi, humanShot, autoLowerCargo, autoUpperCargo, teleLowerCargo, teleUpperCargo, climb, drivetrainranking, defenseRanking, redCard, yelloCard, techFouls, deactivated, disqualified, extraComments) VALUES ('" + match + "', '" + Team + "', '" + taxiToString + "', '" + humanShotToText + "', '" + autoLower + "', '" + AutoUpper + "', '" + TeleLower + "', '" + TeleUpper + "', '" + hanger + "', '" + Drivetrainranking + "', '" + DefenseRanking + "','" + RedCard + "','" + YelloCard + "','" + techFoul + "','" + isDeactivatedToString + "','" + isDisqualifiedToString + "','" + comments + "')"
            )
        })
    }
    // const createTablePitScoutingData = () => {
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             "CREATE TABLE IF NOT EXISTS "
    //             +"pitScoutingDownload "
    //             +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, matchNum TEXT, teamNum TEXT, taxi TEXT, humanShot TEXT, autoLowerCargo INTEGER, autoUpperCargo INTEGER, teleLowerCargo INTEGER, teleUpperCargo INTEGER, climb TEXT, drivetrainranking INTEGER, defenseRanking INTEGER, redCard INTEGER, yelloCard INTEGER, techFouls INTEGER, deactivated TEXT, disqualified TEXT, extraComments TEXT);"
    //         )
    //     })
    // }
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
    const getMatchDownload = () => {
        let sqlList
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM matchDataDownload', [],
                (tx, results) => {
                    console.log('results length: ', results.rows.length);
                    console.log("Query successful")
                    console.log(results.rows._array);
                    // sqlList = results.rows._array;
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
                    style={styles.synchButton}
                    onPress={getDBData}
                >
                    {/* <Text style={styles.Buttontext}>Upload</Text> */}
                    <AntDesign name='upload' size={25} color = "white"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.synchButton}
                    onPress = {downloadMatchData}
                >
                    {/* <Text style={styles.Buttontext}>Upload</Text> */}
                    <AntDesign name= 'download' size={25} color = "white"/>
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
        marginVertical: 10,
    },
    synchContainer: {
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-evenly',
        
    },
    synchButton: {
        backgroundColor: "#0782F9",
        width: 60,
        justifyContent:'center',
        alignItems: 'center',
        height: 60,
        marginTop: 20,
        borderRadius: 50,
    }
});