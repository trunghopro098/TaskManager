import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { windowH, windowW } from '../util/widthHeight'
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function TaskToday({navigation}) {
    const [task, settask] = useState([])
    const [All, setAll] = useState([])
    const [refresh, setrefresh] = useState(false)
    const [id, setid] = useState()
    const [dataRender, setdataRender] = useState([])
    const today = new Date()
    const datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    
    useEffect(() => {
        navigation.addListener('focus',()=>{
            getTask()
        })
        getTask()
    }, [refresh])

    const getTask = async()=>{
        try {
            const tasklocal = await AsyncStorage.getItem("TASK")
            if(tasklocal !== null){
                const arr = JSON.parse(tasklocal)
                const dataf = arr.filter((x)=>x.date === datetime)
                settask(dataf)
                setAll(arr)
                setdataRender(arr)
            
            }else{
                settask([])
                setAll([])
                setdataRender([])
            }
        } catch (error) {
            console.log(error)
        }
    }
    const check = (id)=>{
        setid(id)
        Alert.alert(
        "Alert",
        "Are you sure this job is done?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => handleCheck(id) }
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
    const hd = async(id)=>{
        let arr = [];
        if(All.length > 1){
            const find = All.findIndex((i)=>i.id == id)
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
        }else{
            await AsyncStorage.removeItem("TASK")
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
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={{height: 85,}}>
            <View style={styles.header}>
                <Text style={{fontSize: 16, color:'black', fontWeight:'bold'}}>Your task today</Text>
            </View>
            <View style={styles.content}>
            <Text style={{  fontSize: 13, textAlign:'center', fontStyle: 'italic',}}>
            today {datetime} wish you good luck and have a nice day.  
            </Text>
            </View>
        </View>
        <View style={{height: windowH-161}}>

        <ScrollView styles={{width:windowW, }}>
            {task?.length > 0 ?
            <>
            {task.map((value)=>{
                return(
                    <View key={value.id} style={{...styles.wrapItem, backgroundColor: value.status ? "#e6ffff":"white" }}>
                     {value.status == true ?
                        <TouchableOpacity onPress={()=>{
                            check(value.id)
                        }} style={{width: 30}}>
                        <AntDesign name="checkcircle" size={22} color={'green'}/>
                        </TouchableOpacity>:
                        <TouchableOpacity onPress={()=>{
                            uncheck(value.id)
                        }} style={{width: 30}}>
                            <AntDesign name="checkcircleo" size={22} color={'green'}/>
                        </TouchableOpacity>
                     }
                     <Text style={{ fontSize: 15, color:'gray', width: windowW-90, }}>{value.name}</Text>
                     <TouchableOpacity onPress={()=>d(value.id)} style={{width: 30}}>
                        <AntDesign name="delete" size={22} color={'red'}/>
                     </TouchableOpacity>
                    </View>
                )
            })}
            </>:
            <View style={{width:'100%',height: windowH*0.7, flexDirection:'row', justifyContent:"center", alignItems:"center" ,marginTop:20}}>
                <Text>No mission!</Text>
             </View>
            }
        </ScrollView>

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
        height:40,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{width:2, height: 2},
        shadowOpacity:.5,
        shadowRadius:4,
        elevation:4,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 5,
        paddingHorizontal:5,
        alignItems:"center"
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

    }
})