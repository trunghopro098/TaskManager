import React from 'react';
import {View, Text, StyleSheet,Dimensions,StatusBar} from 'react-native';
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';

import Home from './home';
import History from './history';
import AddTodo from './addTodo';
import TaskToday from './tasktoday';
import Tutorial from './tutorial';
const Tab = createBottomTabNavigator();

export default function TabBottomNavigation({navigation}) {

    return (
    <View style={styles.container}>
        <StatusBar 
            backgroundColor="rgb(240, 240, 240)"
            barStyle="dark-content"
        />
        <Tab.Navigator
            screenOptions={{ 
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle:{
                    height: 52,
                    position:'absolute',
                    backgroundColor:'#c2d6d6',
                    borderTopLeftRadius:16,
                    borderTopRightRadius:16,
                    borderTopWidth:1,
                    elevation:6,
                    borderTopColor: 'white',
                }

             }}
        >
     <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <FontAwesome name="home" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>Home</Text>
                                </LinearTextGradient>
                                
                            </>:
                            <Ionicons name="home-outline" size={22}/>
                            }
                            
                        </View>
                    )
                }}
            />
            <Tab.Screen name='tasktoday' component={TaskToday}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <MaterialIcons name="today" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>Task today</Text>
                                </LinearTextGradient>
                            </>:
                            <MaterialIcons name="today" size={22} />

                            }
                            
                        </View>
                    )
                }}
            />
           
            <Tab.Screen name='Addtodo' component={AddTodo}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <AntDesign name="pluscircle" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>New task</Text>
                                </LinearTextGradient>
                            </>:
                            <AntDesign name="pluscircleo" size={22} />
                            }
                            
                        </View>
                    )
                }}
            />
            <Tab.Screen name='history' component={History}
                options={{
                tabBarIcon: ({focused})=>(
                    <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                        {focused ? <>
                            <LinearGradient 
                                colors={['red','#8A0000','#7471EF','#7471EF']}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                style={ focused ? styles.focus : null }>
                                <MaterialIcons name="history" size={24} color={'white'}/>
                            </LinearGradient>
                            <LinearTextGradient
                                    locations={[0,1]}
                                    colors={['red','blue']}
                                    start={{ x:0,y:0 }}
                                    end={{ x:1, y:0 }}
                                    style={{marginBottom: 15 }}
                                >
                                    <Text style={{ fontSize : 12 }}>History task</Text>
                            </LinearTextGradient>
                        </>:
                        <MaterialIcons name="history" size={26} />
                        }
                        
                    </View>
                )
            }}
        />
        <Tab.Screen name='tutorial' component={Tutorial}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <MaterialCommunityIcons name="television-guide" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>Tutorial</Text>
                                </LinearTextGradient>
                            </>:
                            <MaterialCommunityIcons name="television-guide" size={22} />

                            }
                            
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    </View>
  )
}
const widthW = Dimensions.get('window').width;
const heightH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor:'red'
    },
    shadow:{
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowColor:'#000',
        shadowOpacity:0.45,
        shadowRadius:5,
        elevation:3,
    },
    tabarIcon:{
        alignItems:'center',
        justifyContent:'center',
        top:3,
    },
    focus:{
        // backgroundColor:'#7471EF',
        width: 35,
        height: 35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 50,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10 ,
        },
        shadowOpacity:0.6,
        shadowRadius:4,
        elevation:7,
        bottom:8,


    }

})
