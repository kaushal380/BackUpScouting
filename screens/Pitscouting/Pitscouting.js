import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Pitscouting = () => {
  return (
    <View style = {styles.container}>
      <Text style = {{fontSize: 20}}>Pitscouting stuff goes here</Text>
    </View>
  )
}

export default Pitscouting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})