import React, { useState } from "react";
import {  SafeAreaView, StyleSheet, TextInput, Text, View} from "react-native";
import { Slider } from 'react-native-elements';

const pitScouting = () => {
  const [text, onChangeText] = useState("Enter");
  const [text1, onChangeText1] = useState("Enter");
  const [comments, whatyougottasayaboutem] = useState("Enter");
  const [Visualranking, setvisualranking] = useState(1);
 
  

  return (
    <SafeAreaView>
      <Text style={{alignSelf: 'center', fontSize: 30, fontFamily:"Cochin"}}>---Robot still being worked on---</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
       <Text style={{alignSelf: 'center', fontSize: 30, fontFamily:"Cochin"}}>----Gracious professionalism----</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText1}
        value={text1}
      />
      <Text style={{alignSelf: 'center', fontSize: 30, fontFamily:"Cochin"}}>----Extra comments----</Text>
      <TextInput
        style={styles.input}
        onChangeText={whatyougottasayaboutem}
        value={comments}
      />
      <Text style = {{alignSelf: 'center', marginTop: 60, fontSize: 30, marginRight: 30, fontFamily: "Cochin"}}>
             ---- Visuals ----
         </Text>
         <View style = {{marginTop: 40, alignContent: 'center', marginRight: 40}}> 
         <Text style = {{fontSize: 25}}>Visual Ranking: {Visualranking}</Text>
         <Slider
             value = {Visualranking}
             onValueChange = {(num) => {setvisualranking(num)} }
             minimumValue = {1}
             maximumValue ={5}
             step = {1}
             onSlidingComplete = {(num) => {setvisualranking(num)} }
             allowTouchTrack
             trackStyle = {{height : 10}}
             thumbStyle = {{height : 20, width : 20, backgroundColor : "grey", fontFamily: "Cochin"}}
         />
         </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 30,
    borderWidth: 2,
    padding: 10,

  },
  TitleStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Cochin"
    
    
    
  }
});

export default pitScouting;