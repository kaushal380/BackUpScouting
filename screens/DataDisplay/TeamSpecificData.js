import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TeamSpecificData = ({currentTeam, rawData, setModal}) => {
    const closeModal = () => {
        setModal(false);
    }
  return (
    <View style = {styles.container}>
      <Text style = {{fontSize: 20}}>team number: {currentTeam}</Text>
      <Text style = {{fontSize: 50}} onPress={() => console.log(rawData)}>print raw</Text>
      <Text style = {{fontSize: 40}} onPress={closeModal}>close Modal</Text>
      
    </View>
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