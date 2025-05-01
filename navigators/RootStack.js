import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Logininst from './../screens/Logininst';
import Welcome from './../screens/Welcome';
import Welcomeinst from './../screens/Welcomeinst';
import Searchinfo from './../screens/Searchinfo';

import AddLesson from '../screens/AddLesson';
import UpdateLesson from '../screens/EditLesson';
import DeleteLesson from '../screens/DeleteLesson';

import TabNavigator from './TabNavigator';
import Cart from '../screens/Cart';

import ReviewManage from '../screens/ReviewManage';
import ProfileEdit from '../screens/ProfileEdit';
import PwChange from '../screens/PwChange';
import Quit from '../screens/Quit';


import instMain from '../screens/instMain';
import instAlarm from '../screens/instAlarm';
import instProfileEdit from '../screens/instProfileEdit';
import instState from '../screens/instState';


const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator // 장바구니 화면 상단 네비게이션
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
                <Stack.Screen name="Searchinfo" component={Searchinfo} options={{ title: '이메일/비밀번호 찾기' }} />

                <Stack.Screen name="AddLesson" component={AddLesson} options={{ title: "레슨 생성" }} />
                <Stack.Screen name="UpdateLesson" component={UpdateLesson} options={{ title: "레슨 수정" }} />
                <Stack.Screen name="DeleteLesson" component={DeleteLesson} options={{ title: "레슨 삭제" }} />

                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={Cart} options={{ title: "장바구니" }} />

                <Stack.Screen name="ReviewManage" component={ReviewManage} options={{ title: '리뷰관리' }} />
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ title: '프로필 수정' }} />
                <Stack.Screen name="PwChange" component={PwChange} options={{ title: '비밀번호 변경' }} />
                <Stack.Screen name="Quit" component={Quit} options={{ title: '회원탈퇴' }} />


                <Stack.Screen name="instMain" component={instMain} options={{ title: " " }} />
                <Stack.Screen name="instAlarm" component={instAlarm} options={{ title: '알림' }} />
                <Stack.Screen name="instProfileEdit" component={instProfileEdit} options={{ title: '프로필 편집' }} />
                <Stack.Screen name="instState" component={instState} options={{ title: ' ' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
