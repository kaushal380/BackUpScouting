import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Switch, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Entypo } from "@expo/vector-icons"
import { Slider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { firebase } from '../firebase/config';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("scoutingApp.db");

const DataCollect = () => {

    const navigation = useNavigation()
    const [taxi, setTaxi] = useState(false)
    const [taxiSwitch, setTaxiSwitch] = useState(false)
    const [HumanPlayer, setHumanPlayer] = useState(false)
    const [HumanSwitch, setHumanSwitch] = useState(false)
    const [Team, setTeam] = useState('')
    const [match, setMatch] = useState('')
    const [autoAttempted, setautoAttempted] = useState(0);
    const [AutoUpper, setAutoUpper] = useState(0);
    const [autoLower, setAutoLower] = useState(0);
    const [teleAttempted, setTeleAttempted] = useState(0);
    const [TeleUpper, setTeleUpper] = useState(0);
    const [TeleLower, setTeleLower] = useState(0);

    const [hangerAttempted, sethangerAttempted] = useState(false);
    const [hanger, setHanger] = useState("");
    const [lowColor, setLowColor] = useState("white")
    const [midColor, setMidColor] = useState("white")
    const [highColor, setHighColor] = useState("white")
    const [treversalColor, setTreversalColor] = useState("white")
    const [noneColor, setNoneColor] = useState("white")

    const [shootLocation, setShootLocation] = useState([]);
    const [shootLocationText, setShootLocationText] = useState("");
    const [nearColor, setNearColor] = useState("white");
    const [middleColor, setMiddleColor] = useState("white");
    const [farColor, setFarColor] = useState("white");
    const [anyColor, setAnyColor] = useState("white");

    const [Drivetrainranking, setDrivetrainranking] = useState(1);
    const [DefenseRanking, setDefenceRanking] = useState(1);

    const [techFoul, setTechFoul] = useState(0);
    const [RedCard, setRedCard] = useState(0);
    const [YelloCard, setYelloCard] = useState(0);
    const [isDeactivated, setIsDeactivated] = useState(false);
    const [isDeactivatedSwtich, setisDeactivatedSwtich] = useState(false)
    const [isDisqualified, setIsDisqualified] = useState(false);
    const [isDisqualifiedSwitch, setisDisqualifiedSwitch] = useState(false)


    const [comments, setComments] = useState("");

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "dataCollect "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, matchNum TEXT, teamNum TEXT, taxi TEXT, humanShot TEXT, autoAttemptedShots INTEGER, autoLowerCargo INTEGER, autoUpperCargo INTEGER, teleAttemptedShots INTEGER, teleLowerCargo INTEGER, teleUpperCargo INTEGER, shootingLocation TEXT, climbAttempted TEXT, climb TEXT, defenseRanking INTEGER, redCard INTEGER, yelloCard INTEGER, techFouls INTEGER, deactivated TEXT, disqualified TEXT, extraComments TEXT);"
            )
        })
    }

    const handleTaxi = () => {
        taxi === false ? setTaxi(true) : setTaxi(false);
        setTaxiSwitch(!taxiSwitch)
    }
    const handleHuman = () => {
        HumanPlayer === false ? setHumanPlayer(true) : setHumanPlayer(false)
    }

    const handleAutoAttempted = (type) => {
        let setNum = autoAttempted;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setautoAttempted(setNum);
                return;
            }
        }
        setautoAttempted(setNum);
    }
    const handleCargoLower = (type) => {
        let setNum = autoLower;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setAutoLower(setNum)
                return;
            }
        }
        setAutoLower(setNum)
    }

    const handleCargoUpper = (type) => {
        let setNum = AutoUpper;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setAutoUpper(setNum)
                return;
            }
        }
        setAutoUpper(setNum)
    }

    const handleTeleAttempted = (type) => {
        let setNum = teleAttempted;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setTeleAttempted(setNum);
                return;
            }
        }
        setTeleAttempted(setNum);
    }

    const handleCargoLowerTele = (type) => {
        let setNum = TeleLower;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setTeleLower(setNum)
                return;
            }
        }
        setTeleLower(setNum)
    }
    const handleCargoUpperTele = (type) => {
        let setNum = TeleUpper;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setTeleUpper(setNum)
                return;
            }
        }
        setTeleUpper(setNum)
    }
    const handleNumPenalities = (PenalityType, incOrdec) => {
        let setNum = 0
        if (PenalityType === "tech") {
            setNum = techFoul;
        }
        else if (PenalityType === "yellow") {
            setNum = YelloCard;
        }
        else if (PenalityType === "red") {
            setNum = RedCard;
        }

        if (incOrdec === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
        }

        if (PenalityType === "tech") {
            setTechFoul(setNum);
        }
        else if (PenalityType === "yellow") {
            setYelloCard(setNum);
        }
        else if (PenalityType === "red") {
            setRedCard(setNum);
        }

    }

    const handleShootLocation = (type) => {
        let selectedColor = "#0782F9";
        let currentList = shootLocation;
        if (type === "near") {
            if (currentList.includes("anywhere", 0)) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
            if (nearColor === "white") {
                setNearColor(selectedColor);
                currentList = [...currentList, "near"];
            }
            else if (nearColor === selectedColor) {
                setNearColor("white");
                const index = currentList.findIndex((item) => item === "near")
                currentList.splice(index, 1);
            }
        }
        if (type === "middle") {
            if (currentList.includes("anywhere", 0)) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
            if (middleColor === "white") {
                setMiddleColor(selectedColor);
                currentList = [...currentList, "middle"];
            }
            else if (middleColor === selectedColor) {
                setMiddleColor("white");
                const index = currentList.findIndex((item) => item === "middle");
                currentList.splice(index, 1);
            }
        }
        if (type === "far") {
            if (currentList.includes("anywhere", 0)) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
            if (farColor === "white") {
                setFarColor(selectedColor);
                currentList = [...currentList, "far"];
            }
            else if (farColor === selectedColor) {
                setFarColor("white");
                const index = currentList.findIndex((item) => item === "far");
                currentList.splice(index, 1);
            }
        }
        if (type === "any") {
            if (anyColor === "white") {
                currentList = ["anywhere"];
                setAnyColor(selectedColor);
                setNearColor("white");
                setMiddleColor("white");
                setFarColor("white");
            }
            else if (anyColor === selectedColor) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
        }
        console.log(currentList);
        setShootLocation(currentList);

        let textVersion = "";
        currentList.forEach(element => {
            textVersion = textVersion + element + ", "
        });
        setShootLocationText(textVersion);
    }

    const handleHangerAttempt = () => {
        hangerAttempted === false ? sethangerAttempted(true) : sethangerAttempted(false)
    }
    const handleHanger = (type) => {
        let selectedColor = "#0782F9"

        if (type === "low") {
            setHanger("low")
            setNoneColor("white")
            setLowColor(selectedColor)
            setMidColor("white")
            setHighColor("white")
            setTreversalColor("white")
        }
        if (type === "mid") {
            setHanger("mid")
            setNoneColor("white")
            setLowColor("white")
            setMidColor(selectedColor)
            setHighColor("white")
            setTreversalColor("white")
        }
        if (type === "high") {
            setHanger("high")
            setNoneColor("white")
            setLowColor("white")
            setMidColor("white")
            setHighColor(selectedColor)
            setTreversalColor("white")
        }
        if (type === "t") {
            setHanger("traversal")
            setNoneColor("white")
            setLowColor("white")
            setMidColor("white")
            setHighColor("white")
            setTreversalColor(selectedColor)
        }
        if (type === "none") {
            setHanger("none")
            setNoneColor(selectedColor)
            setLowColor("white")
            setMidColor("white")
            setHighColor("white")
            setTreversalColor("white")
        }

    }

    const handleDeactivation = () => {
        // alert(value)
        isDeactivated === false ? setIsDeactivated(true) : setIsDeactivated(false);
        setisDeactivatedSwtich(!isDeactivatedSwtich)
    }
    const handleDisqualify = () => {
        // alert(value)
        isDisqualified === false ? setIsDisqualified(true) : setIsDisqualified(false);
        setisDisqualifiedSwitch(!isDisqualifiedSwitch);
    }

    const handleModalConfirm = () => {
        if (!Team) {
            alert("enter the team number")
            return;
        }
        if (!match) {
            alert("enter the match number")
            return;
        }
        if (!hanger) {
            alert("select the climb type, select none if the bot didn't climb");
            return;
        }
        let taxiToString = "false";
        if (taxi) {
            taxiToString = "true"
        }

        let humanShotToText = "false";
        if (HumanPlayer) {
            humanShotToText = "true"
        }
        let isDeactivatedToString = "false";
        if (isDeactivated) {
            isDeactivatedToString = "true";
        }
        let isDisqualifiedToString = "false";
        if (isDisqualified) {
            isDisqualifiedToString = "true";
        }

        let climbAttempted = "false";
        if(hangerAttempted){
            climbAttempted = "true";
        }
        createTable();
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO dataCollect (matchNum, teamNum, taxi, humanShot, autoAttemptedShots, autoLowerCargo, autoUpperCargo, teleAttemptedShots, teleLowerCargo, teleUpperCargo, shootingLocation, climbAttempted, climb, defenseRanking, redCard, yelloCard, techFouls, deactivated, disqualified, extraComments) VALUES ('" + match + "', '" + Team + "', '" + taxiToString + "', '" + humanShotToText + "', '" + autoAttempted + "', '" + autoLower + "', '" + AutoUpper + "', '" + teleAttempted + "', '" + TeleLower + "', '" + TeleUpper + "', '" + shootLocationText + "', '" + climbAttempted + "', '" + hanger + "', '" + DefenseRanking + "','" + RedCard + "','" + YelloCard + "','" + techFoul + "','" + isDeactivatedToString + "','" + isDisqualifiedToString + "','" + comments + "')"
            )
        })
        getDBData();
        navigation.navigate("Home")
    }

    const getDBData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM dataCollect', [],
                (tx, results) => {
                    console.log('results length: ', results.rows.length);
                    console.log("Query successful")
                    console.log(results.rows);
                })
        })

    }

    const checkTeamLength = (text) => {
        if (text.length < 5) {
            setTeam(text)
        }
    }
    const checkMatchLength = (text) => {
        if (text.length < 4) {
            setMatch(text)
        }
    }


    return (
        <>
            <ScrollView>
                <View style={{ backgroundColor: '#dedbd5' }}>

                    <Text style={{ fontSize: 40, alignSelf: 'center' }}>data collection</Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 50 }}>
                        <TextInput
                            placeholder="Team #"
                            keyboardType="number-pad"
                            value={Team}
                            onChangeText={text => checkTeamLength(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Match #"
                            keyboardType="number-pad"
                            value={match}
                            onChangeText={text => checkMatchLength(text)}
                            style={styles.input1}
                        />
                    </View>

                    <Text style={{ alignSelf: 'center', marginTop: 60, fontSize: 30 }}>
                        ----  Autonomous  ----
                    </Text>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>
                        <Text style={{ fontSize: 25 }}>Taxi: </Text>
                        {/* add human player shot*/}
                        <Switch
                            style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                            trackColor={{ false: "grey", true: "grey" }}//#767577
                            thumbColor={taxi ? "black" : "black"}//#f5dd4b
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={handleTaxi}
                            value={taxiSwitch}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>
                        <Text style={{ fontSize: 25 }}>Human Player Shot: </Text>
                        {/* add human player shot*/}
                        <Switch
                            style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                            trackColor={{ false: "grey", true: "grey" }}//#767577
                            thumbColor={HumanPlayer ? "black" : "black"}//#f5dd4b
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={handleHuman}
                            value={HumanPlayer}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>

                        <View>
                            <Text style={{ fontSize: 25 }}>attempted shots: </Text>
                        </View>

                        <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleAutoAttempted("other")} />
                        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{autoAttempted}</Text>
                        </TouchableOpacity>
                        <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleAutoAttempted('plus')} />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>

                        <View>
                            <Text style={{ fontSize: 25 }}>Cargo Lower: </Text>
                        </View>

                        <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleCargoLower("other")} />
                        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{autoLower}</Text>
                        </TouchableOpacity>
                        <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleCargoLower('plus')} />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>

                        <View>
                            <Text style={{ fontSize: 25 }}>Cargo Higher: </Text>
                        </View>

                        <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleCargoUpper("other")} />
                        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{AutoUpper}</Text>
                        </TouchableOpacity>
                        <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleCargoUpper('plus')} />
                    </View>

                    <Text style={{ alignSelf: 'center', marginTop: 60, fontSize: 30 }}>
                        ----  Teleop  ----
                    </Text>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>

                        <View>
                            <Text style={{ fontSize: 25 }}>attempted shots: </Text>
                        </View>

                        <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleTeleAttempted("other")} />
                        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{teleAttempted}</Text>
                        </TouchableOpacity>
                        <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleTeleAttempted('plus')} />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>

                        <View>
                            <Text style={{ fontSize: 25 }}>Cargo Lower: </Text>
                        </View>

                        <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleCargoLowerTele("other")} />
                        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{TeleLower}</Text>
                        </TouchableOpacity>
                        <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleCargoLowerTele('plus')} />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>

                        <View>
                            <Text style={{ fontSize: 25 }}>Cargo Higher: </Text>
                        </View>

                        <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleCargoUpperTele("other")} />
                        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{TeleUpper}</Text>
                        </TouchableOpacity>
                        <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleCargoUpperTele('plus')} />
                    </View>

                    <View style={{ alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>
                        <Text style={{ fontSize: 25 }}>Shooting Location: {"\n"}{shootLocationText}</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 10 }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: nearColor,
                                    borderRadius: 5,
                                    width: 50, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleShootLocation("near") }}
                            >
                                <Text>near</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{
                                    backgroundColor: middleColor,
                                    borderRadius: 5,
                                    width: 50, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleShootLocation("middle") }}
                            >
                                <Text>middle</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: farColor,
                                    borderRadius: 5,
                                    width: 50, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleShootLocation("far") }}
                            >
                                <Text>far</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: anyColor,
                                    borderRadius: 5,
                                    width: 80, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleShootLocation("any") }}
                            >
                                <Text>anywhere</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ alignSelf: 'center', marginTop: 30, fontSize: 30, marginLeft: 30 }}>
                        ---- Hanger ----
                    </Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>

                        <Text style={{ fontSize: 25 }}>climb attempted?   : </Text>
                        {/* add human player shot*/}
                        <Switch
                            style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                            trackColor={{ false: "grey", true: "grey" }}//#767577
                            thumbColor={HumanPlayer ? "black" : "black"}//#f5dd4b
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={handleHangerAttempt}
                            value={hangerAttempted}
                        />
                    </View>
                    <View style={{ alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>
                        <Text style={{ fontSize: 25 }}>Hanger: {hanger}</Text>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 10 }}>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: noneColor,
                                    borderRadius: 5,
                                    width: 50, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleHanger("none") }}
                            >
                                <Text>None</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{
                                    backgroundColor: lowColor,
                                    borderRadius: 5,
                                    width: 50, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleHanger("low") }}
                            >
                                <Text>Low</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: midColor,
                                    borderRadius: 5,
                                    width: 50, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleHanger("mid") }}
                            >
                                <Text>Mid</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: highColor,
                                    borderRadius: 5,
                                    width: 50, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleHanger("high") }}
                            >
                                <Text>High</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: treversalColor,
                                    borderRadius: 5,
                                    width: 80, height: 30,
                                    marginRight: 10, marginTop: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}

                                onPress={() => { handleHanger("t") }}
                            >
                                <Text>Traversal</Text>
                            </TouchableOpacity>

                        </View>
                        <Text style={{ alignSelf: 'center', marginTop: 60, fontSize: 30, marginRight: 30 }}>
                            ---- Defense ----
                        </Text>

                        <View style={{ marginTop: 40, alignContent: 'center', marginRight: 40 }}>
                            <Text style={{ fontSize: 25 }}>Defense ranking : {DefenseRanking}</Text>
                            <Slider
                                value={DefenseRanking}
                                onValueChange={(num) => { setDefenceRanking(num) }}
                                minimumValue={1}
                                maximumValue={5}
                                step={1}
                                onSlidingComplete={(num) => { setDefenceRanking(num) }}
                                allowTouchTrack
                                trackStyle={{ height: 10 }}
                                thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
                            />
                        </View>
                    </View>

                    <View style={{ alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>
                        <Text style={{ alignSelf: 'center', marginTop: 30, fontSize: 30, marginLeft: 30 }}>
                            ---- Penalities ----
                        </Text>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ fontSize: 25 }}>TechFoul: </Text>


                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleNumPenalities("tech", "minus")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{techFoul}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleNumPenalities("tech", "plus")} />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ fontSize: 25 }}>YelloCards: </Text>


                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleNumPenalities("yellow", "minus")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{YelloCard}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleNumPenalities("yellow", "plus")} />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ fontSize: 25 }}>RedCards: </Text>


                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleNumPenalities("red", "minus")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{RedCard}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleNumPenalities("red", "plus")} />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ fontSize: 25, marginRight: 10 }}>Deactivated/Broken: </Text>
                            {/* add human player shot*/}
                            <Switch
                                style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                trackColor={{ false: "grey", true: "grey" }}//#767577
                                thumbColor={taxi ? "black" : "black"}//#f5dd4b
                                ios_backgroundColor="#3e3e3e"
                                value={isDeactivatedSwtich}
                                onValueChange={handleDeactivation}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ fontSize: 25, marginRight: 10 }}>Disqualified: </Text>
                            {/* add human player shot*/}
                            <Switch
                                style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                trackColor={{ false: "grey", true: "grey" }}//#767577
                                thumbColor={taxi ? "black" : "black"}//#f5dd4b
                                ios_backgroundColor="#3e3e3e"
                                value={isDisqualifiedSwitch}
                                onValueChange={handleDisqualify}
                            />
                        </View>
                    </View>

                    <View style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 60 }}>
                        <Text style={{ fontSize: 30, alignSelf: 'center' }}>---- comments ----</Text>


                        <TextInput
                            placeholder="exta comments"
                            value={comments}
                            onChangeText={text => setComments(text)}
                            style={styles.comments}
                            multiline={true}

                        />

                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>

                        <AntDesign name='close' size={45} color={'#0782F9'} style={{ marginRight: 60 }} onPress={() => { navigation.navigate("Home") }} />
                        <AntDesign name='check' size={45} color={'#0782F9'} style={{ marginLeft: 60 }} onPress={handleModalConfirm} />
                    </View>

                </View>
            </ScrollView >
        </>
    )
}

export default DataCollect



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ButtonsContainer: {
        backgroundColor: "#0782F9",
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 10,
        marginTop: -100
    },
    Buttontext: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700'
    },

    TitleStyle: { fontSize: 40, marginTop: 100 },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: 100,
        marginRight: 30,
    },
    input1: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: 100
    },
    comments: {
        width: 350,
        height: 120,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    taxiButtons: {
        backgroundColor: "white",
        borderRadius: 5,
        width: 50,
        height: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }

});