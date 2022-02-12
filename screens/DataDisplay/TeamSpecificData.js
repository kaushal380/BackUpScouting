import { StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import {LineChart, PieChart} from "react-native-chart-kit";

const TeamSpecificData = ({currentTeam, rawData, setModal}) => {
   
  const [matchDetails, setMatchDetails] = useState([1, 2, 3, 4]);
  const [teleUpper, setTeleUpper] = useState([34, 5, 3, 2,39]);
  const [teleLower, setTeleLower] = useState([34,4,2,23])
  const [climbData, setClimbData] = useState([])

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
      setClimbs()
    }

    const initializeConsts = () => {
      let raw = rawData;
      let matches = []
      let filteredTeamData = []
      let recogTeam = currentTeam

      for (let index = 0; index < raw.length; index++) {
        if(raw[index].teamNum === recogTeam){
          filteredTeamData = [...filteredTeamData, raw[index]]
        }
      }

     
      for (let index = 0; index < filteredTeamData.length; index++) {
        let matchNum = parseInt(filteredTeamData[index].matchNum)
         matches = [...matches, matchNum]
      }

      matches = matches.sort(function(a,b) {return a-b})
      matches = [... new Set(matches)];
      // console.log(matches)
      let finalData = [filteredTeamData, matches]
      return finalData;
    }
    const setTeleUpperCargoData = () => {

      let filteredTeamData = initializeConsts()[0]
      let matches = initializeConsts()[1]
      let averageShootingData = []


      setMatchDetails(matches)
      for (let index = 0; index < matches.length; index++) {
        let totalScore = 0;
        let counter = 0;
        for(let i = 0; i < filteredTeamData.length; i++){
          if(matches[index] == filteredTeamData[i].matchNum){
            totalScore = totalScore + filteredTeamData[i].teleUpperCargo;
            counter++
          }
        }
        let matchAvg = totalScore/counter;
        averageShootingData = [...averageShootingData, matchAvg]      
      }

      // console.log(averageShootingData)
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
          for(let i = 0; i < filteredTeamData.length; i++){
            if(matches[index] == filteredTeamData[i].matchNum){
              totalScore = totalScore + filteredTeamData[i].teleLowerCargo;
              counter++
            }
          }
          let matchAvg = totalScore/counter;
          averageShootingData = [...averageShootingData, matchAvg]      
        }
  
        setTeleLower(averageShootingData)
        }

        const setClimbs = () => {
          let filteredTeamData = initializeConsts()[0]
          let matches = initializeConsts()[1]
          let Low = 0
          let mid = 0
          let high = 0
          let Treversals = 0
          let none =  0

          for (let index = 0; index < matches.length; index++) {
            let totalLow = 0
            let totalmid = 0
            let totalhigh = 0
            let totalTreversals = 0
            let totalNone = 0
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
                else if(filteredTeamData[i].climb === "none"){
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
              if(numCheck[index]> highCheck){
                highCheck = numCheck[index]
              }
            }
            console.log("highest value:" + highCheck)
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
            else if(ClimbType === "none"){
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
            console.log(climbData)
          }
        

  return (
    <ScrollView>
    <View style = {styles.container}>
      <Text style = {{fontSize: 40, alignSelf: 'center', marginVertical: 30, color: '#0782F9', fontWeight: 'bold'}}>Team specific data</Text>
      <Text style = {{fontSize: 30, alignSelf: 'flex-start', marginLeft: 20, marginBottom: 20, fontWeight: '900'}}>team number: {currentTeam}</Text>
      <Text style = {{fontSize: 30, alignSelf: 'flex-start', marginLeft: 15, marginTop: 30, fontWeight: '900'}}>teleop data: </Text>
      <View>

      <Text style = {{alignSelf: 'center', fontSize: 20, color: 'black', marginTop: 30}}>Upper Cargo Trend</Text>
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

    <Text style = {{alignSelf: 'center', fontSize: 20, color: 'black', marginTop: 20}}>Lower Cargo Trend</Text>
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

    </View>
    <Text style = {{alignSelf: 'center', fontSize: 20, color: 'black', marginTop: 20}}>Overall Climb</Text>
    <PieChart
        data={climbData}
        width={Dimensions.get("window").width}
        height={250}
        chartConfig={chartConfig}
        accessor={"number"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        style = {{marginVertical: 0}}
        center = {[10, 10]}
        absolute
    />
    
    <Text style = {{fontSize: 40, marginTop: 30}}>Print raw</Text>
    <Text style = {{fontSize: 40}} onPress={closeModal}>close Modal</Text>
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
    }
})