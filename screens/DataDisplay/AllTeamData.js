import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { firebase } from '../../firebase/config'
import TeamSpecificData from './TeamSpecificData'
const AllTeamData = () => {
  const [finalData, setFinalData] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [rawData, setRawData] = useState()
  const [modal, setModal] = useState(false)
  const [currentTeam, setCurrentTeam] = useState();
  useLayoutEffect(() => { getEverything() }, []);

  const getEverything = async () => {
    const documentSnapshot = await firebase.firestore()
      .collection('data')
      .doc('matchData')
      .get()

    let raw = Object.values(Object.seal(documentSnapshot.data()));
    setRawData(raw);
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
      matches = [... new Set(matches)]
      data.matches = matches;
      finalData.push(data);
    }
    setFinalData(finalData);
  }

  const handleModalOpen = (currentTeam) => {
    setModal(true)
    setCurrentTeam(currentTeam)
  }

  if (finalData === null) {
    return <Text>Loading...</Text>
  } else {
    let data = finalData;
    data = data.filter(element => {
      let key = keyword;
      let length = key.length;
      return element.team.substring(0, length).includes(keyword)
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
              <TouchableOpacity style={styles.item} onPress = {() => {handleModalOpen(element.team)}}>
                <Text style={styles.text}>
                  Team: {element.team}
                  {"\n"}
                  Matches played: {`${element.matches}`}
                </Text>
              </TouchableOpacity>
            )
          }
        </ScrollView>
        <Modal
        visible = {modal}
        >
          <TeamSpecificData
          rawData={rawData}
          setModal = {setModal}
          currentTeam = {currentTeam}
          />
        </Modal>
      </SafeAreaView>


    )
  }
}

export default AllTeamData

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F1F2"
  },
  item: {
    backgroundColor: '#0782F9',
    padding: 20,
    margin: 10, 
    borderRadius: 20
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  textInput: {
    borderWidth: 2,
    margin: 20,
    height: 45,
    padding: 10
  }
})