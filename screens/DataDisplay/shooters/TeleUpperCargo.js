import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../../firebase/config';
import { SwipeListView } from 'react-native-swipe-list-view'
import TeamSpecificData from '../TeamSpecificData';
const TeleUpperCargo = () => {
  const [rawData, setRawData] = useState([]);
  const [list, setList] = useState();
  const [averageColor, setAverageColor] = useState("white");
  const [ConsistencyColor, setConsistencyColor] = useState("white");
  const [isTeamDataVisible, setTeamDataVisible] = useState(false)
  const [currentSelectedTeam, setSelectedTeam] = useState();

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

  const getDBData = async () => {
    const documentSnapshot = await firebase.firestore()
    .collection('data')
    .doc('matchData')
    .get()

    let raw = Object.values(Object.seal(documentSnapshot.data()))
    setRawData(raw);
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
      for (let i = 0; i < raw.length; i++) {
        if(teams[index] === raw[i].teamNum){
          counter++;
          total = total + raw[i].teleUpperCargo;
        }
      }
      let average = total/counter;
      let obj = {
        team: teams[index],
        avg: average
      }
      assignAverageList = [...assignAverageList, obj];
    }
    return assignAverageList;
  }

  const setVisibleList = (type) => {
    let averageList = assignShooterObject();
    let averageNums = []
    let consistentNums = []
    let Finallist = []
    for (let index = 0; index < averageList.length; index++) {
      averageNums = [...averageNums, averageList[index].avg]
    }

    averageNums = averageNums.sort(function(a,b) {return b-a})
    averageNums = [... new Set(averageNums)];

    if(type === "average"){
      for (let index = 0; index < averageNums.length; index++) {
        for(let i = 0; i< averageList.length; i++){
          if(averageNums[index] === averageList[i].avg){
            Finallist = [...Finallist, averageList[i]]
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

      <SwipeListView 
            data = {list}
            
            renderItem = {(data) => {
            return(
                <TouchableOpacity
                    style = {styles.ListView}
                    onPress = {() => {handleModalOpen(data.item.team)}}
                >
                    <>
                        <Text style = {{fontSize: 20, color: 'white'}}>team Number: {data.item.team}</Text>
                        <Text>average: {data.item.avg}</Text>
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

export default TeleUpperCargo

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
    }
})