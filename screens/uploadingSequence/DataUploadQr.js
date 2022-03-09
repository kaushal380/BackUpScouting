import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { QRCode, Canvas } from 'easyqrcode-react-native';

const DataUploadQr = ({ setModal, matchData, pitData, clearDBData, setUploadingMatchData, setUploadingPitscoutingData }) => {

    const matchDataToString = () => {
        let list = []
        list = matchData
        // console.log(list.toString());
        let jSonStuff = JSON.stringify(list);
        // console.log(jSonStuff);
        return jSonStuff;
    }
    const pitDataToString = () => {
        let list = []
        list = pitData
        // console.log(list.toString());
        let jSonStuff = JSON.stringify(list);
        // console.log(jSonStuff);
        return jSonStuff;
    }
    const generateQRCode = (canvas) => {
        if (canvas !== null) {
            // QRCode options
            var options = {
                text: matchDataToString(),
            };
            // Create QRCode Object
            var qrCode = new QRCode(canvas, options);
        }
    }
    const pitGenerateQrcode = (canvas) => {
        if (canvas !== null) {
            // QRCode options
            var options = {
                text: pitDataToString(),
            };
            // Create QRCode Object
            var qrCode = new QRCode(canvas, options);
        }
    }

    const handleSubmitUpload = () => {
        setUploadingMatchData([])
        setUploadingPitscoutingData([])
        clearDBData()
        setModal(false);
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.qrCodeContainer}>
                    <Text style={styles.qrText}>match data</Text>
                    <Canvas ref={generateQRCode} />
                </View>
                <View style={styles.qrCodeContainer} onPress={pitDataToString}>
                    <Text style={styles.qrText}>pit data</Text>
                    <Canvas ref={pitGenerateQrcode} />
                </View>
                <View style={{ width: 400, flexDirection: 'row', alignSelf: 'center', alignContent: 'center', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={styles.synchButton} onPress = {handleSubmitUpload}>
                        <AntDesign name='check' size={25} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.synchButton} onPress = {() => {setModal(false)}}>
                        <AntDesign name='close' size={25} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default DataUploadQr

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrText: {
        fontSize: 30
    },
    qrCodeContainer: {
        margin: 40
    },

    synchButton: {
        backgroundColor: "#0782F9",
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        marginTop: 20,
        borderRadius: 50,
    }
})