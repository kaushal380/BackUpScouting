import React, { useState } from "react";
import { TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Slider } from 'react-native-elements';
import { AntDesign, Entypo } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/core';
import { firebase } from "../../firebase/config";

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("scoutingApp.db");

const PitScouting = () => {
  const navigation = useNavigation();
  const firebaseAccess = firebase.firestore();
  const [text, onChangeText] = useState("");
  const [text1, onChangeText1] = useState("");
  const [comments, whatyougottasayaboutem] = useState("");
  const [Visualranking, setvisualranking] = useState(1);
  const [holonomic, setholonomic] = useState("white");
  const [nonholonomic, setnonholonmic] = useState("white");
  const [YesC, setYesC] = useState("white");
  const [NoC, setNoC] = useState("white");
  const [YesS, setYesS] = useState("white");
  const [NoS, setNoS] = useState("white");
  const [drivetrain, SetDrivetrain] = useState("");
  const [climbExists, setClimbExsists] = useState("nope")
  const [shooterExists, setShooterExists] = useState("nope")
  const [team, setTeam] = useState("");

  const drivetraintype = (type) => {
    let selectedcolor = "#0782F9"

    if (type === "holonomic") {
      setholonomic(selectedcolor)
      setnonholonmic("white");
      SetDrivetrain("holonomic");

    }
    if (type === "nonholonomic") {
      setholonomic("white")
      setnonholonmic(selectedcolor)
      SetDrivetrain("non-holonomic")
    }
  }

  const handlePitSubmit = () => {
    createPitScoutingTable();
    let obj = 
    [
    {
      teamNum: team,
      visuals: Visualranking,
      drivetrainType: drivetrain, 
      climbExist: climbExists,
      shooterExist: shooterExists,
      robotStatus: text,
      graciousProfessionalism: text1,
      extraComments: comments
    }
  ]


  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO pitscouting (teamNum, visuals, drivetrainType, climbExists, shooterExists, robotStatus, graciousProfessionalism, extraComments) VALUES ('" + team + "', '" + Visualranking + "', '" + drivetrain + "', '" + climbExists + "', '" + shooterExists + "', '" + text + "', '" + text1 + "', '" + comments + "')"
    )
    
  })
    // console.log(obj);
    getDBData();
    handleCancel()
  }

  const handleCancel = () => {
    navigation.navigate('Home');
  }
  const getDBData = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM pitscouting', [],
            (tx, results) => {
            console.log('results length: ', results.rows.length); 
            console.log("Query successful")
            console.log(results.rows);
        })
    })
 
}
const createPitScoutingTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        +"pitscouting "
        +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, teamNum TEXT, visuals INTEGER, drivetrainType TEXT, climbExists TEXT, shooterExists TEXT, robotStatus TEXT, graciousProfessionalism TEXT, extraComments TEXT);"
    )
}) 
}


  const checkClimb = (type) => {
    let selectedcolor1 = "#0782F9"
    if (type === "Yes") {
      setYesC(selectedcolor1)
      setNoC("white")
      setClimbExsists("yes")
    }
    if (type === "No") {
      setYesC("white")
      setNoC(selectedcolor1)
      setClimbExsists("nope")
    }
  }
  const checkShooter = (type) => {
    let selectedcolor2 = "#0782F9"
    if (type === "Yes") {
      setYesS(selectedcolor2)
      setNoS("white")
      setShooterExists("yes")
    }
    if (type === "No") {
      setYesS("white")
      setNoS(selectedcolor2)
      setShooterExists("nope")
    }
  }


  return (
    <ScrollView>
      <SafeAreaView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding" // try padding for ios maybe?
        >
        
        <TextInput
                 placeholder = "Team #"
                 keyboardType= "number-pad"
                 value = {team}
                 onChangeText = {text => setTeam(text)}
                 style = {styles.Teaminput}                   
         />
        
      <Text style = {{alignSelf: 'center', marginTop: 20, fontSize: 30}}>
             ---- Visuals ----
         </Text>
         <View style = {{marginTop: 35, alignContent: 'center', marginRight: 40}}> 
         <Text style = {{fontSize: 25, marginLeft: 40}}>Visual Ranking: {Visualranking}</Text>
         <Slider
            style = {{marginLeft: 40}}
             value = {Visualranking}
             onValueChange = {(num) => {setvisualranking(num)} }
             minimumValue = {1}
             maximumValue ={5}
             step = {1}
             onSlidingComplete = {(num) => {setvisualranking(num)} }
             allowTouchTrack
             trackStyle = {{height : 10}}
             thumbStyle = {{height : 20, width : 20, backgroundColor : "grey"}}
         />
         </View>
          <Text style={styles.subHeader}>
            ----Mechanisms----
          </Text>

          <View style={styles.mechRow}>
            <Text style={styles.mechText}>drivetrain: </Text>
            <TouchableOpacity
              style={{
                backgroundColor: holonomic,
                borderRadius: 5,
                width: 100, height: 30,
                marginRight: 10, marginTop: 10,
                justifyContent: 'center', alignItems: 'center'
              }}

              onPress={() => { drivetraintype("holonomic") }}
            >
              <Text>holonomic</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={{
                backgroundColor: nonholonomic,
                borderRadius: 5,
                width: 100, height: 30,
                marginRight: 10, marginTop: 10,
                justifyContent: 'center', alignItems: 'center'
              }}

              onPress={() => { drivetraintype("nonholonomic") }}
            >
              <Text>nonholonomic</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.mechRow}>
            <Text style={styles.mechText}>Climb: </Text>
            <TouchableOpacity
              style={{
                backgroundColor: YesC,
                borderRadius: 5,
                width: 70, height: 30,
                marginRight: 10, marginTop: 10,
                justifyContent: 'center', alignItems: 'center'
              }}

              onPress={() => { checkClimb("Yes") }}
            >
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: NoC,
                borderRadius: 5,
                width: 70, height: 30,
                marginRight: 10, marginTop: 10,
                justifyContent: 'center', alignItems: 'center'
              }}

              onPress={() => { checkClimb("No") }}
            >
              <Text>No</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.mechRow}>
            <Text style={styles.mechText}>Shooter: </Text>
            <TouchableOpacity
              style={{
                backgroundColor: YesS,
                borderRadius: 5,
                width: 70, height: 30,
                marginRight: 10, marginTop: 10,
                justifyContent: 'center', alignItems: 'center'
              }}

              onPress={() => { checkShooter("Yes") }}
            >
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: NoS,
                borderRadius: 5,
                width: 70, height: 30,
                marginRight: 10, marginTop: 10,
                justifyContent: 'center', alignItems: 'center'
              }}

              onPress={() => { checkShooter("No") }}
            >
              <Text>No</Text>
            </TouchableOpacity>
          </View>


          <Text style={styles.subHeader}>
            ---- General Comments ----
          </Text>
          <Text style={styles.textBoxComment}>Robot still being worked on</Text>
          <TextInput
            placeholder="enter"
            style={styles.input}
            multiline
            onChangeText={onChangeText}
            value={text}
          />
          <Text style={styles.textBoxComment}>Gracious professionalism</Text>
          <TextInput
            placeholder="enter"
            style={styles.input}
            multiline
            onChangeText={onChangeText1}
            value={text1}
          />
          <Text style={styles.textBoxComment}>Extra comments</Text>
          <TextInput
            placeholder="enter"
            style={styles.input}
            multiline
            onChangeText={whatyougottasayaboutem}
            value={comments}
          />

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>

            <AntDesign name='close' size={45} color={'#0782F9'} style={{ marginRight: 60 }} onPress={handleCancel} />
            <AntDesign name='check' size={45} color={'#0782F9'} style={{ marginLeft: 60 }} onPress={() => { handlePitSubmit() }} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 100,
    margin: 30,
    borderWidth: 2,
    padding: 10,

  },

  textBoxComment: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginLeft: 30,
    marginBottom: -20
  },
  subHeader: {
    alignSelf: 'center',
    marginVertical: 40,
    fontSize: 30,
  },
  mechRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 45,
    marginVertical: 15
  },
  mechText: {
    fontSize: 20,
    marginTop: 10,
    marginRight: 15
  },
  Teaminput: {
    height: 50,
    margin: 30,
    borderWidth: 2,
    padding: 10, 
},
});

export default PitScouting;