import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { windowW } from '../util/widthHeight'
export default function Home({navigation}) {
    const [task, settask] = useState([])
    const [All, setAll] = useState([])
    const [name, setname] = useState('')
    const [refresh, setrefresh] = useState(false)
    const [id, setid] = useState()
    const today = new Date()
    const datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getTask()
    }, [refresh])

    const getTask = async()=>{
        try {
            const tasklocal = await AsyncStorage.getItem("TASK")
            if(tasklocal !== null){
                const arr = JSON.parse(tasklocal)
                const dataf = arr.filter((x)=>x.date === datetime )
                console.log(dataf)
                settask(dataf)
                setAll(arr)
            }else{

                settask([])
                setAll([])
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
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={{...styles.btn, backgroundColor:'tomato'}} onPress={()=>{navigation.navigate('history')}}>
            <Text style={{color: "white", fontWeight:'bold'}}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.btn, backgroundColor:'blue'}} onPress={()=>{navigation.navigate("addtodo")}}>
            <Text style={{color: "white", fontWeight:'bold'}}>New Task</Text>
          </TouchableOpacity>
          {All?.length > 0 && 
            <TouchableOpacity style={{...styles.btn, backgroundColor:'red'}} onPress={()=>deleted()}>
                <Text style={{color: "white", fontWeight:'bold'}}>Delete</Text>
            </TouchableOpacity>
          }
          
        </View>
        <View style={styles.content}>
           <Text style={{color:'black', fontWeight:'bold', fontSize: 17 }}>
            Hello {name} 
           </Text>
           <Text style={{  fontSize: 13, textAlign:'center', fontStyle: 'italic',}}>
           Today {datetime} Wish you a happy drawing day happy and well done.
           </Text>
        </View>
        <View style={styles.content1}>
           <Text style={{color:'black', fontWeight:'bold', fontSize: 17 }}>
            Your task today date {datetime}
           </Text>
           <TouchableOpacity style={{marginRight:10}} 
           onPress={()=>{
            const a = [];
            setrefresh(!refresh) 
            settask(a)
            }}>
           <Image source={require('../public/icons/refresh.png')} resizeMode="contain" style={{width: 30, height: 30}} />
           </TouchableOpacity>
        </View>
        <ScrollView styles={{width:windowW}}>
            {task?.length > 0 ?
            <>
            {task.map((value)=>{
                return(
                    <View key={value.id} style={{...styles.wrapItem, backgroundColor: value.status ? "#e6ffff":"white" }}>
                     {value.status == true ?
                        <TouchableOpacity onPress={()=>{
                            check(value.id)
                        }}>
                            <Image source={require('../public/icons/uncheck.png')} resizeMode="contain" style={{width: 25, height: 25}} />
                        </TouchableOpacity>:
                        <TouchableOpacity onPress={()=>{
                            uncheck(value.id)
                        }}>
                            <Image source={require('../public/icons/check.png')} resizeMode="contain" style={{width: 25, height: 25}} />
                        </TouchableOpacity>
                     }
                     <TouchableOpacity onPress={()=>d(value.id)}>
                        <Image source={require('../public/icons/delete.png')} resizeMode="contain" style={{width: 25, height: 25, marginLeft:5}} />
                     </TouchableOpacity>
                        
                     <Text style={{ marginLeft:10, fontSize: 15, color:'gray', maxWidth: windowW-110}}>{value.name}</Text>
                    </View>
                )
            })}
            </>:
            <View style={{width:'100%', flexDirection:'row', justifyContent:"center", alignItems:"center" ,marginTop:150}}>
            <Text>No mission!</Text>
         </View>
            }
        </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
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