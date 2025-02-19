import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../screens/Login';  // Login.js 임포트
import Signup from './../screens/Signup';  // Signup.js 임포트
import Welcome from './../screens/Welcome';  // Signup.js 임포트


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

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;