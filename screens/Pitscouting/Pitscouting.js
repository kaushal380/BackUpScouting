import React, { useState } from "react";
import {  TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Text, View, ScrollView} from "react-native";
import { Slider } from 'react-native-elements';
import Climb from "../DataDisplay/Climb";

const PitScouting = () => {
  const [text, onChangeText] = useState("Enter");
  const [text1, onChangeText1] = useState("Enter");
  const [comments, whatyougottasayaboutem] = useState("Enter");
  const [Visualranking, setvisualranking] = useState(1);
  const [holonomic, setholonomic] = useState("white")
  const [nonholonomic, setnonholonmic] = useState("white")
  const [YesC, setYesC] = useState("white")
  const [NoC, setNoC] = useState("white")
  const [YesS, setYesS] = useState("white")
  const [NoS, setNoS] = useState("white")
  const drivetraintype = (type) => {
    let selectedcolor = "#0782F9"

    if(type === "holonomic"){
      setholonomic(selectedcolor)
      setnonholonmic("white")

    }
    if(type === "nonholonomic"){
      setholonomic("white")
      setnonholonmic(selectedcolor)

    }
  }

  const condition = (type) => {
    let selectedcolor1 = "#0782F9"
      if(type === "Yes"){
        setYesC(selectedcolor1)
        setNoC("white")

      }
      if(type === "No"){
        setYesC("white")
        setNoC(selectedcolor1)
      }


    }
    const condition1 = (type) => {
      let selectedcolor2 = "#0782F9"
        if(type === "Yes"){
          setYesS(selectedcolor2)
          setNoS("white")
  
        }
        if(type === "No"){
          setYesS("white")
          setNoS(selectedcolor2)
        }
  
  
      }
    

  

  

  return (
    <ScrollView>
    <SafeAreaView>
      
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
         
         <Text style = {{alignSelf: 'center', marginTop: 20, fontSize: 30}}>
             ----What type of drivetrain----
         </Text>

         <View style = {{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>

         <TouchableOpacity 
                     style = {{backgroundColor: holonomic, 
                     borderRadius: 5, 
                     width: 100, height: 30, 
                     marginRight: 10, marginTop: 10,
                     justifyContent: 'center', alignItems: 'center'}}
                     
                     onPress={() => {drivetraintype("holonomic")}}
                 >
                     <Text>holonomic</Text>
                 </TouchableOpacity>


                 <TouchableOpacity 
                     style = {{backgroundColor: nonholonomic, 
                     borderRadius: 5, 
                     width: 100, height: 30, 
                     marginRight: 10, marginTop: 10,
                     justifyContent: 'center', alignItems: 'center'}}
                     
                     onPress={() => {drivetraintype("nonholonomic")}}
                 >
                     <Text>nonholonomic</Text>
                 </TouchableOpacity>
            </View>

            <Text style = {styles.subHeader}>
             ----Climb----
         </Text>
         <View style = {{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>

         <TouchableOpacity 
                     style = {{backgroundColor: YesC, 
                     borderRadius: 5, 
                     width: 100, height: 30, 
                     marginRight: 10, marginTop: 10,
                     justifyContent: 'center', alignItems: 'center'}}
                     
                     onPress={() => {condition("Yes")}}
                 >
                     <Text>Yes</Text>
                 </TouchableOpacity>
          <TouchableOpacity 
                     style = {{backgroundColor: NoC, 
                     borderRadius: 5, 
                     width: 100, height: 30, 
                     marginRight: 10, marginTop: 10,
                     justifyContent: 'center', alignItems: 'center'}}
                     
                     onPress={() => {condition("No")}}
                 >
                     <Text>No</Text>
                 </TouchableOpacity>
          </View>

          <Text style = {styles.subHeader}>
             ----Shooter----
         </Text>
         <View style = {{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>

         <TouchableOpacity 
                     style = {{backgroundColor: YesS, 
                     borderRadius: 5, 
                     width: 100, height: 30, 
                     marginRight: 10, marginTop: 10,
                     justifyContent: 'center', alignItems: 'center'}}
                     
                     onPress={() => {condition1("Yes")}}
                 >
                     <Text>Yes</Text>
                 </TouchableOpacity>
          <TouchableOpacity 
                     style = {{backgroundColor: NoS, 
                     borderRadius: 5, 
                     width: 100, height: 30, 
                     marginRight: 10, marginTop: 10,
                     justifyContent: 'center', alignItems: 'center'}}
                     
                     onPress={() => {condition1("No")}}
                 >
                     <Text>No</Text>
                 </TouchableOpacity>
          </View>

         
         <Text style = {styles.subHeader}>
             ---- General Comments ----
         </Text>
      <Text style={styles.textBoxComment}>Robot still being worked on</Text>
      <TextInput
        style={styles.input}
        multiline
        onChangeText={onChangeText}
        value={text}
      />
       <Text style={styles.textBoxComment}>Gracious professionalism</Text>
      <TextInput
        style={styles.input}
        multiline
        onChangeText={onChangeText1}
        value={text1}
      />
      <Text style={styles.textBoxComment}>Extra comments</Text>
      <TextInput
        style={styles.input}
        multiline
        onChangeText={whatyougottasayaboutem}
        value={comments}
      />
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
  }
});

export default PitScouting;