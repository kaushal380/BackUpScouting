import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../firebase/config'
import { SwipeListView } from 'react-native-swipe-list-view'
import TeamSpecificData from './TeamSpecificData'

const Autonomous = () => {
  const [rawData, setRawData] = useState([])

  const getDBData = async () => {
    const documentSnapshot = await firebase.firestore()
      .collection('data')
      .doc('matchData')
      .get()

    let raw = Object.values(Object.seal(documentSnapshot.data()))
    setRawData[rawData]
    console.log(raw[0].autoLowerCargo)
  }

  return (
    <View>
      <Text onPress={getDBData}>Autonomous</Text>
    </View>
  )
}

export default Autonomous

const styles = StyleSheet.create({})