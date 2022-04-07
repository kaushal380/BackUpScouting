import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../../firebase/config';
import { SwipeListView } from 'react-native-swipe-list-view'
import TeamSpecificData from '../TeamSpecificData';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("scoutingApp.db");

const TeleLowerCargo = () => {
  const [rawData, setRawData] = useState([]);
  const [list, setList] = useState([]);
  const [averageColor, setAverageColor] = useState("white");
  const [ConsistencyColor, setConsistencyColor] = useState("white");
  const [isTeamDataVisible, setTeamDataVisible] = useState(false)
  const [currentSelectedTeam, setSelectedTeam] = useState();
  const [keyword, setKeyword] = useState("");

  const handleSortType = (type) => {
    let selectedColor = "#0782F9"
    let selectedType = ""
    if(type === "consistency"){
      selectedType = "consistency";
      setConsistencyColor(selectedColor)
      setAverageColor("white")
    }
    if(type === "average"){
      selectedType = "average";
      setConsistencyColor("white")
      setAverageColor(selectedColor)
    }

    setVisibleList(selectedType);
  }

  const getDBData = async() => {
    const documentSnapshot = await firebase.firestore()
      .collection("macon2022")
      .doc("matchScouting")
      .get()
    
    let existingData = Object.values(Object.seal(documentSnapshot.data()))
    setRawData(existingData);
  }

  const getFilteredTeamData = (team) => {
    let raw = rawData;
    let filteredTeamData = []
    for (let index = 0; index < raw.length; index++) {
      if(raw[index].teamNum === team){
        filteredTeamData = [...filteredTeamData, raw[index]]
      }
    }
    return filteredTeamData;
  }

  const getMatches = (team) => {
    let raw = rawData;
    let matches = []
    for (let index = 0; index < raw.length; index++) {
      if(raw[index].teamNum === team){
        matches = [...matches, raw[index].matchNum]
      }
    }
    matches = [...new Set(matches)];
    return matches;
  }

  const assignShooterObject = () => {
    getDBData()
    let raw = rawData
    let teams = []
    let assignAverageList = []
    for (let index = 0; index < raw.length; index++) {
      teams = [...teams, raw[index].teamNum];
    }
    teams = [... new Set(teams)]

    for (let index = 0; index < teams.length; index++) {
      let counter = 0
      let total = 0
      let totalDistance = 0
      let distanceCounter = 0
      let team = teams[index]
      let filteredTeamData = getFilteredTeamData(team)
      let matches = getMatches(team)

      let perMatchAverage = []
      for (let index = 0; index < matches.length; index++) {
        let total = 0
        let counter = 0
        for (let i = 0; i < filteredTeamData.length; i++) {
          if(filteredTeamData[i].matchNum === matches[index]){
            total = total+filteredTeamData[i].teleLowerCargo;
            counter++
          }
        }
        let average = total/counter;
        perMatchAverage = [...perMatchAverage, average];
      }
      
      for (let index = 0; index < perMatchAverage.length; index++) {
        total = total + perMatchAverage[index];
        counter++;
      }
      let average = total/counter;

      let distancesFromAverage = []
      for(let c = 0; c < perMatchAverage.length; c++) {
        let distance = Math.abs(perMatchAverage[c] - average)
        distancesFromAverage = [...distancesFromAverage, distance]
      }
      
      for (let index = 0; index < distancesFromAverage.length; index++) {
        totalDistance = totalDistance+distancesFromAverage[index];
        distanceCounter++;
      }
      let consistency = totalDistance/distanceCounter

      let obj = {
        team: teams[index],
        avg: average,
        consis: consistency
      }
      assignAverageList = [...assignAverageList, obj];
    }
    return assignAverageList;
  }

  const setVisibleList = (type) => {
    let objectList = assignShooterObject();
    let averageNums = []
    let consistentNums = []
    let Finallist = []
    for (let index = 0; index < objectList.length; index++) {
      averageNums = [...averageNums, objectList[index].avg]
      consistentNums = [...consistentNums, objectList[index].consis]
    }

    averageNums = averageNums.sort(function(a,b) {return b-a})
    averageNums = [... new Set(averageNums)];
    consistentNums = consistentNums.sort(function(a,b) {return a-b})
    consistentNums = [... new Set(consistentNums)]

    if(type === "average"){
      for (let index = 0; index < averageNums.length; index++) {
        for(let i = 0; i< objectList.length; i++){
          if(averageNums[index] === objectList[i].avg){
            Finallist = [...Finallist, objectList[i]]
          }
        }
      }
    }
    if(type === "consistency"){
      for (let index = 0; index < consistentNums.length; index++) {
        for(let i = 0; i< objectList.length; i++){
          if(consistentNums[index] === objectList[i].consis){
            Finallist = [...Finallist, objectList[i]]
          }
        }
      }
    }

    setList(Finallist)
  }

  const handleModalOpen = (team) => {
    setSelectedTeam(team)
    setTeamDataVisible(true)
  }
  if(list === null){
    return <Text>Loading items...</Text>
  }
  else{
    let data = []
    data = list
    data = data.filter(element => {

      let key = keyword;
      let length = key.length;
      return element.team.substring(0, length).includes(keyword)
    })
  return (
    <View style = {styles.container}>
      <View style = {{flexDirection: 'row', marginTop: 20}}>
      <Text style = {{fontSize: 35}}>sort: </Text>
      <TouchableOpacity 
          style = {{backgroundColor: averageColor, 
          borderRadius: 5, 
          width: 100, height: 30, 
          marginRight: 10, marginTop: 10,
          justifyContent: 'center', alignItems: 'center'}}
          
          onPress={() => {handleSortType("average")}}
      >
          <Text>average</Text>
      </TouchableOpacity>

      <TouchableOpacity 
          style = {{backgroundColor: ConsistencyColor, 
          borderRadius: 5, 
          width: 100, height: 30, 
          marginRight: 10, marginTop: 10,
          justifyContent: 'center', alignItems: 'center'}}
          
          onPress={() => {handleSortType("consistency")}}
      >
          <Text>consistency</Text>
      </TouchableOpacity>
      </View>
      <TextInput style={styles.SearchtextInput} placeholder="Search by Team #" value={keyword} onChangeText={text => setKeyword(text)} keyboardType="number-pad" maxLength={4}/>
      <SwipeListView 
            data = {data}
            
            renderItem = {(data) => {
            return(
                <TouchableOpacity
                    style = {styles.ListView}
                    onPress = {() => {handleModalOpen(data.item.team)}}
                >
                    <>
                        <Text style = {{fontSize: 20, color: 'white'}}>team Number: {data.item.team}</Text>
                        <Text>average: {data.item.avg}</Text>
                        <Text>consistency: {data.item.consis}</Text>
                    </>
                </TouchableOpacity>
            )
            }}
        />

        <Modal
          visible = {isTeamDataVisible}
        >
            <TeamSpecificData
            currentTeam={currentSelectedTeam}
            rawData = {rawData}
            setModal = {setTeamDataVisible}
            />
      </Modal>
    </View>
  )
  }
}

export default TeleLowerCargo

const styles = StyleSheet.create({
  container: {
    marginLeft: 20
  },
  ListView: {
    backgroundColor: '#0782F9',
    minHeight: 105,
    width: 350,
    padding: 15,
    justifyContent: 'space-around',
    marginBottom: 10,
    borderRadius: 10
    },
    SearchtextInput: {
      borderWidth: 2,
      marginVertical: 20, 
      width: 300,
      height: 45,
      padding: 10,
      alignSelf: 'flex-start'
    }
})