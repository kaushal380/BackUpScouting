import React, { useState } from "react";
import {  SafeAreaView, StyleSheet, TextInput, Text, View, ScrollView} from "react-native";
import { Slider } from 'react-native-elements';

const PitScouting = () => {
  const [text, onChangeText] = useState("Enter");
  const [text1, onChangeText1] = useState("Enter");
  const [comments, whatyougottasayaboutem] = useState("Enter");
  const [Visualranking, setvisualranking] = useState(1);
 
  

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
  TitleStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Cochin"

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