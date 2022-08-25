import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { windowH, windowW } from '../util/widthHeight'
import * as Progress from 'react-native-progress';


export default function Home({navigation}) {
    const [task, settask] = useState([])
    const [All, setAll] = useState([])
    const [name, setname] = useState('')
    const [refresh, setrefresh] = useState(false)
    const [id, setid] = useState()

    const [tasktoday, setTaskToday] = useState(0)
    const [taskCompletedToday, settaskCompletedToday] = useState(0)
    const [taskInprogreToday, settaskInprogreToday] = useState(0)
    const [pesentComplete, setpesentComplete] = useState(0)
    const [persentIncom, setpersentIncom] = useState(0)

    const [taskAllComplete, settaskAllComplete] = useState(0)
    const [taskAllImCom, settaskAllInCom] = useState(0)
    const [persentAllComplete, setpersentAllComplete] = useState(0)
    const [persentAllIn, setpersentAllIn] = useState(0)
    const [show, setshow] = useState(false)
    const today = new Date()
    const datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        navigation.addListener('focus',()=>{
            // setshow(false)
            getTask()
            // setshow(true)
        })
        
    }, [])

    const getTask = async()=>{
        try {
            
            const tasklocal = await AsyncStorage.getItem("TASK")
            if(tasklocal !== null){
                setshow(false)
                const arr = JSON.parse(tasklocal)
                const dataAllIn = arr.filter((x)=> x.status === false)
                const dataAllCom = arr.filter((x)=> x.status === true)
            
                let perAllInCom = ((dataAllIn.length/arr.length)).toFixed(2)
                let perAllComplete = ((dataAllCom.length/arr.length)).toFixed(2)
                settaskAllComplete(dataAllCom.length)
                settaskAllInCom(dataAllIn.length)
                setpersentAllComplete(Number(perAllComplete))
                setpersentAllIn(Number(perAllInCom))
                setAll(arr)
                // filter data today
                const dataToday = arr.filter((x)=>x.date === datetime)
                if(dataToday.length > 0){
                    setTaskToday(dataToday.length)
                    const dataComplete = dataToday.filter((x)=> x.status === true)
                    const dataInCom = dataToday.filter((x)=> x.status === false)
                    let perComplete = ((dataComplete.length/dataToday.length)).toFixed(2)
                    let perInCom = ((dataInCom.length/dataToday.length)).toFixed(2)
                    settaskCompletedToday(dataComplete.length)
                    settaskInprogreToday(dataInCom.length)
                    setpesentComplete(Number(perComplete))
                    setpersentIncom(Number(perInCom))
                    setshow(true)
                    // console.log("num",Number(perComplete))
                }else{
                    setTaskToday(0)
                    setshow(true)
                }
            }else{
                setshow(false)
                settaskAllComplete(0)
                settaskAllInCom(0)
                setpersentAllComplete(0)
                setpersentAllIn(0)
                setAll([])
                settaskCompletedToday(0)
                settaskInprogreToday(0)
                setpesentComplete(Number(0))
                setpersentIncom(Number(0))
                setTaskToday(0)
                setshow(true)
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async()=>{
        try {
            const user = await AsyncStorage.getItem("NAME")
            if(user !== null){
                setname(user)
            }
        } catch (error) {   
        }
    }
    const check = (id)=>{
        setid(id)
        Alert.alert(
        "Alert",
        "Do you want update this task?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => handleCheck(id) }
        ]
      );
}
    const hd = async(id)=>{
        const find = All.findIndex((i)=>i.id == id)
        let arr = [];
        if(find !== -1){
            if(All.length == 1){
                arr = []
            }else{
                All.splice(find,1)
                arr = All
            }    

            await AsyncStorage.setItem("TASK", JSON.stringify(arr))
            alert('Delete task success !')
            setrefresh(!refresh)
        }
    }
    const d = (id)=>{
        Alert.alert(
            "Alert",
            "Do you want delete this task?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => hd(id) }
            ]
          );
    }
    const handleCheck = async(id)=>{
        let data = All.map((v)=>{
            if(v.id === id){
                return {...v, status: false}
            }else{
                return v
            }
        })
        await AsyncStorage.setItem("TASK", JSON.stringify(data))
        setrefresh(!refresh)
        alert('Update task success !')
    }
    const handleUnCheck = async(id)=>{
        let data = All.map((v)=>{
            if(v.id === id){
                return {...v, status: true}
            }else{
                return v
            }
        })
        await AsyncStorage.setItem("TASK", JSON.stringify(data))
        setrefresh(!refresh)
        alert('Update task success !')
    }

    const uncheck = (id)=>{
            setid(id)
            Alert.alert(
            "Alert",
            "Are you sure this job is done?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => handleUnCheck(id) }
            ]
          );
    }
    const handleDe = async()=>{
        await AsyncStorage.removeItem("TASK")
        alert('delete success!')
            setrefresh(!refresh) 
        
        

    }
    const deleted = ()=>{
        Alert.alert(
            "Alert",
            "Do you want to delete all your tasks? Includes previous dates.",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => handleDe() }
            ]
          );

    }
  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView  style={styles.container}>
        <StatusBar 
            backgroundColor="white"
            barStyle="dark-content"
        />
        <View style={styles.header1}>
            <Text style={{fontSize:18, color:'gray', }}>Hey, {name} !</Text>
            <Text style={{fontSize:20, color:'black', fontWeight:'bold', marginTop: 5 }}>You have</Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:20, color:'red', fontWeight:'bold', marginTop: 5 }}>{tasktoday}</Text>
            <Text style={{fontSize:20, color:'black', fontWeight:'bold', marginTop: 5 }}> task today</Text>
            </View>
            
            <View style={styles.card1}>
                <View style={styles.contentC1}>
                    <Text style={{fontSize:18, color:'black', fontWeight:'bold', marginTop: 5 }}>Task complete</Text>
                    <Text style={{fontSize:14, color:'gray', marginTop: 5 }}>{taskCompletedToday}/{tasktoday} task</Text>
                </View>
                {show && <View style={styles.contentC1}>
                <Progress.Circle
                    progress={pesentComplete}
                    size={70}
                    showsText={true} 
                    formatText={()=>`${((pesentComplete*100).toFixed(0))}%`}
                    color={'#0000ff'} 
                    thickness={5} 
                    borderWidth={1}      
                    borderColor={'red'}
                    />
                    <Text style={{fontSize:14, color:'gray',marginTop: 6}}>Completed</Text>
                </View>}

              
            </View>
            <View style={styles.card1}>
                <View style={styles.contentC1}>
                    <Text style={{fontSize:18, color:'black', fontWeight:'bold', marginTop: 5 }}>To Do</Text>
                    <Text style={{fontSize:14, color:'gray', marginTop: 5 }}>{tasktoday} Task today</Text>
                </View>
               {show && <View style={styles.contentC1}>
                <Progress.Circle
                    progress={persentIncom}
                    size={70}
                    showsText={true} 
                    formatText={()=>`${persentIncom*100}%`}
                    color={'#0000ff'} 
                    thickness={5} 
                    borderWidth={1}      
                    borderColor={'red'}   
                    direction='counter-clockwise'  
                    />
                    <Text style={{fontSize:14, color:'gray', }}>In progress</Text>
                </View>}

              
            </View>
        </View>

            <Text style={{color:'black', fontWeight:'bold', fontSize: 20, marginLeft: 12, marginTop: 10 }}>
            All your mission
           </Text>
        <View style={styles.content1}>
           {show && <View style={{...styles.card2,backgroundColor:'#0000ff', borderRadius: 20, padding: 10, flexDirection:'column', justifyContent:'space-between', alignItems:"center"}}>
                <Text style={{color:'white', fontSize: 15, fontWeight:'bold'}}>Task completed</Text>
                <Progress.Circle
                    progress={Number(persentAllComplete)}
                    size={90}
                    showsText={true} 
                    formatText={()=>`${taskAllComplete} Task`}
                    color={'white'} 
                    thickness={10} 
                    borderWidth={1}      
                    borderColor={'yellow'}     
                    />
                <Text style={{color:'white', fontSize: 15, fontWeight:'bold'}}>{taskAllComplete}/{All.length} Task</Text>

            </View>}
            <View style={{...styles.card2, borderRadius: 20, flexDirection:'column', justifyContent:'space-between', alignItems:"center"}}>
               {show && <View style={{
                width:'100%',
                height:"45%",
                backgroundColor:'white',
                borderRadius:10,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                padding: 8,
                backgroundColor:'#d966ff'
                }}>
                    <Text style={{color:'white', fontSize: 13, fontWeight:'bold', maxWidth:'50%'}}>Task Completed</Text>
                    <Progress.Circle
                    progress={Number(persentAllComplete)}
                    size={60}
                    showsText={true} 
                    formatText={()=>`${(persentAllComplete*100).toFixed(0)}%`}
                    color={'white'} 
                    thickness={5} 
                    borderWidth={1}      
                    borderColor={'yellow'}     
                    />
               </View>}

               {show && <View style={{
                width:'100%',
                height:"45%",
                backgroundColor:'white',
                borderRadius:10,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                padding: 8,
                backgroundColor:'#001a13'
                }}>
                    <Text style={{color:'white', fontSize: 13, fontWeight:'bold', maxWidth:'50%'}}>In progress</Text>
                    <Progress.Circle
                    progress={Number(persentAllIn)}
                    size={60}
                    showsText={true} 
                    formatText={()=>`${persentAllIn*100}%`}
                    color={'white'} 
                    thickness={5} 
                    borderWidth={1}      
                    borderColor={'yellow'} 
                     direction='counter-clockwise'    
                    />
               </View>}

            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    header:{
        width:"100%",
        height:55,

        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{width:2, height: 2},

        shadowOpacity:.5,
        shadowRadius:4,
        elevation:4,

        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    btn:{
        height: "70%",
        width: windowW*0.3,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    content:{
        paddingVertical:10,
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'pink',
        paddingHorizontal:6
    },
    content1:{
        width:"100%",
        backgroundColor:'white',
        // shadowColor:'#000',
        // shadowOffset:{width:2, height: 2},
        // shadowOpacity:.5,
        // shadowRadius:4,
        // elevation:4,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 5,
        paddingHorizontal:5,
        alignItems:"center",
        paddingHorizontal: 12,
        
    },
    wrapItem:{
        marginHorizontal: 5,
        width:windowW-10,
        minHeight: 55,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{width:2, height: 2},
        shadowOpacity:.5,
        shadowRadius:4,
        elevation:6,
        borderRadius:10,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginBottom: 5,
        marginTop:5,
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center'

    },
    header1:{
        width:windowW,
        paddingHorizontal: 12,
        paddingTop: 10
    },
    card1:{
        width: windowW-24,
        height: 100,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{width:2, height: 2},
        shadowOpacity:.5,
        shadowRadius:4,
        elevation:4,
        padding:8,
        marginTop: 8,
        borderRadius: 8,
        flexDirection:'row',
        justifyContent:'space-between',
        // alignItems:'center'
    },
    contentC1:{
        flexDirection:'column',
        justifyContent: 'space-around',

    },
    card2:{
        // backgroundColor: 'red',
        height: 180,
        width:windowW*0.5-24
    }
})