import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { firebase } from '../../firebase/config'
import { SwipeListView } from 'react-native-swipe-list-view'
import TeamSpecificData from './TeamSpecificData'

const Autonomous = () => {
  const [finalData, setFinalData] = useState(null);
  const [keyword, setKeyword] = useState("");

  useLayoutEffect(() => { getEverything() }, []);

  const getEverything = async () => {
    const documentSnapshot = await firebase.firestore()
      .collection('data')
      .doc('matchData')
      .get()

    let raw = Object.values(Object.seal(documentSnapshot.data()));

    let teams = [];
    for (let i = 0; i < raw.length; i++) {
      teams.push(raw[i].teamNum);
    }
    teams = [...new Set(teams)];
    let finalData = []
    //Create an object. Team number: matches they played, another team number: matches they played ...
    for (let team of teams) {
      let data = { team: 0, matches: [], AutoUpperCargo: 0, AutoLowerCargo: 0, avg: 0, taxi: false };
      let matches = [];
      let totalUpper = 0;
      let totalLower = 0;
      for (let i in raw) {
        if (team === raw[i].teamNum) {
          data.team = raw[i].teamNum;
          matches.push(raw[i].matchNum);
          totalUpper += raw[i].autoUpperCargo;
          totalLower += raw[i].autoLowerCargo;
          data.taxi = raw[i].taxi;
        }
        data.taxi ? data.avg = ((totalUpper * 4) + (totalLower * 2) + 2) / matches.length : data.avg = ((totalUpper * 4) + (totalLower * 2)) / matches.length
      }

      data.AutoLowerCargo = totalLower;
      data.AutoUpperCargo = totalUpper;
      data.matches = matches;
      finalData.push(data);
    }
    setFinalData(finalData);
  }

  if (finalData === null) {
    return <Text>Loading...</Text>
  } else {
    let data = finalData;
    data = data.filter(element => {
      return element.team.includes(keyword)
    })
    data.sort(function (a, b) {
      if (a.avg > b.avg) {
        return -1;
      }
      if (b.avg > a.avg) {
        return 1;
      }
      return 0;
    })
      
    return (
      <SafeAreaView style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Search by Team #" value={keyword} onChangeText={text => setKeyword(text)} keyboardType="number-pad" maxLength={4}/>
        <ScrollView>
          {
            data.map((element) =>
              <View style={styles.item}>
                <Text style={styles.text}>
                  Team: {element.team}
                  {"\n"}
                  Matches Participated In: {`${element.matches}`}
                  {"\n"}
                  Number of Upper Cargo Shots: {element.AutoUpperCargo}
                  {"\n"}
                  Number of Lower Cargo Shots: {element.AutoLowerCargo}
                  {"\n"}
                  Taxi: {`${element.taxi}`}
                  {"\n"}
                  Average Points: {element.avg}
                </Text>
              </View>
            )
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default Autonomous

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F1F2"
  },
  item: {
    backgroundColor: '#A8A6DE',
    padding: 20,
    margin: 20, 
    borderRadius: 20
  },
  text: {
    fontSize: 14,
  },
  textInput: {
    borderWidth: 2,
    margin: 20,
    height: 25,
  }
})