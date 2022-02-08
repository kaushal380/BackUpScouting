import React from "react";
import { SafeAreaView, Text, TouchableOpacity, TextInput, View, ScrollView } from "react-native";
import { styles } from "../App";
import { CargoData } from "./DataCollection/CargoData";
import { ClimbData } from "./DataCollection/ClimbData";
import { DriverData } from "./DataCollection/DriverData";
import { OverallStratData } from "./DataCollection/OverallStratData";
import { PenaltiesData } from './DataCollection/PenaltiesData';

export class DataCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teamNum: null, matchNum: null }
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick() {
    this.props.onClick(false);
  }

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ teamNum: value })
  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.TitleStyle}>Data Collection Page</Text>
          {/* Team Number Input */}
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <TextInput
              value={this.state.teamNum}
              onChange={this.handleInputChange}
              placeholder="Team Number"
              keyboardType="number-pad"
              maxLength={4}
              textAlign="center"
              style={styles.identityInputs}
            />
            {/* Match Number Input */}
            <TextInput
              value={this.state.matchNum}
              placeholder="Match Number"
              keyboardType="number-pad"
              maxLength={4}
              textAlign="center"
              style={styles.identityInputs}
            />
          </View>

          {/* Autonomous Data Collection */}
          <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 20 }}>----  Autonomous  ----</Text>

          <CargoData />
          <ClimbData />
          <DriverData />
          <OverallStratData />
          <PenaltiesData />

          {/* Teleop Data Collection */}
          <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 20 }}>----  Teleop  ----</Text>

          <CargoData />
          <ClimbData />
          <DriverData />
          <OverallStratData />
          <PenaltiesData />

          {/* Exit Button */}
          <TouchableOpacity onPress={this.handleClick} style={styles.ButtonsContainer}>
            <Text style={styles.TitleStyle}>Exit</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

