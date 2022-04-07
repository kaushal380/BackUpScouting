import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
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
    const [Team, setTeam] = useState('')
    const [match, setMatch] = useState('')
    const [autoAttempted, setautoAttempted] = useState(0);
    const [autoAttemptedLower, setautoAttemptedLower] = useState(0);
    const [autoAttemptedHigher, setautoAttemptedHigher] = useState(0);
    const [AutoUpper, setAutoUpper] = useState(0);
    const [autoLower, setAutoLower] = useState(0);
    const [teleAttempted, setTeleAttempted] = useState(0);
    const [teleAttemptedLower, setTeleAttemptedLower] = useState(0);
    const [teleAttemptedHigher, setTeleAttemptedHigher] = useState(0);
    const [TeleUpper, setTeleUpper] = useState(0);
    const [TeleLower, setTeleLower] = useState(0);

    const [timeClimb, setTimeClimb] = useState("");
    const [hangerAttempted, sethangerAttempted] = useState(false);
    const [LowAttempted, setLowAttempted] = useState(false);
    const [midAttempted, setMidAttempted] = useState(false);
    const [highAttempted, setHighAttempted] = useState(false);
    const [traversalAttempted, setTreversalAttempted] = useState(false);
    const [hanger, setHanger] = useState("");
    const [lowColor, setLowColor] = useState("white")
    const [midColor, setMidColor] = useState("white")
    const [highColor, setHighColor] = useState("white")
    const [treversalColor, setTreversalColor] = useState("white")
    const [noneColor, setNoneColor] = useState("white")

    const [shootLocation, setShootLocation] = useState([]);
    const [shootFromOtherSide, setShootFromOtherSide] = useState(false);
    const [shootLocationText, setShootLocationText] = useState("");
    const [nearColor, setNearColor] = useState("white");
    const [middleColor, setMiddleColor] = useState("white");
    const [farColor, setFarColor] = useState("white");
    const [slightlyColor, setSlightlyColor] = useState("white");
    const [climbColor, setClimbColor] = useState("white");
    const [anyColor, setAnyColor] = useState("white");


    const [didDefend, setDidDefend] = useState(false);
    const [defendedTeam, setdefendedTeam] = useState("");
    const [DefenseRanking, setDefenceRanking] = useState(1);
    const [defenseComments, setDefenseComments] = useState("")


    const [wereDefended, setWereDefended] = useState(false);
    const [DefendedBy, setdefendedBy] = useState("");
    const [CounterDefenseRanking, setCounterDefenceRanking] = useState(1);
    const [CounterdefenseComments, setCounterDefenseComments] = useState("")

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
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, matchNum TEXT, teamNum TEXT, taxi TEXT, humanShot TEXT, AutoAttemptedLower INTEGER, autoLowerCargo INTEGER, AutoAttemptedHiger INTEGER, autoUpperCargo INTEGER, teleAttemptedLower INTEGER, teleLowerCargo INTEGER, teleAttemptedHigher INTEGER, teleUpperCargo INTEGER, shootingLocation TEXT, LowClimbAttempted TEXT, midClimbAttempted TEXT, highClimbAttempted TEXT, traversalAttempted TEXT, climb TEXT, defenseRanking INTEGER, redCard INTEGER, yelloCard INTEGER, techFouls INTEGER, deactivated TEXT, disqualified TEXT, extraComments TEXT);"
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

    const handleAutoAttemptedLower = (type) => {
        let setNum = autoAttemptedLower;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setautoAttemptedLower(setNum);
                return;
            }
        }
        setautoAttemptedLower(setNum);
    }

    const handleAutoAttemptedHigher = (type) => {
        let setNum = autoAttemptedHigher;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setautoAttemptedHigher(setNum);
                return;
            }
        }
        setautoAttemptedHigher(setNum);
    }

    const handleCargoLower = (type) => {
        let setNum = autoLower;
        let setAttempted = autoAttemptedLower
        if (type === "plus") {
            setNum++;
            setAttempted++;
            setautoAttemptedLower(setAttempted)
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
        let setAttempted = autoAttemptedHigher
        if (type === "plus") {
            setNum++;
            setAttempted++;
            setautoAttemptedHigher(setAttempted)
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

    const handleTeleAttemptedLower = (type) => {
        let setNum = teleAttemptedLower;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setTeleAttemptedLower(setNum);
                return;
            }
        }
        setTeleAttemptedLower(setNum);
    }

    const handleTeleAttemptedHigher = (type) => {
        let setNum = teleAttemptedHigher;
        if (type === "plus") {
            setNum++;
        }
        else {
            if (setNum > 0) {
                setNum--;
            }
            else {
                setTeleAttemptedHigher(setNum);
                return;
            }
        }
        setTeleAttemptedHigher(setNum);
    }

    const handleCargoLowerTele = (type) => {
        let setNum = TeleLower;
        let setAttempted = teleAttemptedLower
        if (type === "plus") {
            setNum++;
            setAttempted++;
            setTeleAttemptedLower(setAttempted)
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
        let setAttempted = teleAttemptedHigher
        if (type === "plus") {
            setNum++;
            setAttempted++;
            setTeleAttemptedHigher(setAttempted);
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

    const handleShootAreaCheck = () => {
        shootFromOtherSide === false ? setShootFromOtherSide(true) : setShootFromOtherSide(false);
    }
    const handleShootLocation = (type) => {
        let selectedColor = "#0782F9";
        let currentList = shootLocation;
        if (type === "up the fender") {
            if (currentList.includes("anywhere", 0)) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
            if (nearColor === "white") {
                setNearColor(selectedColor);
                currentList = [...currentList, "up the fender"];
            }
            else if (nearColor === selectedColor) {
                setNearColor("white");
                const index = currentList.findIndex((item) => item === "up the fender")
                currentList.splice(index, 1);
            }
        }
        if (type === "between") {
            if (currentList.includes("anywhere", 0)) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
            if (middleColor === "white") {
                setMiddleColor(selectedColor);
                currentList = [...currentList, "between the fender and the tarmac"];
            }
            else if (middleColor === selectedColor) {
                setMiddleColor("white");
                const index = currentList.findIndex((item) => item === "between the fender and the tarmac");
                currentList.splice(index, 1);
            }
        }
        if (type === "tarmac line") {
            if (currentList.includes("anywhere", 0)) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
            if (farColor === "white") {
                setFarColor(selectedColor);
                currentList = [...currentList, "tarmac line"];
            }
            else if (farColor === selectedColor) {
                setFarColor("white");
                const index = currentList.findIndex((item) => item === "tarmac line");
                currentList.splice(index, 1);
            }
        }
        if (type === "slightly") {
            if (currentList.includes("anywhere", 0)) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
            if (slightlyColor === "white") {
                setSlightlyColor(selectedColor);
                currentList = [...currentList, "slightly further from the tarmac"];
            }
            else if (slightlyColor === selectedColor) {
                setSlightlyColor("white");
                const index = currentList.findIndex((item) => item === "slightly further from the tarmac")
                currentList.splice(index, 1);
            }
        }
        if (type === "climb") {
            if (currentList.includes("anywhere", 0)) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
            if (climbColor === "white") {
                setClimbColor(selectedColor);
                currentList = [...currentList, "near the climb"];
            }
            else if (climbColor === selectedColor) {
                setClimbColor("white");
                const index = currentList.findIndex((item) => item === "near the climb")
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
                setSlightlyColor("white");
                setClimbColor("white");
            }
            else if (anyColor === selectedColor) {
                setAnyColor("white")
                const index = currentList.findIndex((item) => item === "anywhere");
                currentList.splice(index, 1);
            }
        }
        // console.log(currentList);
        setShootLocation(currentList);

        let textVersion = "";
        currentList.forEach(element => {
            textVersion = textVersion + element + ", "
        });
        setShootLocationText(textVersion);
    }

    const handleHangerAttemptLow = () => {
        LowAttempted === false ? setLowAttempted(true) : setLowAttempted(false)
    }

    const handleHangerAttemptMid = () => {
        midAttempted === false ? setMidAttempted(true) : setMidAttempted(false)
    }
    const handleHangerAttemptHigh = () => {
        highAttempted === false ? setHighAttempted(true) : setHighAttempted(false)
    }
    const handleHangerAttemptTrav = () => {
        traversalAttempted === false ? setTreversalAttempted(true) : setTreversalAttempted(false)
    }

    const handleDefenseSwitch = () => {
        didDefend === false ? setDidDefend(true) : setDidDefend(false)
    }

    const handleCounterDefenseSwitch = () => {
        wereDefended === false ? setWereDefended(true) : setWereDefended(false)
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

        let LowClimbAttempted = "false";
        if (LowAttempted) {
            LowClimbAttempted = "true";
        }

        let midClimbAttempted = "false";
        if (midAttempted) {
            midClimbAttempted = "true";
        }

        let highClimbAttempted = "false";
        if (highAttempted) {
            highClimbAttempted = "true";
        }

        let traversalAtt = "false";
        if (traversalAttempted) {
            traversalAtt = "true";
        }

        let shootOtherSide = "false";
        if (shootFromOtherSide) {
            shootOtherSide = "true";
        }

        let climbTime = parseInt(timeClimb)


        let defended = "false";
        if (didDefend) {
            defended = "true"
        }

        let counterDefense = "false";
        if (wereDefended) {
            counterDefense = "true"
        }
        // createTable();
        // db.transaction((tx) => {
        //     tx.executeSql(
        //         "INSERT INTO dataCollect (matchNum, teamNum, taxi, humanShot, AutoAttemptedLower, autoLowerCargo, AutoAttemptedHiger, autoUpperCargo, teleAttemptedLower, teleLowerCargo, teleAttemptedHigher, teleUpperCargo, shootingLocation, LowClimbAttempted, midClimbAttempted, highClimbAttempted ,traversalAttempted, climb, defenseRanking, redCard, yelloCard, techFouls, deactivated, disqualified, extraComments) VALUES ('" + match + "', '" + Team + "', '" + taxiToString + "', '" + humanShotToText + "', '" + autoAttemptedLower + "', '" + autoLower + "', '" + autoAttemptedHigher + "', '" + AutoUpper + "', '" + teleAttemptedLower + "', '" + TeleLower + "', '" + teleAttemptedHigher + "', '" + TeleUpper + "', '" + shootLocationText + "', '" + LowClimbAttempted + "', '" + midClimbAttempted + "', '" + highClimbAttempted + "', '" + traversalAtt + "', '" + hanger + "', '" + DefenseRanking + "','" + RedCard + "','" + YelloCard + "','" + techFoul + "','" + isDeactivatedToString + "','" + isDisqualifiedToString + "','" + comments + "')"
        //     )
        // })
        let obj = {
            matchNum: match,
            teamNum: Team,
            taxi: taxiToString,
            humanShot: humanShotToText,
            autoAttemptedLower: autoAttemptedLower,
            autoLowerCargo: autoLower,
            AutoAttemptedHigher: autoAttemptedHigher,
            autoUpperCargo: AutoUpper,
            teleAttemptedLower: teleAttemptedLower,
            teleLowerCargo: TeleLower,
            teleAttemptedHigher: teleAttemptedHigher,
            teleUpperCargo: TeleUpper,
            canShootFromOtherSide: shootOtherSide,
            shootLocation: shootLocationText,
            timeTakenToClimb: climbTime,
            LowClimbAttempted: LowClimbAttempted,
            midClimbAttempted: midClimbAttempted,
            highClimbAttempted: highClimbAttempted,
            traversalAttempted: traversalAtt,
            climb: hanger,
            didDefend: defended,
            defendedTeam: defendedTeam,
            defenseRanking: DefenseRanking,
            defenseComments: defenseComments,
            wereDefended: counterDefense,
            counterDefendedTeam: DefendedBy,
            CounterDefenseRanking: CounterDefenseRanking,
            CounterdefenseComments: CounterdefenseComments,
            redCard: RedCard,
            yelloCard: YelloCard,
            techFouls: techFoul,
            deactivated: isDeactivatedToString,
            disqualified: isDisqualifiedToString,
            extraComments: comments
        }

        insertData(obj);
        // getDBData();
        navigation.navigate("Home")
    }

    const insertData = async (newList) => {
        const documentSnapshot = await firebase.firestore()
            .collection("macon2022")
            .doc("matchScouting")
            .get()


        let existingData = Object.values(Object.seal(documentSnapshot.data()))

        let finalList = existingData.concat(newList)

        let finalObject = Object.assign({}, finalList)
        const firebaseAccess = firebase.firestore()

        firebaseAccess
            .collection("macon2022")
            .doc("matchScouting")
            .set(finalObject)
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
                <KeyboardAvoidingView
                    // style={styles.container}
                    behavior="padding" // try padding for ios maybe?
                >
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

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>
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
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>
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

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <View>
                                <Text style={{ fontSize: 25 }}>Attempted Lower: </Text>
                            </View>

                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleAutoAttemptedLower("other")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{autoAttemptedLower}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleAutoAttemptedLower('plus')} />
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <View>
                                <Text style={{ fontSize: 25 }}>Cargo Lower: </Text>
                            </View>

                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleCargoLower("other")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{autoLower}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleCargoLower('plus')} />
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <View>
                                <Text style={{ fontSize: 25 }}>Attempted Higher: </Text>
                            </View>

                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleAutoAttemptedHigher("other")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{autoAttemptedHigher}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleAutoAttemptedHigher('plus')} />
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

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

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <View>
                                <Text style={{ fontSize: 25 }}>Attempted Lower: </Text>
                            </View>

                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleTeleAttemptedLower("other")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{teleAttemptedLower}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleTeleAttemptedLower('plus')} />
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <View>
                                <Text style={{ fontSize: 25 }}>Cargo Lower: </Text>
                            </View>

                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleCargoLowerTele("other")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{TeleLower}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleCargoLowerTele('plus')} />
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <View>
                                <Text style={{ fontSize: 25 }}>Attempted Higher: </Text>
                            </View>

                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleTeleAttemptedHigher("other")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{teleAttemptedHigher}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleTeleAttemptedHigher('plus')} />
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <View>
                                <Text style={{ fontSize: 25 }}>Cargo Higher: </Text>
                            </View>

                            <AntDesign name='minus' size={35} color={'grey'} style={{ marginTop: 0, marginRight: 5 }} onPress={() => handleCargoUpperTele("other")} />
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 4, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{TeleUpper}</Text>
                            </TouchableOpacity>
                            <AntDesign name='plus' size={35} color={'grey'} style={{ marginTop: 0, marginLeft: 5 }} onPress={() => handleCargoUpperTele('plus')} />
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>
                            <Text style={{ fontSize: 25 }}>shoot from other side? </Text>
                            {/* add human player shot*/}
                            <Switch
                                style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                trackColor={{ false: "grey", true: "grey" }}//#767577
                                thumbColor={taxi ? "black" : "black"}//#f5dd4b
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleShootAreaCheck}
                                value={shootFromOtherSide}
                            />
                        </View>

                        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>
                            <Text style={{ fontSize: 25 }}>Shooting Location: {"\n"}{shootLocationText}</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 10 }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: nearColor,
                                        borderRadius: 5,
                                        width: 100, height: 30,
                                        marginRight: 10, marginTop: 10,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}

                                    onPress={() => { handleShootLocation("up the fender") }}
                                >
                                    <Text>up the fender</Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={{
                                        backgroundColor: middleColor,
                                        borderRadius: 5,
                                        width: 70, height: 30,
                                        marginRight: 10, marginTop: 10,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}

                                    onPress={() => { handleShootLocation("between") }}
                                >
                                    <Text>between</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: farColor,
                                        borderRadius: 5,
                                        width: 80, height: 30,
                                        marginRight: 10, marginTop: 10,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}

                                    onPress={() => { handleShootLocation("tarmac line") }}
                                >
                                    <Text>tarmac line</Text>

                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 10 }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: slightlyColor,
                                        borderRadius: 5,
                                        width: 160, height: 30,
                                        marginRight: 10, marginTop: 10,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}

                                    onPress={() => { handleShootLocation("slightly") }}
                                >
                                    <Text>slightly further from line</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: climbColor,
                                        borderRadius: 5,
                                        width: 100, height: 30,
                                        marginRight: 10, marginTop: 10,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}

                                    onPress={() => { handleShootLocation("climb") }}
                                >
                                    <Text>near the climb</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 10 }}>
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

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>
                            <Text style={{ fontSize: 25 }}>Heads to Hanger :   </Text>

                            <TextInput
                                placeholder="time"
                                value={timeClimb}
                                keyboardType='number-pad'
                                onChangeText={text => setTimeClimb(text)}
                                style={styles.timeClimb}
                                multiline={true}
                            />

                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 45 }}>

                            <Text style={{ fontSize: 25 }}>Low attempted?   : </Text>
                            {/* add human player shot*/}
                            <Switch
                                style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                trackColor={{ false: "grey", true: "grey" }}//#767577
                                thumbColor={HumanPlayer ? "black" : "black"}//#f5dd4b
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleHangerAttemptLow}
                                value={LowAttempted}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <Text style={{ fontSize: 25 }}>mid attempted?   : </Text>
                            {/* add human player shot*/}
                            <Switch
                                style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                trackColor={{ false: "grey", true: "grey" }}//#767577
                                thumbColor={HumanPlayer ? "black" : "black"}//#f5dd4b
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleHangerAttemptMid}
                                value={midAttempted}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <Text style={{ fontSize: 25 }}>high attempted?   : </Text>
                            {/* add human player shot*/}
                            <Switch
                                style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                trackColor={{ false: "grey", true: "grey" }}//#767577
                                thumbColor={HumanPlayer ? "black" : "black"}//#f5dd4b
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleHangerAttemptHigh}
                                value={highAttempted}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>

                            <Text style={{ fontSize: 25 }}>traversal attempted?   : </Text>
                            {/* add human player shot*/}
                            <Switch
                                style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                trackColor={{ false: "grey", true: "grey" }}//#767577
                                thumbColor={HumanPlayer ? "black" : "black"}//#f5dd4b
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleHangerAttemptTrav}
                                value={traversalAttempted}
                            />
                        </View>
                        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>
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
                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={{ fontSize: 25 }}>played defense? </Text>
                                    {/* add human player shot*/}
                                    <Switch
                                        style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                        trackColor={{ false: "grey", true: "grey" }}//#767577
                                        thumbColor={HumanPlayer ? "black" : "black"}//#f5dd4b
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={handleDefenseSwitch}
                                        value={didDefend}
                                    />
                                </View>
                                {didDefend &&
                                    <>
                                        <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 18, marginRight: 10 }}>Team they defended:</Text>
                                            <TextInput
                                                placeholder="Team #"
                                                keyboardType="number-pad"
                                                value={defendedTeam}
                                                onChangeText={(text) => setdefendedTeam(text)}
                                                style={styles.defenseTeam}
                                                textAlign='center'
                                            />
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <Text style={{ fontSize: 18 }}>Rate their defense: {DefenseRanking}</Text>

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

                                        <View style={{ marginVertical: 20 }}>
                                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Elaborate on their defense:</Text>
                                            
                                            <TextInput
                                                placeholder="defense comments"
                                                value={defenseComments}
                                                onChangeText={text => setDefenseComments(text)}
                                                style={styles.defenseComments}
                                                multiline={true}

                                            />
                                        </View>
                                    </>
                                }
                            </View>


                            <View style={{ marginTop: 40, alignContent: 'center', marginRight: 40 }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={{ fontSize: 25 }}>Were defended? </Text>
                                    {/* add human player shot*/}
                                    <Switch
                                        style={{ alignSelf: 'flex-start', marginBottom: -5, marginTop: -5 }}
                                        trackColor={{ false: "grey", true: "grey" }}//#767577
                                        thumbColor={HumanPlayer ? "black" : "black"}//#f5dd4b
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={handleCounterDefenseSwitch}
                                        value={wereDefended}
                                    />
                                </View>
                                {wereDefended &&
                                    <>
                                        <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 18, marginRight: 10 }}>Team they were defended by:</Text>
                                            <TextInput
                                                placeholder="Team #"
                                                keyboardType="number-pad"
                                                value={DefendedBy}
                                                onChangeText={(text) => setdefendedBy(text)}
                                                style={styles.defenseTeam}
                                                textAlign='center'
                                            />
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <Text style={{ fontSize: 18 }}>Rate their counter defense: {CounterDefenseRanking}</Text>

                                            <Slider
                                                value={CounterDefenseRanking}
                                                onValueChange={(num) => { setCounterDefenceRanking(num) }}
                                                minimumValue={1}
                                                maximumValue={5}
                                                step={1}
                                                onSlidingComplete={(num) => { setCounterDefenceRanking(num) }}
                                                allowTouchTrack
                                                trackStyle={{ height: 10 }}
                                                thumbStyle={{ height: 20, width: 20, backgroundColor: "grey" }}
                                            />
                                        </View>

                                        <View style={{ marginVertical: 20 }}>
                                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Elaborate on their counter defense:</Text>

                                            <TextInput
                                                placeholder="coutner defense comments"
                                                value={CounterdefenseComments}
                                                onChangeText={text => setCounterDefenseComments(text)}
                                                style={styles.defenseComments}
                                                multiline={true}

                                            />
                                        </View>
                                    </>
                                }
                            </View>
                        </View>

                        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 40 }}>
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
                                placeholder="extra comments"
                                value={comments}
                                onChangeText={text => setComments(text)}
                                style={styles.comments}
                                multiline={true}

                            />

                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 40 }}>

                            <AntDesign name='closecircleo' size={40} color={'#0782F9'} style={{ marginRight: 60 }} onPress={() => { navigation.navigate("Home") }} />
                            <AntDesign name='checkcircleo' size={40} color={'#0782F9'} style={{ marginLeft: 60 }} onPress={handleModalConfirm} />
                        </View>

                    </View>
                </KeyboardAvoidingView>
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
    defenseTeam: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: 70,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    timeClimb: {
        width: 50,
        height: 30,
        marginTop: 2,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 5
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
    defenseComments: {
        width: 300,
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