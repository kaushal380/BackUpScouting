import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert, Dimensions, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export const CameraComponent = ({image, setImage}) => {

    //TODO: Multiple Photos? Record video functionality 
    let camera
    // const [image, setImage] = useState(null);
    const [permission, setPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(false);

    const width = Dimensions.get('window').width - 50;
    const height = Dimensions.get('window').height - 200;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const requestPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setPermission(true);
            setShowCamera(true);
        } else {
            Alert.alert("Camera permissions denied");
        }
    }

    const takePhoto = async () => {
        const { uri } = await camera.takePictureAsync({ quality: 1 });
        console.log(uri)
        setImage(uri);
    }

    const resetImage = () => {
        setImage(null);
        setShowCamera(false);
    }

    const cameraView = (
        <View style={{ borderWidth: 1, height: height, width: width, marginLeft: 25 }}>
            <Camera
                style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "flex-end" }}
                type={Camera.Constants.Type.back}
                ref={ref => { camera = ref }}
            >
                <TouchableOpacity style={styles.CameraButton} onPress={takePhoto}>
                    <Text> </Text>
                </TouchableOpacity>
            </Camera>
        </View>
    )

    const normalView = (
        <View style={{ borderWidth: 1, height: 269, marginRight: 20, marginLeft: 20 }}>
            <View style={{ flexDirection: "column", aligncontent: "center", justifyContent: "space-around", flex: 1 }}>
                <TouchableOpacity style={styles.ButtonsContainer} onPress={pickImage}>
                    <Text style={styles.Buttontext}>Pick an image from camera roll</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonsContainer} onPress={requestPermission}>
                    <Text style={styles.Buttontext}>Take a picture or video</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    const photoView = (
        <View style={{ flex: 1, height: 500, marginRight: 20, marginLeft: 20 }}>
            <Image source={{ uri: image }} style={{ flex: 1, resizeMode: 'contain' }} />
            <TouchableOpacity style={styles.retakeButton} onPress={resetImage}>
                <Text style={{ color: '#D1F5FF', fontWeight: 'bold' }}>Back</Text>
            </TouchableOpacity>
        </View>
    )
    
    if (image) {
        return photoView;
    } else if (showCamera && permission) {
        return cameraView;
    } else {
        return normalView;
    }


    
}

const styles = StyleSheet.create({
    ButtonsContainer: {
        backgroundColor: "#0782F9",
        width: 269,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 10,
        marginLeft: 50
    },
    Buttontext: {
        color: 'white',
        fontSize: 17,
        fontWeight: '700'
    },
    CameraButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        opacity: 5,
        width: 50,
        height: 50,
        marginBottom: 10
    },
    retakeButton: {
        backgroundColor: "#7D53DE", 
        width: 75, 
        height: 40, 
        borderRadius: 100,
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 15, 
        marginLeft: 150
    }
})