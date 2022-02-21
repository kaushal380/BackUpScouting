import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { firebase } from '../../firebase/config'
import TeamSpecificData from './TeamSpecificData';

const Autonomous = () => {

  const [rawData, setRawData] = useState([])
  const [PointsColor, setPointsColor] = useState("white");
  const [UpperColor, setUpperColor] = useState("white");
  const [LowerColor, setLowerColor] = useState("white");
  const [autoList, setAutoList] = useState([])
  const [isModalVisible, setModal] = useState(false);
  const [currentTeam, setCurrentTeam] = useState();
  const [keyword, setKeyword] = useState("");

  const getDBData = async () => {
    const documentSnapshot = await firebase.firestore()
    .collection('data')
    .doc('matchData')
    .get()

    let raw = Object.values(Object.seal(documentSnapshot.data()))
    setRawData(raw);
  }

  const handleSortType = (type) => {
    let selectedColor = "#0782F9"
    let selectedType = ""
    if(type === "lower"){
        selectedType = "lower"
        setLowerColor(selectedColor)
        setUpperColor("white")
        setPointsColor("white")
    }
    if(type === "upper"){
        selectedType = "upper"
        setUpperColor(selectedColor)
        setLowerColor("white")
        setPointsColor("white")
    }
    if(type === "points"){
        selectedType = "points"
        setUpperColor("white")
        setLowerColor("white")
        setPointsColor(selectedColor)
    }
    setVisibleList(selectedType);
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

  const setVisibleList = (type) => {
    let getAssignedObjects = assignAutoObjects();
    let avgPoints = []
    let avgLower = []
    let avgUpper = []
    let finalList = []
    for (let index = 0; index < getAssignedObjects.length; index++) {
        avgPoints = [...avgPoints, getAssignedObjects[index].pointsScored]
        avgLower = [...avgLower, getAssignedObjects[index].lowerGoal]
        avgUpper = [...avgUpper, getAssignedObjects[index].upperGoal]
    }

    avgPoints = avgPoints.sort(function(a, b){return b-a});
    avgPoints = [... new Set(avgPoints)];
    avgLower = avgLower.sort(function(a,b) {return b-a});
    avgLower = [... new Set(avgLower)];
    avgUpper = avgUpper.sort(function(a, b){return b-a});
    avgUpper = [... new Set(avgUpper)];

    if(type === "points"){
        avgPoints.forEach(element => {
            getAssignedObjects.forEach(i => {
                if(element === i.pointsScored){
                    finalList = [...finalList, i];
                }
            })
        });
    }
    if(type === "upper"){
        avgUpper.forEach(element => {
            getAssignedObjects.forEach(i => {
                if(element === i.upperGoal){
                    finalList = [...finalList, i];
                }
            })
        });
    }
    if(type === "lower"){
        avgLower.forEach(element => {
            getAssignedObjects.forEach(i => {
                if(element === i.lowerGoal){
                    finalList = [...finalList, i];
                }
            })
        });
    }
    setAutoList(finalList)
    // console.log(autoList)
  }

  const assignAutoObjects = () => {
      getDBData();
      let raw = rawData;
      let teams = []

      for (let index = 0; index < raw.length; index++) {
          teams = [...teams, raw[index].teamNum];
      }
      teams = [... new Set(teams)];
      let assignedOgbjects = []
      for (let index = 0; index < teams.length; index++) {
          let team = teams[index]
          let filteredTeamData = getFilteredTeamData(team)
          let matches = getMatches(team)
          
          let TotalLower = 0
          let TotalUpper = 0
          let totalTaxi = 0;
          let counter = 0
          let points = 0

          for (let index = 0; index < filteredTeamData.length; index++) {
              TotalLower = TotalLower + filteredTeamData[index].autoLowerCargo;
              TotalUpper = TotalUpper + filteredTeamData[index].autoUpperCargo;
              counter++;
          }
          let averageLower = TotalLower/counter;
          let averageUpper = TotalUpper/counter;

          for (let index = 0; index < matches.length; index++) {
              let taxiYesCounter = 0;
              let taxiNoCounter = 0;
              for(let i = 0; i < filteredTeamData.length; i++){
                if(filteredTeamData[i].taxi){
                    taxiYesCounter++;
                }
                else{
                    taxiNoCounter++;
                }
              }
              if(taxiYesCounter>taxiNoCounter){
                  totalTaxi++;
              }    
          }

          points = (averageLower*2) + (averageUpper*4);
          let taxiPoints = (totalTaxi/(matches.length)) * 2;
          points = points + taxiPoints;

          let obj = {
              team: team,
              upperGoal: averageUpper,
              lowerGoal: averageLower,
              taxi: totalTaxi,
              pointsScored: points,
          }
          assignedOgbjects = [...assignedOgbjects, obj];
      }

    //   console.log(assignedOgbjects)
      return assignedOgbjects;
  }
  const handleOpenModal = (selectedTeam) => {
    setCurrentTeam(selectedTeam)
    setModal(true)
  }
  if(autoList === null){
      return <Text>Loading items...</Text>
  }
  else {
      let data = []
      data = autoList;
      data = data.filter(element => {
        let key = keyword;
        let length = key.length;
        return element.team.substring(0, length).includes(keyword)
      })
  return (
    <View style = {styles.container}>
        <View style = {styles.sortBar}>
            <Text style = {{fontSize: 35}}>sort: </Text>
            <TouchableOpacity 
                style = {{backgroundColor: PointsColor, 
                borderRadius: 5, 
                width: 80, height: 40, 
                marginRight: 10, marginTop: 7,
                justifyContent: 'center', alignItems: 'center'}}
                
                onPress={() => {handleSortType("points")}}
            >
                <Text>points</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style = {{backgroundColor: UpperColor, 
                borderRadius: 5, 
                width: 80, height: 40, 
                marginRight: 10, marginTop: 7,
                justifyContent: 'center', alignItems: 'center'}}
                
                onPress={() => {handleSortType("upper")}}
            >
                <Text>upper cargo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style = {{backgroundColor: LowerColor, 
                borderRadius: 5, 
                width: 80, height: 40, 
                marginRight: 10, marginTop: 7,
                justifyContent: 'center', alignItems: 'center'}}
                
                onPress={() => {handleSortType("lower")}}
            >
                <Text>lower cargo</Text>
            </TouchableOpacity>
        </View>
        <TextInput style={styles.SearchtextInput} placeholder="Search by Team #" value={keyword} onChangeText={text => setKeyword(text)} keyboardType="number-pad" maxLength={4}/>
        <SwipeListView 
            data = {data}
            
            renderItem = {(data) => {
            return(
                <TouchableOpacity
                    style = {styles.ListView}
                    onPress = {() => {handleOpenModal(data.item.team)}}
                >
                    <>
                        <Text style = {{fontSize: 20, color: 'white'}}>team Number: {data.item.team}</Text>
                        <Text>average points: {data.item.pointsScored}</Text>
                        <Text>average upper shots: {data.item.upperGoal}</Text>
                        <Text>average lower shots: {data.item.lowerGoal}</Text>
                        <Text>total taxi: {data.item.taxi}</Text>
                        
                    </>
                </TouchableOpacity>
            )
            }}
        />
        <Modal visible = {isModalVisible}>
            <TeamSpecificData 
            setModal={ setModal}
            rawData = { rawData}
            currentTeam = {currentTeam} 
            />
        </Modal>
    </View>
  )
  }
}

export default Autonomous

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },
    sortBar: {
        flexDirection: 'row', 
        marginVertical: 20, 
        justifyContent: 'space-evenly'
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
        marginBottom: 20,
        width: 300,
        height: 45,
        padding: 10,   
    }
})