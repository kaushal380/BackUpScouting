import React, { useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Slider } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { firebase } from "../../firebase/config";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("scoutingApp.db");

const PitScouting = () => {
  const navigation = useNavigation();
  const firebaseAccess = firebase.firestore();
  const [text, onChangeText] = useState("");
  const [text1, onChangeText1] = useState("");
  const [comments, whatyougottasayaboutem] = useState("");
  const [holonomic, setholonomic] = useState("white");
  const [nonholonomic, setnonholonmic] = useState("white");
  const [other, setOther] = useState("white");
  const [otherShooterColor, setOtherShooterColor] = useState("white");
  const [YesC, setYesC] = useState("white");
  const [NoC, setNoC] = useState("white");
  const [noneColor, setnoneColor] = useState("white");
  const [flywheelColor, setflywheelColor] = useState("white");
  const [catapultColor, setcatapultColor] = useState("white");
  const [bucketColor, setbucketColor] = useState("white");
  const [climbExists, setClimbExsists] = useState("nope");
  const [shooterExists, setShooterExists] = useState("nope");
  const [name, setName] = useState(""); //name of scouter
  const [team, setTeam] = useState(""); //team number
  const [approxTime, setApproxTime] = useState(""); //approx time scouted
  const [review, setReview] = useState(""); // Overall review
  const [robustnessRanking, setrobustnessRanking] = useState(1); //Robustness Ranking/Scale
  const [driverExperience, setdriverExperience] = useState(1); //Drive team Experience
  const [electricalOrangization, setelectricalOrangization] = useState(1); //Organization of Electrical
  const [mechComplexity, setmechComplexity] = useState(1); //Mechanical Complexity
  const [graciousProfessionalism, setgraciousProfessionalism] = useState(1); //Gracious Professionalism
  const [organizationOfPit, setorganizationOfPit] = useState(1); // Pit organization
  const [mechDescription, setmechDiscription] = useState(""); //Mechanical Description
  const [drivetrain, SetDrivetrain] = useState(""); //Drivetrain type, holonomic, non-holonomic or other
  const [drivetrainOther, setdrivetrainOther] = useState(""); // Drivetrain type is other was selected
  const [shooterType, setShooterType] = useState(""); //Shooter type, catapult, flywheel, bucket, other
  const [shooterTypeOther, setShooterTypeOther] = useState(""); //Shooter type is other was selected
  const [shooterElaboration, setShooterElaboration] = useState(""); //Shooter Elaboration
  const [climbHeight, setClimbHeight] = useState(1);  //Climb Height 1 = none, 2 = low, 3 = mid, 4 = high, 5 = traversal
  const [climbElaboration, setclimbElaboration] = useState(""); //Climb Elaboration
  const [sensors, setsensors] = useState([]); //Array containing sensors. Click button again = removes sensor from array
  const [nonFunctionalMech, setNonFunctionalMech] = useState([]); //Array containing non-functional mechanical components. Click button again = removes component from array
  const [robotInProgress, setrobotInProgress] = useState(false); //Are they currently working on the robot?
  const [robotInProgressDescription, setrobotInProgressDescription] =
    useState(""); //If robot is in progress, what are they working on?
  const [electricalLocation, setelectricalLocation] = useState(""); // Location of electrical components
  const [automationDescription, setautomationDescription] = useState(""); //Description of automation
  const [additionalComments, setAdditionalComments] = useState(""); //Additional COmments

  //if inProgress is "Yes", then robotInProgress is true and show text input
  //if inProgress is "No", then robotInProgress is false
  const inProgress = (progress) => {
    if (progress === "Yes") {
      setrobotInProgress(true);
    }
    if (progress === "No") {
      setrobotInProgress(false);
    }
  };

  const showInProgressTextInput = () => {
    if (robotInProgress === true) {
      return (
        <View
          style={{
            marginTop: 10,
            borderWidth: 2,
            height: 30,
            width: 350,
            marginLeft: 35,
          }}
        >
          <TextInput
            style={styles.textInput}
            placeholder="What mechanisms are being currently worked on?"
            onChangeText={(text) => setrobotInProgressDescription(text)}
            value={setrobotInProgressDescription}
            multiline = {true}
          />
        </View>
      );
    }
  };

  //add mech to nonFunctionalMech
  //if mech is already in nonFunctionalMech, remove it
  const addMech = (mech) => {
    if (nonFunctionalMech.includes(mech)) {
      setNonFunctionalMech(nonFunctionalMech.filter((m) => m !== mech));
    } else {
      setNonFunctionalMech([...nonFunctionalMech, mech]);
    }
  };

  //add sensors to sensorArray
  //if sensors is already in sensorArray, remove it
  const addSensor = (sensor) => {
    if (sensors.includes(sensor)) {
      setsensors(sensors.filter((item) => item !== sensor));
    } else {
      setsensors([...sensors, sensor]);
    }
  };

  const drivetraintype = (type) => {
    let selectedcolor = "#0782F9";

    if (type === "holonomic") {
      setholonomic(selectedcolor);
      setnonholonmic("white");
      setOther("white");
      SetDrivetrain("holonomic");
    }
    if (type === "nonholonomic") {
      setholonomic("white");
      setOther("white");
      setnonholonmic(selectedcolor);
      SetDrivetrain("non-holonomic");
    }

    if (type === "other") {
      setholonomic("white");
      setnonholonmic("white");
      setOther(selectedcolor);
      SetDrivetrain("other");
    }
  };

  const handlePitSubmit = () => {

    if (!name) {
      alert("enter your name")
      return;
    }

    if (!team) {
      alert("enter the team number")
      return;
    }

    let drivetrainType = drivetrain
    if (drivetrain == "other") {
      drivetrainType = drivetrainOther
    }

    let shooter = shooterType
    if (shooterType == "Other") {
      shooter = shooterTypeOther
    }

    let climb = "none"
    if (climbHeight === 2) {
      climb = "low"
    }
    if (climbHeight === 3) {
      climb = "mid"
    }
    if (climbHeight === 4) {
      climb = "high"
    }
    if (climbHeight === 5) {
      climb = "traversal"
    }

    let sensorToString = sensors.toString();
    let nonFunToString = nonFunctionalMech.toString();

    let robotProgress = "not actively working on it"

    if (robotInProgress) {
      robotProgress = robotInProgressDescription
    }


    let obj = [
      {
        scouterName: name,
        teamNum: team,
        timeScouted: new Date().toUTCString(),
        overallReview: review,
        robustRanking: robustnessRanking,
        driverExperience: driverExperience,
        electricalOrangization: electricalOrangization,
        mechComplexity: mechComplexity,
        graciousProfessionalism: graciousProfessionalism,
        organizationOfPit: organizationOfPit,
        mechDescription: mechDescription,
        drivetrain: drivetrainType,
        shooterType: shooter,
        shooterElaboration: shooterElaboration,
        climb: climb,
        climbElaboration: climbElaboration,
        sensors: sensorToString,
        nonFunctionalMechs: nonFunToString,
        robotProgress: robotProgress,
        electricalLocation: electricalLocation,
        automationDescription: automationDescription,
        additionalComments: additionalComments,

      },
    ];


    console.log(obj);
    addPitData(obj)
    handleCancel();
  };

  const handleCancel = () => {
    navigation.navigate("Home");
  };

  const addPitData = async (newList) => {
    const documentSnapshot = await firebase.firestore()
      .collection("macon2022")
      .doc("pitscouting")
      .get()

    let existingData = Object.values(Object.seal(documentSnapshot.data()))

    let finalList = existingData.concat(newList);

    let finalObject = Object.assign({}, finalList)

    firebaseAccess
      .collection("macon2022")
      .doc("pitscouting")
      .set(finalObject)

  }




  const checkClimb = (type) => {
    let selectedcolor1 = "#0782F9";
    if (type === "Yes") {
      setYesC(selectedcolor1);
      setNoC("white");
      setClimbExsists("yes");
    }
    if (type === "No") {
      setYesC("white");
      setNoC(selectedcolor1);
      setClimbExsists("nope");
    }
  };
  const checkShooter = (type) => {
    let selectedcolor2 = "#0782F9";
    if (type === "None") {
      setnoneColor(selectedcolor2);
      setflywheelColor("white");
      setbucketColor("white");
      setOtherShooterColor("white");
      setcatapultColor("white");
      setShooterType("None");
    }
    if (type === "Flywheel") {
      setnoneColor("white");
      setOtherShooterColor("white");
      setflywheelColor(selectedcolor2);
      setcatapultColor("white");
      setbucketColor("white");
      setShooterType("Flywheel");
    }
    if (type === "Catapult") {
      setnoneColor("white");
      setflywheelColor("white");
      setbucketColor("white");
      setOtherShooterColor("white");
      setcatapultColor(selectedcolor2);
      setShooterType("Catapult");
    }

    if (type === "Bucket") {
      setnoneColor("white");
      setflywheelColor("white");
      setcatapultColor("white");
      setbucketColor(selectedcolor2);
      setOtherShooterColor("white");
      setShooterType("Bucket");
    }

    if (type === "Other") {
      setOtherShooterColor(selectedcolor2);
      setnoneColor("white");
      setflywheelColor("white");
      setcatapultColor("white");
      setbucketColor("white");
      setShooterType("Other");
    }
  };

  //if drivetrain is "other" then show the text input
  const showDriveTrainTextInput = () => {
    if (drivetrain === "other") {
      return (
        <View style={{ marginTop: 10, borderWidth: 2, height: 30, width: 150 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Drivetrain"
            onChangeText={(text) => setdrivetrainOther(text)}
            multiline = {true}
          />
        </View>
      );
    }
  };

  //if ShooterType is "other" then show the text input
  const showShooterTypeTextInput = () => {
    if (shooterType === "Other") {
      return (
        <View style={{ marginTop: 10, borderWidth: 2, height: 30, width: 150 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Shooter Type"
            onChangeText={(text) => setShooterTypeOther(text)}
            multiline = {true}
          />
        </View>
      );
    }
  };

  //if climb height is 1, then show the text "none"
  //else if the climb height is 2, then show the text "low"
  //else if the climb height is 3, then show the text "Mid"
  //else if the climb height is 4, then show the text "High"
  //else if the climb height is 5, then show the text "Traversal"
  const showClimbHeightText = () => {
    if (climbHeight === 1) {
      return <Text>None</Text>;
    }
    if (climbHeight === 2) {
      return <Text>Low</Text>;
    }
    if (climbHeight === 3) {
      return <Text>Mid</Text>;
    }
    if (climbHeight === 4) {
      return <Text>High</Text>;
    }
    if (climbHeight === 5) {
      return <Text>Traversal</Text>;
    }
  };

  const checkTeamLength = (text) => {
    if (text.length < 5) {
      setTeam(text)
    }
  }
  return (
    <ScrollView>
      <SafeAreaView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding" // try padding for ios maybe?
        >
          <TextInput
            placeholder="Your Name"
            keyboardType="keyboard"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.Teaminput}
            multiline = {true}
          />

          <TextInput
            placeholder="Team #"
            keyboardType="number-pad"
            value={team}
            onChangeText={(text) => checkTeamLength(text)}
            style={styles.Teaminput}
            multiline = {true}
          />

          {/* <TextInput
            placeholder="Approximate Time Scouted (ie: Friday, 3:30PM)"
            keyboardType="default"
            value={approxTime}
            onChangeText={(text) => setApproxTime(text)}
            style={styles.Teaminput}
            multiline = {true}
          /> */}
          <Text style = {{margin: 30, fontSize: 20}}>time scouted: {new Date().toLocaleString()}</Text>

          <TextInput
            placeholder="Overall Review (optional)"
            keyboardType="default"
            value={review}
            multiline = {true}
            onChangeText={(text) => setReview(text)}
            style={{ height: 100, margin: 30, borderWidth: 2, padding: 10 }}
          />

          <View
            style={{ marginTop: 35, alignContent: "center", marginRight: 40 }}
          >
            <Text style={{ fontSize: 25, marginLeft: 40 }}>
              Robustness Ranking/Scale: {robustnessRanking}
            </Text>
            <Slider
              style={{ marginLeft: 40 }}
              value={robustnessRanking}
              onValueChange={(num) => {
                setrobustnessRanking(num);
              }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onSlidingComplete={(num) => {
                setrobustnessRanking(num);
              }}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
            />
          </View>

          <View
            style={{ marginTop: 35, alignContent: "center", marginRight: 40 }}
          >
            <Text style={{ fontSize: 25, marginLeft: 40 }}>
              Drive Team Experience: {driverExperience}
            </Text>
            <Slider
              style={{ marginLeft: 40 }}
              value={driverExperience}
              onValueChange={(num) => {
                setdriverExperience(num);
              }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onSlidingComplete={(num) => {
                setdriverExperience(num);
              }}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
            />
          </View>

          <View
            style={{ marginTop: 35, alignContent: "center", marginRight: 40 }}
          >
            <Text style={{ fontSize: 25, marginLeft: 40 }}>
              Organization of Electrical {electricalOrangization}
            </Text>
            <Slider
              style={{ marginLeft: 40 }}
              value={electricalOrangization}
              onValueChange={(num) => {
                setelectricalOrangization(num);
              }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onSlidingComplete={(num) => {
                setelectricalOrangization(num);
              }}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
            />
          </View>

          <View
            style={{ marginTop: 35, alignContent: "center", marginRight: 40 }}
          >
            <Text style={{ fontSize: 25, marginLeft: 40 }}>
              Complexity of Mechanisms: {mechComplexity}
            </Text>
            <Slider
              style={{ marginLeft: 40 }}
              value={mechComplexity}
              onValueChange={(num) => {
                setmechComplexity(num);
              }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onSlidingComplete={(num) => {
                setmechComplexity(num);
              }}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
            />
          </View>

          <View
            style={{ marginTop: 35, alignContent: "center", marginRight: 40 }}
          >
            <Text style={{ fontSize: 25, marginLeft: 40 }}>
              Gracious Professionalism: {graciousProfessionalism}
            </Text>
            <Slider
              style={{ marginLeft: 40 }}
              value={graciousProfessionalism}
              onValueChange={(num) => {
                setgraciousProfessionalism(num);
              }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onSlidingComplete={(num) => {
                setgraciousProfessionalism(num);
              }}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
            />
          </View>

          <View
            style={{ marginTop: 35, alignContent: "center", marginRight: 40 }}
          >
            <Text style={{ fontSize: 25, marginLeft: 40 }}>
              Organization of Pit: {organizationOfPit}
            </Text>
            <Slider
              style={{ marginLeft: 40 }}
              value={organizationOfPit}
              onValueChange={(num) => {
                setorganizationOfPit(num);
              }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onSlidingComplete={(num) => {
                setorganizationOfPit(num);
              }}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
            />
          </View>

          <TextInput
            placeholder="Mechanisms Descriptions (optional)"
            keyboardType="default"
            value={mechDescription}
            multiline = {true}
            onChangeText={(text) => setmechDiscription(text)}
            style={{ height: 100, margin: 30, borderWidth: 2, padding: 10 }}
          />

          <View style={styles.mechColumn}>
            <Text style={styles.mechText}>Drivetrain Type</Text>
            <TouchableOpacity
              style={{
                backgroundColor: holonomic,
                borderRadius: 5,
                width: 100,
                height: 30,
                marginRight: 10,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                drivetraintype("holonomic");
              }}
            >
              <Text>Holonomic</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: nonholonomic,
                borderRadius: 5,
                width: 100,
                height: 30,
                marginRight: 10,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                drivetraintype("nonholonomic");
              }}
            >
              <Text>Non-Holonomic</Text>
            </TouchableOpacity>
            <View style={styles.mechRow}>
              <TouchableOpacity
                style={{
                  backgroundColor: other,
                  borderRadius: 5,
                  width: 100,
                  height: 30,
                  marginRight: 10,
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  drivetraintype("other");
                }}
              >
                <Text>Other</Text>
              </TouchableOpacity>
              {showDriveTrainTextInput()}
            </View>
          </View>

          <View style={styles.mechColumn}>
            <Text style={styles.mechText}>Shooter </Text>
            <TouchableOpacity
              style={{
                backgroundColor: noneColor,
                borderRadius: 5,
                width: 70,
                height: 30,
                marginRight: 10,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                checkShooter("None");
              }}
            >
              <Text>None</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: flywheelColor,
                borderRadius: 5,
                width: 70,
                height: 30,
                marginRight: 10,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                checkShooter("Flywheel");
              }}
            >
              <Text>Flywheel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: catapultColor,
                borderRadius: 5,
                width: 70,
                height: 30,
                marginRight: 10,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                checkShooter("Catapult");
              }}
            >
              <Text>Catapult</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: bucketColor,
                borderRadius: 5,
                width: 70,
                height: 30,
                marginRight: 10,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                checkShooter("Bucket");
              }}
            >
              <Text>Bucket</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: otherShooterColor,
                borderRadius: 5,
                width: 70,
                height: 30,
                marginRight: 10,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                checkShooter("Other");
              }}
            >
              <Text>Other</Text>
            </TouchableOpacity>
            {showShooterTypeTextInput()}
          </View>

          <TextInput
            placeholder="Please elaborate on their shooter"
            keyboardType="keyboard"
            value={shooterElaboration}
            onChangeText={(text) => setShooterElaboration(text)}
            style={styles.Teaminput}
            multiline = {true}
          />

          <View
            style={{ marginTop: 35, alignContent: "center", marginRight: 40 }}
          >
            <Text style={{ fontSize: 25, marginLeft: 40 }}>
              Which rungs was their climb designed to reach?{" "}
              [{showClimbHeightText()}]
            </Text>
            <Slider
              style={{ marginLeft: 40 }}
              value={climbHeight}
              onValueChange={(num) => {
                setClimbHeight(num);
              }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onSlidingComplete={(num) => {
                setClimbHeight(num);
              }}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
            />
          </View>

          <TextInput
            placeholder="Please elaborate on their climb:"
            keyboardType="keyboard"
            value={climbElaboration}
            onChangeText={(text) => setclimbElaboration(text)}
            style={styles.Teaminput}
            multiline = {true}
          />

          <Text style={{ fontSize: 25, marginLeft: 40 }}>
            What type of sensors are integrated into their robot? | [{sensors}]
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addSensor(" Limit Switches");
            }}
          >
            <Text>Limit Switches</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addSensor(" Color Sensors");
            }}
          >
            <Text>Color Sensors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 117,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addSensor(" Proximity Sensors");
            }}
          >
            <Text>Proximity Sensors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addSensor(" Driver Camera");
            }}
          >
            <Text>Driver Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addSensor(" Vision Camera");
            }}
          >
            <Text>Vision Camera</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 25, marginLeft: 40 }}>
            Which mechanisms are currently non-functional? | [
            {nonFunctionalMech}]
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addMech(" Drivetrain");
            }}
          >
            <Text> Drivetrain</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addMech(" Shooter");
            }}
          >
            <Text> Shooter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addMech(" Climb");
            }}
          >
            <Text> Climb</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addMech(" Vision/Sensors");
            }}
          >
            <Text> Vision/Sensors</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 25, marginLeft: 40 }}>
            Are they currently working on their robot?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              inProgress("Yes");
            }}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
          {showInProgressTextInput()}
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 5,
              width: 100,
              height: 30,
              marginLeft: 150,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              inProgress("No");
            }}
          >
            <Text>No</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Location of electrical components"
            keyboardType="keyboard"
            value={electricalLocation}
            onChangeText={(text) => setelectricalLocation(text)}
            style={styles.Teaminput}
            multiline = {true}
          />

          <TextInput
            placeholder="Description of robot automation"
            keyboardType="keyboard"
            value={automationDescription}
            onChangeText={(text) => setautomationDescription(text)}
            style={styles.Teaminput}
            multiline = {true}
          />

          <TextInput
            placeholder="Additional Comments?"
            keyboardType="keyboard"
            value={additionalComments}
            onChangeText={(text) => setAdditionalComments(text)}
            style={{ height: 100, margin: 30, borderWidth: 2, padding: 10 }}
            multiline = {true}
          />
          {console.log(additionalComments)}


          <View style={{ flexDirection: 'row', marginVertical: 40, alignSelf: 'center' }}>
            <AntDesign name="closecircleo" size={50} onPress={handleCancel} color={"#0782F9"} style={{ marginHorizontal: 50 }} />

            <AntDesign name="checkcircleo" size={50} onPress={handlePitSubmit} color={'#0782F9'} style={{ marginHorizontal: 50 }} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 100,
    margin: 30,
    borderWidth: 2,
    padding: 10,
  },

  textBoxComment: {
    alignSelf: "flex-start",
    fontSize: 20,
    marginLeft: 30,
    marginBottom: -20,
  },
  subHeader: {
    alignSelf: "center",
    marginVertical: 40,
    fontSize: 30,
  },
  mechRow: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  mechColumn: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginLeft: 45,
    marginVertical: 15,
  },
  mechText: {
    fontSize: 20,
    marginTop: 10,
    marginRight: 15,
  },
  Teaminput: {
    height: 50,
    margin: 30,
    borderWidth: 2,
    padding: 10,
  },
});

export default PitScouting;
