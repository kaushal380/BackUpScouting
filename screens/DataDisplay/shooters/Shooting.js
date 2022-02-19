import * as React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TeleLowerCargo from './TeleLowerCargo';
import TeleUpperCargo from './TeleUpperCargo';

const renderScene = SceneMap({
  first: TeleUpperCargo,
  second: TeleLowerCargo,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'black' }}
    style={{ backgroundColor:"#dedbd5" }}
    labelStyle = {{color: "black"}}
    
  />
);
export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Upper Cargo' },
    { key: 'second', title: 'Lower Cargo' },
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
