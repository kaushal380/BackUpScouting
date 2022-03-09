import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scanner() {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(false);

  const askPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(status === "granted");
  };

  useEffect(() => {
    askPermission();
  }, []);

  const handleScan = ({ data }) => {
    setScanned(true);
    setData(data);
  };

  const cameraView = (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleScan}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => {
            setScanned(false);
            setData(null);
          }}
        />
      )}
    </View>
  );

  const dataView = (
    <View style={styles.container}>
      <Text>{data}</Text>
      <Button
        title={"Tap to Scan Again"}
        onPress={() => {
          setScanned(false);
          setData(null);
        }}
      />
    </View>
  );

  if (data) {
    return dataView;
  } else {
    return cameraView
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
  },
});
