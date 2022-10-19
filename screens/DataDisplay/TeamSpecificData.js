import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LineChart, PieChart } from "react-native-chart-kit";
import { firebase } from '../../firebase/config';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("scoutingApp.db");
import { AntDesign, Entypo } from "@expo/vector-icons"

const TeamSpecificData = ({ currentTeam, rawData, setModal }) => {

  const [matchDetails, setMatchDetails] = useState([1, 2, 3, 4]);
  const [teleUpper, setTeleUpper] = useState([34, 5, 3, 2, 39]);
  const [teleLower, setTeleLower] = useState([34, 4, 2, 23])
  const [autoUpper, setAutoUpper] = useState([34, 5, 3, 2, 39]);
  const [autoLower, setAutoLower] = useState([34, 4, 2, 23])
  const [TeleUpperConsistency, setTeleUpperConsistency] = useState(0)
  const [TeleLowerConsistency, setTeleLowerConsistency] = useState(0)
  const [autoUpperConsistency, setAutoUpperConsistency] = useState(0)
  const [autoLowerConsistency, setAutoLowerConsistency] = useState(0)
  const [climbData, setClimbData] = useState([])
  const [averageclimbTime, setAverageClimbTime] = useState(0);
  const [techFouls, setTechFouls] = useState(0);
  const [redCards, setRedCards] = useState(0);
  const [yellowcards, setYellowcards] = useState(0);
  const [disqualified, setDisqualified] = useState(0);
  const [deactivated, setDeactivated] = useState(0);
  const [scouterName, setScouterName] = useState("");//1. 
  const [overallReview, setoverallReview] = useState("");//last
  const [mechanismsDiscreptions, setMechanismsDiscreption] = useState(""); //4
  const [climbPotential, setClimbPotential] = useState("");//5
  const [nonFunctionalMech, setNonFunctionalMech] = useState("");//3.
  const [robotStatus, setRobotStatus] = useState("") //2.

  const [imageUrl, setImageUrl] = useState("");
  const [chartConfig, setChartConfit] = useState({
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  })

  const [LineChartConfig, setLineChartConfig] = useState({

    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 100) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      // stroke: "#ffa726"
      stroke: 'white'
    }

  })


  useEffect(() => {
    initSequentialCall()
  }, [])

  const closeModal = () => {
    setModal(false);
  }

  const initSequentialCall = () => {
    initializeConsts()
    setTeleUpperCargoData()
    setTeleLowerCargoData()
    setConsistencies()
    setClimbs()
    averageClimbTime()
    setAutoUpperCargoData()
    setAutoLowerCargoData()
    pitScoutingStuff()
    penalities()
    getPicture()
  }
  const initializeConsts = () => {
    let raw = rawData;
    let matches = []
    let filteredTeamData = []
    let recogTeam = currentTeam

    for (let index = 0; index < raw.length; index++) {
      if (raw[index].teamNum === recogTeam) {
        filteredTeamData = [...filteredTeamData, raw[index]]
      }
    }


    for (let index = 0; index < filteredTeamData.length; index++) {
      let matchNum = parseInt(filteredTeamData[index].matchNum)
      matches = [...matches, matchNum]
    }

    matches = matches.sort(function (a, b) { return a - b })
    matches = [... new Set(matches)];

    let finalData = [filteredTeamData, matches]
    return finalData;
  }

  const getPicture = async () => {
    const documentSnapshot = await firebase.firestore()
      .collection('grits')
      .doc('pictureLinks')
      .get()

    let pictureLinks = Object.values(Object.seal(documentSnapshot.data()))

    for (let index = 0; index < pictureLinks.length; index++) {
      if (pictureLinks[index].teamNum === currentTeam) {
        setImageUrl(pictureLinks[index].url)
        break;
      }
    }
  }

  const setConsistencies = () => {
    let filteredTeamData = initializeConsts()[0];

    let totalteleUpperAttempted = 0
    let totalTeleLowerAttempted = 0
    let totalAutoUpperAttempted = 0
    let totalAutoLowerAttempted = 0

    let totalTeleUpperScored = 0
    let totalTeleLowerScored = 0
    let totalAutoUpperScored = 0
    let totalAutoLowerScored = 0
    filteredTeamData.forEach(element => {
      totalAutoLowerAttempted = totalAutoLowerAttempted + element.autoAttemptedLower;
      totalAutoLowerScored = totalAutoLowerScored + element.autoLowerCargo;
      totalAutoUpperAttempted = totalAutoUpperAttempted + element.AutoAttemptedHigher;
      totalAutoUpperScored = totalAutoUpperScored + element.autoUpperCargo;

      totalTeleLowerAttempted = totalTeleLowerAttempted + element.teleAttemptedLower;
      totalTeleLowerScored = totalTeleLowerScored + element.teleLowerCargo;
      totalteleUpperAttempted = totalteleUpperAttempted + element.teleAttemptedHigher;
      totalTeleUpperScored = totalTeleUpperScored + element.teleUpperCargo;
    });

    if (totalAutoLowerAttempted != 0) {
      let ratio = totalAutoLowerScored / totalAutoLowerAttempted
      let percent = ratio * 100
      let consistency = Math.trunc(percent)
      setAutoLowerConsistency(consistency)
    }
    if (totalAutoUpperAttempted != 0) {
      console.log("totalAutoUpperAttempted:" + totalAutoUpperAttempted)
      console.log("totalAutoUpperScored:" + totalAutoUpperScored)
      let ratio = totalAutoUpperScored / totalAutoUpperAttempted;
      let percent = ratio * 100;
      let consistency = Math.trunc(percent);
      setAutoUpperConsistency(consistency)
    }
    if (totalTeleLowerAttempted != 0) {
      let ratio = totalTeleLowerScored / totalTeleLowerAttempted;
      let percent = ratio * 100;
      let consistency = Math.trunc(percent);
      setTeleLowerConsistency(consistency);
    }
    if (totalteleUpperAttempted != 0) {
      let ratio = totalTeleUpperScored / totalteleUpperAttempted;
      let percent = ratio * 100
      let consistency = Math.trunc(percent);
      setTeleUpperConsistency(consistency);
    }

  }
  const setTeleUpperCargoData = () => {

    let filteredTeamData = initializeConsts()[0]
    let matches = initializeConsts()[1]
    let averageShootingData = []


    setMatchDetails(matches)
    for (let index = 0; index < matches.length; index++) {
      let totalScore = 0;
      let counter = 0;
      for (let i = 0; i < filteredTeamData.length; i++) {
        if (matches[index] == filteredTeamData[i].matchNum) {
          totalScore = totalScore + filteredTeamData[i].teleUpperCargo;
          counter++
        }
      }
      let matchAvg = totalScore / counter;
      averageShootingData = [...averageShootingData, matchAvg]
    }


    setTeleUpper(averageShootingData)
  }

  const setTeleLowerCargoData = () => {

    let filteredTeamData = initializeConsts()[0]
    let matches = initializeConsts()[1]
    let averageShootingData = []

    setMatchDetails(matches)
    for (let index = 0; index < matches.length; index++) {
      let totalScore = 0;
      let counter = 0;
      for (let i = 0; i < filteredTeamData.length; i++) {
        if (matches[index] == filteredTeamData[i].matchNum) {
          totalScore = totalScore + filteredTeamData[i].teleLowerCargo;
          counter++
        }
      }
      let matchAvg = totalScore / counter;
      averageShootingData = [...averageShootingData, matchAvg]
    }

    setTeleLower(averageShootingData)
  }

  const setAutoUpperCargoData = () => {

    let filteredTeamData = initializeConsts()[0]
    let matches = initializeConsts()[1]
    let averageShootingData = []

    setMatchDetails(matches)
    for (let index = 0; index < matches.length; index++) {
      let totalScore = 0;
      let counter = 0;
      for (let i = 0; i < filteredTeamData.length; i++) {
        if (matches[index] == filteredTeamData[i].matchNum) {
          totalScore = totalScore + filteredTeamData[i].autoUpperCargo;
          counter++
        }
      }
      let matchAvg = totalScore / counter;
      averageShootingData = [...averageShootingData, matchAvg]
    }

    // return averageShootingData;
    setAutoUpper(averageShootingData)
    // setAutoUpper([3, 4, 3,4])
    // console.log(autoUpper)


  }

  const setAutoLowerCargoData = () => {

    let filteredTeamData = initializeConsts()[0]
    let matches = initializeConsts()[1]
    let averageShootingData = []

    setMatchDetails(matches)
    for (let index = 0; index < matches.length; index++) {
      let totalScore = 0;
      let counter = 0;
      for (let i = 0; i < filteredTeamData.length; i++) {
        if (matches[index] == filteredTeamData[i].matchNum) {
          totalScore = totalScore + filteredTeamData[i].autoLowerCargo;
          counter++
        }
      }
      let matchAvg = totalScore / counter;
      averageShootingData = [...averageShootingData, matchAvg]
    }

    setAutoLower(averageShootingData)
    // console.log(autoLower)
    // return averageShootingData;
  }

  const setClimbs = () => {
    let filteredTeamData = initializeConsts()[0]
    let matches = initializeConsts()[1]
    let Low = 0
    let mid = 0
    let high = 0
    let Treversals = 0
    let none = 0

    for (let index = 0; index < matches.length; index++) {
      let totalLow = 0
      let totalmid = 0
      let totalhigh = 0
      let totalTreversals = 0
      let totalNone = 0
      for (let i = 0; i < filteredTeamData.length; i++) {
        if (filteredTeamData[i].matchNum == matches[index]) {
          if (filteredTeamData[i].climb === "low") {
            totalLow++;
          }
          else if (filteredTeamData[i].climb === "mid") {
            totalmid++;
          }
          else if (filteredTeamData[i].climb === "high") {
            totalhigh++;
          }
          else if (filteredTeamData[i].climb === "traversal") {
            totalTreversals++;
          }
          else if (filteredTeamData[i].climb === "none") {
            totalNone++;
          }
        }
      }
      let highCheck = 0
      let ClimbType = ""
      let numCheck = [totalLow, totalmid, totalhigh, totalTreversals, totalNone];

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
        {
          type: 'none',
          num: totalNone
        }
      ]

      for (let index = 0; index < numCheck.length; index++) {
        if (numCheck[index] > highCheck) {
          highCheck = numCheck[index]
        }
      }

      for (let index = 0; index < arrayCheck.length; index++) {
        if (arrayCheck[index].num === highCheck) {
          ClimbType = arrayCheck[index].type
          break;
        }
      }

      if (ClimbType === "low") {
        Low++;
      }
      else if (ClimbType === "mid") {
        mid++;
      }
      else if (ClimbType === "high") {
        high++;
      }
      else if (ClimbType === "traversal") {
        Treversals++;
      }
      else if (ClimbType === "none") {
        none++;
      }
    }


    const data = [
      {
        name: "None",
        number: none,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Low",
        number: Low,
        color: "yellow",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Mid",
        number: mid,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "High",
        number: high,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "traversal",
        number: Treversals,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];

    setClimbData(data)

  }

  const averageClimbTime = () => {
    let filteredTeamData = initializeConsts()[0];

    let totalClimbTime = 0;
    let counter = 0;

    filteredTeamData.forEach(element => {
      if ((!(isNaN(element.timeTakenToClimb))) && (element.timeTakenToClimb > 0)) {
        totalClimbTime = totalClimbTime + element.timeTakenToClimb;
        counter++;
      }
    });

    try {
      let averageClimbTime = Math.trunc(totalClimbTime / counter);
      setAverageClimbTime(averageClimbTime)
    } catch (error) {
      setAverageClimbTime(0);
    }

  }

  const penalities = () => {
    let filteredTeamData = initializeConsts()[0];
    let matches = initializeConsts()[1];
    let techFoul = 0;
    let redCard = 0;
    let yelloCard = 0;
    let deactivated = 0;
    let disqualified = 0;

    console.log(filteredTeamData)
    console.log(matches)
    for (let index = 0; index < matches.length; index++) {
      for (let i = 0; i < filteredTeamData.length; i++) {
        if (matches[index] == filteredTeamData[i].matchNum) {
          redCard = redCard + (filteredTeamData[i].redCard);
          yelloCard = yelloCard + (filteredTeamData[i].yelloCard);
          techFoul = techFoul + (filteredTeamData[i].techFouls);
          if (filteredTeamData[i].deactivated === "true") {
            deactivated++;
          }
          if (filteredTeamData[i].disqualified === "true") {
            disqualified++;
          }
          break;
        }
      }
    }
    console.log(redCard)
    setRedCards(redCard);
    setYellowcards(yelloCard);
    setTechFouls(techFoul);
    setDeactivated(deactivated);
    setDisqualified(disqualified);
  }

  const pitScoutingStuff = async () => {
    let currentTeamObj
    let team = currentTeam
    // console.log("pitscoutingggg")
    const documentSnapshot = await firebase.firestore()
      .collection('grits')
      .doc('pitscouting')
      .get()

    let pitRaw = Object.values(Object.seal(documentSnapshot.data()))
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'SELECT * FROM pitScoutingDownload', [],
    //     (tx, results) => {
    //       console.log('results length: ', results.rows.length);
    //       console.log("Query successful")
    //       // console.log(results.rows._array);
    //       setPitRaw(results.rows._array)

    //     })
    // })
    for (let index = 0; index < pitRaw.length; index++) {
      if (pitRaw[index].teamNum === team) {
        currentTeamObj = pitRaw[index]
      }
    }

    let scouterName = currentTeamObj.scouterName;
    let robotStatus = currentTeamObj.robotProgress;
    let nonFunctionalMechs = currentTeamObj.nonFunctionalMechs;
    let mechDescription = currentTeamObj.mechDescription;
    let climb = currentTeamObj.climb;
    let overallReview = currentTeamObj.overallReview;

    setScouterName(scouterName);
    setRobotStatus(robotStatus)
    setNonFunctionalMech(nonFunctionalMechs);
    setMechanismsDiscreption(mechDescription)
    setClimbPotential(climb)
    setoverallReview(overallReview);

  }


  return (
    <ScrollView onTouchStart={initSequentialCall}>
      <View style={styles.container} >
        <TouchableOpacity style={styles.synchButton} onPress={closeModal}>
          <AntDesign name='close' size={25} color='white' />
        </TouchableOpacity>
        <Text style={{ fontSize: 40, alignSelf: 'center', marginVertical: 30, color: '#0782F9', fontWeight: 'bold' }}>Team specific data</Text>
        <Text style={{ fontSize: 30, alignSelf: 'flex-start', marginLeft: 20, marginBottom: 20, fontWeight: '900' }}>Team number: {currentTeam}</Text>
        <Text style={{ fontSize: 30, alignSelf: 'flex-start', marginLeft: 15, marginTop: 30, fontWeight: '900' }}>Teleop data: </Text>
        <View>

          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', marginTop: 30 }}>Upper Cargo Trend</Text>
          <LineChart
            data={{
              labels: matchDetails,
              datasets: [
                {
                  data: teleUpper
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisInterval={5} // optional, defaults to 1
            chartConfig={LineChartConfig}
            // bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          <Text style={{ color: 'black', alignSelf: 'center', fontSize: 15, marginBottom: 20 }}>About {TeleUpperConsistency}% of attempted balls make the upper hub</Text>

          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', marginTop: 20 }}>Lower Cargo Trend</Text>
          <LineChart
            data={{
              labels: matchDetails,
              datasets: [
                {
                  data: teleLower
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisInterval={5} // optional, defaults to 1
            chartConfig={LineChartConfig}
            // bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          <Text style={{ color: 'black', alignSelf: 'center', fontSize: 15, marginBottom: 20 }}>About {TeleLowerConsistency}% of attempted balls make the lower hub</Text>
        </View>
        <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', marginTop: 20 }}>Overall Climb</Text>
        <PieChart
          data={climbData}
          width={Dimensions.get("window").width}
          height={250}
          chartConfig={chartConfig}
          accessor={"number"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          style={{ marginVertical: 0 }}
          center={[10, 10]}
          absolute
        />
        <Text style={{ fontSize: 20, alignSelf: 'center', fontWeight: '100' }}>Average climb time: {averageclimbTime} sec</Text>

        <Text style={{ fontSize: 30, alignSelf: 'flex-start', marginLeft: 15, marginTop: 30, fontWeight: '900' }}>Auto data: </Text>
        <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', marginTop: 20 }}>Auto Upper Cargo</Text>
        <LineChart
          data={{
            labels: matchDetails,
            datasets: [
              {
                data: autoUpper
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisInterval={5} // optional, defaults to 1
          chartConfig={LineChartConfig}
          // bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 15, marginBottom: 20 }}>About {autoUpperConsistency}% of attempted balls make the upper hub</Text>

        <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', marginTop: 20 }}>Auto Lower Cargo</Text>
        <LineChart
          data={{
            labels: matchDetails,
            datasets: [
              {
                data: autoLower
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisInterval={5} // optional, defaults to 1
          chartConfig={LineChartConfig}
          // bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 15, marginBottom: 20 }}>About {autoLowerConsistency}% of attempted balls make the lower hub</Text>
        <Text style={{ fontSize: 30, alignSelf: 'flex-start', marginLeft: 15, marginTop: 30, fontWeight: '900' }}>Penalities: </Text>
        <Text style={styles.textViewItems}>tech fouls: {techFouls}</Text>
        <Text style={styles.textViewItems}>yellow-cards: {yellowcards}</Text>
        <Text style={styles.textViewItems}>red-cards: {redCards}</Text>
        <Text style={styles.textViewItems}>deactivated: {deactivated}</Text>
        <Text style={styles.textViewItems}>disqualified: {disqualified}</Text>

        <Text style={{ fontSize: 30, alignSelf: 'flex-start', marginLeft: 15, marginTop: 30, fontWeight: '900' }}>Pitscouting Data: </Text>
        <Text style={styles.textViewItems}>Scouter Name: {scouterName}</Text>
        <Text style={styles.textViewItems}>Robot Status: {robotStatus}</Text>
        <Text style={styles.textViewItems}>Non-functional mechs: {nonFunctionalMech}</Text>
        <Text style={styles.textViewItems}>Mechanisms Descriptions : {mechanismsDiscreptions}</Text>
        <Text style={styles.textViewItems}>Possible climb : {climbPotential}</Text>
        <Text style={styles.textViewItems}>overall review : {overallReview}</Text>

        <Text style={{ fontSize: 25, alignSelf: "center" }}> Picture!!!:</Text>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 300, height: 500 }}
        />
      </View>
    </ScrollView>
  )

}
export default TeamSpecificData

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textViewItems: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 10
  },
  synchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0782F9',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 30,
    marginTop: 30
  }
})