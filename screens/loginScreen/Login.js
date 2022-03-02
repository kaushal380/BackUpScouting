import { StyleSheet, Text, View, TextInput, Platform, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/core';


let { width } = Dimensions.get('window');
const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = (email, password) => {
    if((email === "techno-titans@titans.com") && (password === "techno-titans")){
        // alert("regular accounts")
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                navigation.navigate('Home')
            })
        return;
    }
    if((email === "techno-titans-admin@titans.com") && (password === "techno-titans-admin")){
        // alert("admin accounts");
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                navigation.navigate('Home')
            })
        return;
    }
    else{
        alert("invalid please try again")
    }
  }
  let type = "";
  // const { navigate } = props.navigation
  
  if(Platform.OS === 'ios'){
      type = "padding";
  }
  else if(Platform.OS === 'android'){
      type = "height";
  }
  else{type = "height"}

  return (
    <KeyboardAvoidingView
        style = {styles.container}
        behavior = {type}
    >
        <View>
            <Text style = {{fontSize: 30, marginBottom: 30}}>Techno Titans Scouting App</Text>
        </View>
        <View 
            style = {styles.inputContainer}
        >
            <TextInput
                placeholder = "Email"
                value = {email}
                onChangeText = {text => setEmail(text)}
                style = {styles.input}                   
            />
            <TextInput
                placeholder = "Password"
                value = { password}
                onChangeText = {text => setPassword(text)}
                style = {styles.input}
                secureTextEntry
            />
            <TouchableOpacity
                    onPress = {() => {handleSignIn(email, password)}}
                    style = {styles.button}
                >
                   <Text style = {styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    }, 
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },

    buttonText: {
        color: "white",
        fontWeight: '700',
        fontSize: 16,
    },

    buttonOutline:{
        backgroundColor: "white",
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    appName: {
        width: width,
        height: 100,
        alignSelf: 'center',
      },
    imageList: {
        flexDirection: 'row',
        marginVertical: 30
    }
})