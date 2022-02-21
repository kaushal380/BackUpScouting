import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { firebase } from '../../firebase/config'
import { SwipeListView } from 'react-native-swipe-list-view'
import TeamSpecificData from './TeamSpecificData'

const Defense = () => {
  const [finalDefenseList, setFinalDefence] = useState([]);
  const [rawData, setRawData] = useState([])
  const [isTeamDataVisible, setTeamDataVisible] = useState(false)
  const [currentSelectedTeam, setSelectedTeam] = useState();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    sortTeams()
  }, [])

  const sortTeams = async () => {
    let teams = []
    let avgs = []
    let teamAndDefenseAvg = []
    let finalDefenseList = []
    const documentSnapshot = await firebase.firestore()
    .collection('data')
    .doc('matchData')
    .get()

    let rawData = Object.values(Object.seal(documentSnapshot.data()))

    setRawData(rawData);

    for (let index = 0; index < rawData.length; index++) {
        teams = [...teams, rawData[index].teamNum];
    }
    console.log(teams)
    teams = [...new Set(teams)];

    
    for (let index = 0; index < teams.length; index++) {
      let TotalDefenseRanking = 0;
      let counter = 0;
      let avg = 0;
      for (let i = 0; i < rawData.length; i++) {
        if(teams[index] === rawData[i].teamNum){
          counter++;
          TotalDefenseRanking = TotalDefenseRanking + rawData[i].defenseRanking;
        }
      }
      avg = TotalDefenseRanking/counter;
      avgs = [...avgs, avg]
      let team = teams[index]
      const Object = {
        team: team,
        average: avg
      }
      teamAndDefenseAvg = [...teamAndDefenseAvg, Object]
    }

    avgs = avgs.sort(function(a,b) {return b-a})

    avgs = [...new Set(avgs)];
    for (let index = 0; index < avgs.length; index++) {
      for (let i = 0; i < teamAndDefenseAvg.length; i++) {
        if(avgs[index]===teamAndDefenseAvg[i].average){
          finalDefenseList = [...finalDefenseList, teamAndDefenseAvg[i]]
        } 
      }
    }

    setFinalDefence(finalDefenseList);
  }

  const handleOpenModal = (currentTeam) => {
    setSelectedTeam(currentTeam)
    setTeamDataVisible(true);
  }
  const closeModal = () => {
    setTeamDataVisible(false)
  }

  if(finalDefenseList === null){
    return <Text>loading items...</Text>
  } else {
    let data = finalDefenseList;
    data = data.filter(element => {
      let key = keyword;
      let length = key.length;
      return element.team.substring(0, length).includes(keyword)
    })

  return (

    <View style = {styles.container}>
      <Text style = {{fontSize: 25, marginHorizontal: 20, marginVertical: 20,alignSelf: 'flex-start'}}>
        Sorting Defense Teams
      </Text>
      <TextInput style={styles.SearchtextInput} placeholder="Search by Team #" value={keyword} onChangeText={text => setKeyword(text)} keyboardType="number-pad" maxLength={4}/>
          <SwipeListView 
            data = {data}
            
            renderItem = {(data) => {
            return(
                <TouchableOpacity
                    style = {styles.ListView}
                    
                    onPress = {() => {
                      handleOpenModal(data.item.team)
                    }}
                >
                    <>
                        <Text style = {{fontSize: 20, color: 'white'}}>team Number: {data.item.team}</Text>
                        <Text>average defence ranking: {data.item.average}</Text>
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

export default Defense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ListView: {
    backgroundColor: '#0782F9',
    minHeight: 85,
    width: 370,
    padding: 15,
    justifyContent: 'space-around',
    marginBottom: 10,
    borderRadius: 10
    },
    SearchtextInput: {
      borderWidth: 2,
      marginBottom: 20, 
      marginHorizontal: 20,
      width: 300,
      height: 45,
      padding: 10,
      alignSelf: 'flex-start'
    }
})