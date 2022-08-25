import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { windowH } from '../util/widthHeight'

export default function Tutorial() {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.header}>
            <Text style={{fontSize: 16, color:'black', fontWeight:'bold'}}>Tutorial</Text>
        </View>
        <View style={{width: '100%', height: windowH-115,backgroundColor:'#e6e6ff', flexDirection:'column',padding: 20,}}>
            <View style={{flexDirection:'column', justifyContent:'center',alignItems:"center"}}>
                <Text style={{fontSize: 18,fontWeight:'bold', color: 'black', textAlign:'center'}}>WELLCOME TO</Text>
                <Text style={{fontSize: 18,fontWeight:'bold', color: 'black', textAlign:'center'}}>PERSONAL TASK MANAGER</Text>
            </View>
            <Text style={{marginTop: 5, fontSize: 17}}>This is an application that helps you manage daily tasks, mark completed and unfinished tasks. Completed tasks will have a blue background color, and unfinished tasks will be red.</Text>
            <Text style={{marginTop: 5, fontSize: 17}}>
            The home screen lists all the tasks of the day and all the days that have passed, making it easier for us to better manage our work.
            </Text>
            <Text style={{marginTop: 5, fontSize: 17}}>
            Today screen, daily task manage can delete, update the status of the task, the completed work is blue, the unfinished work is white.
            </Text>
            <Text style={{marginTop: 5, fontSize: 17}}>
            Screen add tasks, add their own tasks to the management system.
            </Text>
        </View>
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

})