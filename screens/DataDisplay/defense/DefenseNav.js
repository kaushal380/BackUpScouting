import * as React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Defense from './Defense';
import CounterDefense from './CounterDefense';

const renderScene = SceneMap({
  first: Defense,
  second: CounterDefense,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'black' }}
    style={{ backgroundColor:"#dedbd5" }}
    labelStyle = {{color: "black"}}
    
  />
);
export default function DefenseNav() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'defense' },
    { key: 'second', title: 'counter defense' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }} 
      tabBarPosition='top' 
      renderTabBar = {renderTabBar}
      swipeEnabled = {false} 
      renderScene={renderScene} 
      onIndexChange={setIndex} 
      initialLayout={{ width: layout.width }} 
    />
  );
}


const styles = StyleSheet.create({
  activeBar: {
    backgroundColor: "#0782F9",
  },
  inactiveBar: {backgroundColor: "#dedbd5"}
})
