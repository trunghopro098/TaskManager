import { View, Text, SafeAreaView, StyleSheet, TextInput, Alert, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowW } from '../util/widthHeight'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import background1 from '../public/img/bg.png'

export default function AddTodo({navigation}) {
    const [name, setname] = useState('')
    const [task, settask] = useState([])
    const [show, setshow] = useState(true)
    const today = new Date()
    const datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    
    useEffect(() => {
        getTask()
    }, [show])

    const getTask = async()=>{
        try {
            const tasklocal = await AsyncStorage.getItem("TASK")
            if(tasklocal !== null){
                const arr = JSON.parse(tasklocal)
                console.log(arr)
                settask(arr)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddName = async()=>{
        const time = today.getHours()+'-'+(today.getMinutes())+'-'+today.getSeconds()
        const d1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        let data = [];
        if(name.trim() !== "" && name.length > 10){
            const arrItem = {
                id:time+d1,
                name: name,
                date: datetime,
                status: false
            }
            if(task.length > 0){
                data = task.concat([arrItem])
            }else{
                data = [arrItem]
            }
            await AsyncStorage.setItem("TASK", JSON.stringify(data))
            // await AsyncStorage.removeItem("TASK")
            setname('')
            setshow(!show)
            Alert.alert(
                "Alert",
                "Add task success! When you goback to the main screen, press the refresh icon to load the display of your task!",
                [
                  {
                    text: "New Task",
                    style: "cancel"
                  },
                  { text: "Back home", onPress: () => {navigation.goBack('home')} }
                ]
              );
            // alert("")
        }else{
            alert("Please enter a task name that is more than 10 characters long!")
        }
    }
  return (
    <ImageBackground
    source={background1}
    style={styles.container}>
      <View style={styles.content}>
        <Text style={{color: "white",extAlign:'center', fontSize: 16, fontWeight:'bold', marginBottom: 20, marginTop:-30}}>Enter your task name in today's list</Text>
      <TextInput
        style={styles.inputForm}
        placeholder="Enter task name"
        placeholderTextColor="white" 
        onChangeText={setname}
        value={name}
       />
        <TouchableOpacity style={styles.btn1} onPress={()=>{handleAddName()}}>
            <LinearGradient colors={["#ccffff","#99bbff","#cc99ff"]} style={styles.layoutBTN}>
                <Text style={styles.textButton}>
                    Add task
                </Text>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        width:'100%',
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:"center",
        // backgroundColor:'black'
    },
    inputForm:{
        width:windowW*0.8,
        height: 50,
        borderWidth:1,
        borderColor:"white",
        borderRadius:10,
        color:"white",
        paddingHorizontal:8
        // marginTop:-40,
        // textAlign:"center"
    },
    textButton:{
        fontSize: 18,
        fontWeight:'bold',
        color:'black'
    },
    btn1:{
        width: windowW*0.4,
        height: 45,
        borderRadius: 4,
        overflow:'hidden',
        marginTop:18
    },layoutBTN:{
        width: "100%",
        height:"100%",
        justifyContent:'center',
        alignItems:'center'
    },
})