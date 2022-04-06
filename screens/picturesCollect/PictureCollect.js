import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { CameraComponent } from "../picturesCollect/Camera";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/core";

const PictureCollect = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [team, setTeam] = useState("");

  const storage = getStorage();
  const storageRef = ref(storage, `${team}`);

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    await uploadBytes(storageRef, blob);
    blob.close();
    return await getDownloadURL(storageRef);
  }

  const pictureSubmit = async () => {
    console.log("submitting");
    if (!team) {
      alert("enter the team number");
      return;
    }
    uploadImageAsync(image).then((url) => {
      console.log(url);
      navigation.navigate("Home");
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          placeholder="Team #"
          keyboardType="numbers-and-punctuation"
          value={team}
          onChangeText={(text) => setTeam(text)}
          style={styles.Teaminput}
        />
        <CameraComponent image={image} setImage={setImage} />
        <TouchableOpacity
          style={styles.ButtonsContainer}
          onPress={pictureSubmit}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default PictureCollect;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  Teaminput: {
    height: 50,
    margin: 30,
    borderWidth: 2,
    padding: 10,
    minWidth: 50,
  },
  ButtonsContainer: {
    backgroundColor: "#0782F9",
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    marginTop: 50,
  },
});
