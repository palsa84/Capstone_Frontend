import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../screens/Login';  // Login.js 임포트
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome'; 
import Classlist from './../screens/Classlist'; 
import Beginner from './../screens/Beginner'; 
import Intermediate from './../screens/Intermediate';
import Expert from './../screens/Expert';  
import Certification from './../screens/Certification'; 


import {Colors} from './../components/styles'
const { backGroundColor, textColor } = Colors;

const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyled: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: textColor,
                    headerTransparent: true,
                    headerTitle: '', 
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Classlist" component={Classlist}/>
                <Stack.Screen name="Beginner" component={Beginner}/>
                <Stack.Screen name="Intermediate" component={Intermediate}/>
                <Stack.Screen name="Expert" component={Expert}/>
                <Stack.Screen name="Certification" component={Certification}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default RootStack;