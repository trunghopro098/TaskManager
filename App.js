import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';import Splash from './src/screen/splash';
import Home from './src/screen/home';
import History from './src/screen/history';
import AddTodo from './src/screen/addTodo';
import Login from './src/screen/login';
;




const Tab = createStackNavigator();

const App = () =>{

  return (
    <NavigationContainer>
        <StatusBar 
            backgroundColor="white"
            barStyle="dark-content"
        />
      <Tab.Navigator
        initialRouteName='splash'
        screenOptions={{ headerShown:false}}
      >
        <Tab.Screen name='splash' component={Splash}/>
        <Tab.Screen name='home' component={Home}/>
        <Tab.Screen name='history' component={History} options={{headerShown:true,headerTitle:"History your task"}}/>
        <Tab.Screen name='login' component={Login}/>
        <Tab.Screen name='addtodo' component={AddTodo} options={{headerShown:true,headerTitle:"Add new task"}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
