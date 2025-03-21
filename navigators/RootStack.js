import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Logininst from './../screens/Logininst';
import Welcome from './../screens/Welcome';
import Welcomeinst from './../screens/Welcomeinst';

import AddLesson from '../screens/AddLesson';
import EditLesson from '../screens/EditLesson';
import DeleteLesson from '../screens/DeleteLesson';

import TabNavigator from './TabNavigator';
import Cart from '../screens/Cart';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#FAF287' },
                    headerTintColor: 'black',
                    headerTitleAlign: 'center',
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ title: "회원가입" }} />
                <Stack.Screen name="Logininst" component={Logininst} options={{ headerShown: false }} />
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="Welcomeinst" component={Welcomeinst} options={{ headerShown: false }} />

                <Stack.Screen name="AddLesson" component={AddLesson} options={{ title: "레슨 생성" }} />
                <Stack.Screen name="EditLesson" component={EditLesson} options={{ title: "레슨 수정" }} />
                <Stack.Screen name="DeleteLesson" component={DeleteLesson} options={{ title: "레슨 삭제" }} />

                
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={Cart} options={{ title: "장바구니" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
