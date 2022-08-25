import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { windowH, windowW } from '../util/widthHeight'
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function History({navigation}) {
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
                setdataRender(arr.reverse())
            }else{
                setdataRender([])
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const confirmDelete = () =>{
        Alert.alert(
            "Alert",
            "Do you want delete all your task?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Yes", onPress: () => handledeleteAll()}
            ]
          );
    }
    const handledeleteAll = async()=>{
        try {
            await AsyncStorage.removeItem("TASK")
            alert('Delete success !')
            setrefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={{height: windowH*0.2}}>
        <View style={styles.header}>
            <Text style={{fontSize: 16, color:'black', fontWeight:'bold'}}>All your task</Text>
           {dataRender.length > 0 &&  <TouchableOpacity style={{marginRight: 10}} 
            onPress={()=>{
                confirmDelete()
            }}>
                <AntDesign name="delete" size={22} color={'red'}/>
            </TouchableOpacity>}
            
        </View>
        <View style={styles.content}>
           <Text style={{  fontSize: 13, textAlign:'center', fontStyle: 'italic',}}>
           all your tasks are completed and unfinished and you are not allowed to edit the task status on this page. The task with blue background color is completed, red is not completed.
     Thank you!
           </Text>
        </View>
        </View>
        <View style={{height: windowH*0.8-74}}>
            <ScrollView styles={{marginBottom: 300}}>
                {dataRender?.length > 0 ?
                <>
                {dataRender.map((value)=>{
                    return(
                        <View key={value.id} style={{...styles.wrapItem, backgroundColor: value.status ? "#e6ffff":"#ffcccc" }}>
                        <Text style={{ marginLeft:10, fontSize: 15, color:'black', maxWidth: windowW-110, fontWeight:'bold'}}>{value.date}</Text>

                        <Text style={{ marginLeft:10, fontSize: 15, color:'gray', maxWidth: windowW-110}}>{value.name}</Text>
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
        justifyContent:'space-between',
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