import { View, Text, ImageBackground, StatusBar, StyleSheet, Image, Button, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import background1 from '../public/img/bf.jpg'
import { windowW,windowH } from '../util/widthHeight'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Login({navigation}) {
    const [name, setname] = useState("")
    const handleAddName = async()=> {
        try {
        if(name.trim() == ""){
            alert("Please enter your name!")
        }else{
            await AsyncStorage.setItem("NAME", name)
            navigation.replace('home')
            setname('')
        }
            // navigation.navigate('home')
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <ImageBackground
        source={background1}
        style={styles.container}>
        <StatusBar 
            backgroundColor="#e6ccff"
            barStyle="dark-content"
        />
        <View
            style={{
            flex:1,
            backgroundColor: 'rgba(0,0,0, .7)',
            alignItems:'center',
            paddingHorizontal: 20
            }}
        >
        <View style={styles.body}>
                <Image source={require('../public/img/logo.png')}
                    resizeMode='contain'
                    style={{
                        width:windowW*0.5,
                        height: windowH*0.5,
                        marginTop: -40
                    }}
                />
                <TextInput
                    style={styles.inputForm}
                    placeholder="Enter your name"
                    placeholderTextColor="white" 
                    onChangeText={setname}
                    value={name}
                />
                <TouchableOpacity style={styles.btn1} onPress={()=>{handleAddName()}}>
                    <LinearGradient colors={["#ccffff","#99bbff","#cc99ff"]} style={styles.layoutBTN}>
                        <Text style={styles.textButton}>
                            Add name
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
        </View> 
        </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputForm:{
        width:windowW*0.7,
        height: 50,
        borderWidth:1,
        borderColor:"white",
        borderRadius:10,
        color:"white",
        marginTop:-40,
        textAlign:"center"
    },
    linear:{
        flex:1,
        width: "100%",
        height:"100%",
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    header:{
        width: "100%",
        height: 50,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity:.5,
        shadowRadius: 2,
        elevation: 3,
        flexDirection:'row',
        alignItems:'center',
    },
    body:{
        width: "100%",
        height: "100%",
        backgroundColor:'transparent',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    btn1:{
        width: "30%",
        height: 45,
        borderRadius: 4,
        overflow:'hidden',
        marginTop:18
    },
    layoutBTN:{
        width: "100%",
        height:"100%",
        justifyContent:'center',
        alignItems:'center'
    },
    textButton:{
        fontSize: 18,
        fontWeight:'bold',
        color:'black'
    }
})