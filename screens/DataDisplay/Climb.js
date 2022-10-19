import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { firebase } from '../../firebase/config'
import { SwipeListView } from 'react-native-swipe-list-view'
import TeamSpecificData from './TeamSpecificData'
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("scoutingApp.db");

const Climb = () => {
  useEffect(() => {
    initializeRawData()
    setVisibleList("low")
  }, [])

  const [rawData, setRawData] = useState([])
  const [isTeamDataVisible, setTeamDataVisible] = useState(false)
  const [currentSelectedTeam, setSelectedTeam] = useState();
  const [lowColor, setLowColor] = useState("white");
  const [midColor, setMidColor] = useState("white");
  const [highColor, setHighColor] = useState("white");
  const [traversalColor, setTreversalColor] = useState("white");
  const [climbList, setClimbList] = useState([]);
  const [keyword, setKeyword] = useState("");
  

  const handleSortType = (type) => {
    let selectedColor = "#0782F9"
    let selectedType = ""
    if(type === "low"){
        selectedType = "low"
        setLowColor(selectedColor)
        setMidColor("white")
        setHighColor("white")
        setTreversalColor("white")
    }
    if(type === "mid"){
        selectedType = "mid"
        setLowColor("white")
        setMidColor(selectedColor)
        setHighColor("white")
        setTreversalColor("white")
    }
    if(type === "high"){
        selectedType = "high"
        setLowColor("white")
        setMidColor("white")
        setHighColor(selectedColor)
        setTreversalColor("white")
    }
    if(type === "t"){
        selectedType = "traversal"
        setLowColor("white")
        setMidColor("white")
        setHighColor("white")
        setTreversalColor(selectedColor)
    }

    setVisibleList(selectedType)
  }

  const initializeRawData = () => {
    getMatchDownload()
  }

  const getMatchDownload = async() => {

    const documentSnapshot = await firebase.firestore()
      .collection("grits")
      .doc("matchScouting")
      .get()
    
    let existingData = Object.values(Object.seal(documentSnapshot.data()))
    setRawData(existingData);
}

  const setVisibleList = (sortType) => {
    // initializeRawData()

    let ClimbObjects = handleAssignClimb()

    let lowNums = []
    let midNums = []
    let highNums = []
    let traversalNums = []

    for (let index = 0; index < ClimbObjects.length; index++) {
      lowNums = [...lowNums, ClimbObjects[index].low]
      midNums = [...midNums, ClimbObjects[index].mid]
      highNums = [...highNums, ClimbObjects[index].high]
      traversalNums = [...traversalNums, ClimbObjects[index].traversal]
    }

    lowNums = lowNums.sort(function(a,b) {return b-a})
    lowNums = [... new Set(lowNums)];
    midNums = midNums.sort(function(a,b) {return b-a})
    midNums = [... new Set(midNums)];
    highNums = highNums.sort(function(a,b) {return b-a})
    highNums = [... new Set(highNums)];
    traversalNums = traversalNums.sort(function(a,b) {return b-a})
    traversalNums = [... new Set(traversalNums)];
    

    let finalList = []
    if(sortType === "low"){
      for (let index = 0; index < lowNums.length; index++) {
        for (let i = 0; i < ClimbObjects.length; i++) {
          if(lowNums[index]===ClimbObjects[i].low){
            finalList = [...finalList, ClimbObjects[i]]
          }
        }
      }
    }
    else if(sortType === "mid"){
      for (let index = 0; index < midNums.length; index++) {
        for (let i = 0; i < ClimbObjects.length; i++) {
          if(midNums[index]===ClimbObjects[i].mid){
            finalList = [...finalList, ClimbObjects[i]]
          }
        }
      }
    }
    else if(sortType === "high"){
      for (let index = 0; index < highNums.length; index++) {
        for (let i = 0; i < ClimbObjects.length; i++) {
          if(highNums[index]===ClimbObjects[i].high){
            finalList = [...finalList, ClimbObjects[i]]
          }
        }
      }
    }
    else if(sortType === "traversal"){
      for (let index = 0; index < traversalNums.length; index++) {
        for (let i = 0; i < ClimbObjects.length; i++) {
          if(traversalNums[index]===ClimbObjects[i].traversal){
            finalList = [...finalList, ClimbObjects[i]]
          }
        }
      }
    }

    setClimbList(finalList)
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
  const handleAssignClimb = () => {
    let raw = rawData;
    let teams = []
    for (let index = 0; index < raw.length; index++) {
      teams = [...teams, raw[index].teamNum];
    }
    teams = [...new Set(teams)];
    
    let climbData = []
    for (let index = 0; index < teams.length; index++) {
      let team = teams[index]
      
      let filteredTeamData = getFilteredTeamData(team)
      
      let matches = getMatches(team)
      
      let Low = 0
      let mid = 0
      let high = 0
      let Treversals = 0
      for (let index = 0; index < matches.length; index++) {
          let totalLow = 0
          let totalmid = 0
          let totalhigh = 0
          let totalTreversals = 0
          for (let i = 0; i < filteredTeamData.length; i++) {
            if(filteredTeamData[i].matchNum == matches[index]){
              if(filteredTeamData[i].climb === "low"){
                totalLow++;
              }
              else if(filteredTeamData[i].climb === "mid"){
                totalmid++;
              }
              else if(filteredTeamData[i].climb === "high"){
                totalhigh++;
              }
              else if(filteredTeamData[i].climb === "traversal"){
                totalTreversals++;
              }
            }
          }
          let highCheck = 0
          let ClimbType = ""
          let numCheck = [totalLow, totalmid, totalhigh, totalTreversals];

          let arrayCheck = [
            {
              type: 'low',
              num: totalLow,
            },
            {
              type: 'mid',
              num: totalmid,
            },
            {
              type: 'high', 
              num: totalhigh,
            },
            {
              type: 'traversal',
              num: totalTreversals
            },
          ]
          
          for (let index = 0; index < numCheck.length; index++) {
            if(numCheck[index]> highCheck){
              highCheck = numCheck[index]
            }
          }
          
          for (let index = 0; index < arrayCheck.length; index++) {
            if(arrayCheck[index].num === highCheck){
              ClimbType = arrayCheck[index].type
              break;
            }
          }
          
          if(ClimbType === "low"){
            Low++;
          }
          else if(ClimbType === "mid"){
            mid++;
          }
          else if(ClimbType === "high"){
            high++;
          }
          else if(ClimbType === "traversal"){
            Treversals++;
          }
        }
        let obj = {
          team: team,
          low: Low,
          mid: mid,
          high: high,
          traversal: Treversals
        }
        

        climbData = [...climbData, obj];
  }
      return climbData;
  }

  const handleModalOpen = (team) => {
    setSelectedTeam(team)
    setTeamDataVisible(true)
  }

  if(climbList === null){
    return <Text>Loading items...</Text>
  }
  else{
    let data = []
    data = climbList;
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
          style = {{backgroundColor: lowColor, 
          borderRadius: 5, 
          width: 50, height: 30, 
          marginRight: 10, marginTop: 10,
          justifyContent: 'center', alignItems: 'center'}}
          
          onPress={() => {handleSortType("low")}}
      >
          <Text>low</Text>
      </TouchableOpacity>

      <TouchableOpacity 
          style = {{backgroundColor: midColor, 
          borderRadius: 5, 
          width: 50, height: 30, 
          marginRight: 10, marginTop: 10,
          justifyContent: 'center', alignItems: 'center'}}
          
          onPress={() => {handleSortType("mid")}}
      >
          <Text>mid</Text>
      </TouchableOpacity>

      <TouchableOpacity 
          style = {{backgroundColor: highColor, 
          borderRadius: 5, 
          width: 50, height: 30, 
          marginRight: 10, marginTop: 10,
          justifyContent: 'center', alignItems: 'center'}}
          
          onPress={() => {handleSortType("high")}}
      >
          <Text>high</Text>
      </TouchableOpacity>

      <TouchableOpacity 
          style = {{backgroundColor: traversalColor, 
          borderRadius: 5, 
          width: 90, height: 30, 
          marginRight: 10, marginTop: 10,
          justifyContent: 'center', alignItems: 'center'}}
          
          onPress={() => {handleSortType("t")}}
      >
          <Text>traversal</Text>
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
                        <Text>Total low: {data.item.low}</Text>
                        <Text>Total mid: {data.item.mid}</Text>
                        <Text>Total high: {data.item.high}</Text>
                        <Text>Total traversal: {data.item.traversal}</Text>
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

export default Climb

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
      
    }
})