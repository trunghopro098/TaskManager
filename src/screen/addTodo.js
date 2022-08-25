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
    const [refresh, setrefresh] = useState(true)
    const today = new Date()
    const datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    
    useEffect(() => {
        navigation.addListener('focus',()=>{
            console.log("xin chao")
        getTask()
        })
        getTask()
    }, [refresh])

    const getTask = async()=>{
        try {
            const tasklocal = await AsyncStorage.getItem("TASK")
            if(tasklocal !== null){
                const arr = JSON.parse(tasklocal)
                settask(arr)
            }else{
                settask([])
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddName = async()=>{
        const time = today.getHours()+'-'+(today.getMinutes())+'-'+today.getSeconds()
        const d1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        let data = [];
        if(name.trim() !== "" && name.length > 3){
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
            Alert.alert(
                "Alert",
                "Add task success!",
                [
                  {
                    text: "Ok",
                    style: "cancel"
                  },
                ]
              );
              setname('')
              data = []
              setrefresh(!refresh)
        }else{
            alert("Please enter a task name that is more than 3 characters long!")
        }
    }
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
            <Text style={{fontSize: 16, color:'black', fontWeight:'bold'}}>New task</Text>
        </View>

      <View style={styles.content}>
        <Text style={{color: "black",extAlign:'center', fontSize: 16, fontWeight:'bold', marginBottom: 20, marginTop:-30}}>Enter your task name in today's list</Text>
      <TextInput
        style={styles.inputForm}
        placeholder="Enter task name"
        placeholderTextColor="black" 
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        width:"100%",
        height:40,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{width:2, height: 2},
        shadowOpacity:.5,
        shadowRadius:4,
        elevation:4,
        padding: 8,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
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
        borderColor:"black",
        borderRadius:10,
        color:"black",
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