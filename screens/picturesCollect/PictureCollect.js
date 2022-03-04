import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CameraComponent } from "../picturesCollect/Camera";
import { AntDesign, Entypo } from "@expo/vector-icons"
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigation } from '@react-navigation/core';
const PictureCollect = () => {
    const navigation = useNavigation()
    const [image, setImage] = useState();
    const [team, setTeam] = useState();
    const pictureSubmit = async () => {
        if(!team){
            alert("enter the team number")
            return;
        }
        let url = ""
        try {
            const storage = getStorage();
            // const ref = ref(storage, 'image.png');
            let name = team + ".jpg"
            const reference = ref(storage, name)
            // const img = await fetch(image);
            // const bytes =
            const img = await fetch(image);
            const bytes = await img.blob();
            await uploadBytesResumable(reference, bytes)
            url = (await getDownloadURL(reference)).toString()
            console.log(url)
            navigation.navigate('Home');
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInput
                    placeholder="Team #"
                    keyboardType='numbers-and-punctuation'
                    value={team}
                    onChangeText={text => setTeam(text)}
                    style={styles.Teaminput}
                />
                <CameraComponent image={image} setImage={setImage} />
                <TouchableOpacity style={styles.ButtonsContainer} onPress={pictureSubmit}>
                    <Text style={{ color: "white" }}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>



    )
}

export default PictureCollect

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        marginTop: 50
    },
})

// import React, { useState } from 'react';
// import { View, TouchableOpacity, StyleSheet, Text, Alert, Dimensions, Image } from 'react-native';
// import { CameraComponent } from "../picturesCollect/Camera";
// import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
// import { useNavigation } from '@react-navigation/core';

// const PictureCollect = () => {
//     const navigation = useNavigation();
//     const [image, setImage] = useState();
//     const handlePictureUpload = async() => {
//         let url = ""
//         try {
//             const storage = getStorage();
//             // const ref = ref(storage, 'image.png');
//             let name = team + ".jpg"
//             const reference = ref(storage, name)
//             // const img = await fetch(image);
//             // const bytes =
//             const img = await fetch(image);
//             const bytes = await img.blob();
//             await uploadBytesResumable(reference, bytes)
//             url = (await getDownloadURL(reference)).toString()
//             console.log(url)
//         }
//         catch (e) {
//             console.log(e)
//         }
//     }
//     return(
//         <View>
//             <Text>Hello</Text>
//         </View>
//     )
// }
// export default PictureCollect;


