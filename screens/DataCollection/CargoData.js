import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../App";

export class CargoData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cargoLower: 0, cargoUpper: 0 }
    this.addLower = this.addLower.bind(this);
    this.subtractLower = this.subtractLower.bind(this);
    this.addUpper = this.addUpper.bind(this);
    this.subtractUpper = this.subtractUpper.bind(this);
  }

  addLower() {
    this.setState({ cargoLower: this.state.cargoLower + 1 });
  }

  subtractLower() {
    this.setState({ cargoLower: this.state.cargoLower - 1 });
  }

  addUpper() {
    this.setState({ cargoUpper: this.state.cargoUpper + 1 });
  }

  subtractUpper() {
    this.setState({ cargoUpper: this.state.cargoUpper - 1 });
  }

  render() {
    if (this.state.cargoLower < 0) {
      this.setState({ cargoLower: 0 })
    }
    return (
      <View>
        <View>
          <Text>Cargo Lower Count: {this.state.cargoLower}</Text>
          <View style={styles.cargoButtons}>
            <TouchableOpacity
              style={styles.subtractButton}
              value={this.state.cargoLower}
              onPress={this.subtractLower}
            />
            <TouchableOpacity
              style={styles.addButton}
              value={this.state.cargoLower}
              onPress={this.addLower}
            />
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text>Cargo Upper Count: {this.state.cargoUpper}</Text>
          <View style={styles.cargoButtons}>
            <TouchableOpacity
              style={styles.subtractButton}
              value={this.state.cargoUpper}
              onPress={this.subtractUpper}
            />
            <TouchableOpacity
              style={styles.addButton}
              value={this.state.cargoUpper}
              onPress={this.addUpper}
            />
          </View>
        </View>
      </View>
    );
  }
}
