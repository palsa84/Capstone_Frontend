import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Logininst from './../screens/Logininst';
import Welcome from './../screens/Welcome';
import Welcomeinst from './../screens/Welcomeinst';
import Searchinfo from './../screens/Searchinfo';

import LessonManage from '../screens/LessonManage';
import AddLesson from '../screens/AddLesson';
import EditLesson from '../screens/EditLesson';
import DeleteLesson from '../screens/DeleteLesson';
import LessonList from '../screens/LessonList';

import TabNavigator from './TabNavigator';
import Cart from '../screens/Cart';
import Order from '../screens/Order';

import ReviewManage from '../screens/ReviewManage';
import ProfileEdit from '../screens/ProfileEdit';
import PwChange from '../screens/PwChange';
import Quit from '../screens/Quit';


import instMain from '../screens/instMain';
import instAlarm from '../screens/instAlarm';
import instProfileEdit from '../screens/instProfileEdit';
import instState from '../screens/instState';
import SelectAddress from '../screens/SelectAddress';

import Credit from '../screens/Credit';
import CreditCompleted from '../screens/CreditCompleted';

import Classlist from '../screens/Classlist';
import LessonDetail from '../screens/LessonDetail';
import instDetailProfile from '../screens/instDetailProfile';

import InstApplicationList from '../screens/InstApplicationList';
import InstApplicationDetail from '../screens/InstApplicationDetail';

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
                <Stack.Screen name="Searchinfo" component={Searchinfo} options={{ title: '이메일/비밀번호 찾기' }} />

                <Stack.Screen name="LessonManage" component={LessonManage} options={{ title: '레슨 관리' }} />
                <Stack.Screen name="AddLesson" component={AddLesson} options={{ title: "레슨 생성" }} />
                <Stack.Screen name="EditLesson" component={EditLesson} options={{ title: "레슨 수정" }} />
                <Stack.Screen name="DeleteLesson" component={DeleteLesson} options={{ title: "레슨 삭제" }} />
                <Stack.Screen name="LessonList" component={LessonList} options={{ title: '레슨 조회' }} />

                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={Cart} options={{ title: "장바구니" }} />

                <Stack.Screen name="ReviewManage" component={ReviewManage} options={{ title: '리뷰관리' }} />
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ title: '프로필 수정' }} />
                <Stack.Screen name="PwChange" component={PwChange} options={{ title: '비밀번호 변경' }} />
                <Stack.Screen name="Quit" component={Quit} options={{ title: '회원탈퇴' }} />

                <Stack.Screen name="instMain" component={instMain} options={{ title: " " }} />
                <Stack.Screen name="instState" component={instState} options={{ title: '' }} />
                <Stack.Screen name="instAlarm" component={instAlarm} options={{ title: '알림' }} />
                <Stack.Screen name="instProfileEdit" component={instProfileEdit}  options={{ headerShown: false }} />
                <Stack.Screen name="SelectAddress" component={SelectAddress} options={{ title: '주소 선택' }} />
                <Stack.Screen name="Credit" component={Credit} options={{ title: '결제하기' }} />
                <Stack.Screen name="CreditCompleted" component={CreditCompleted} options={{ headerShown: false }} />

                <Stack.Screen name="Order" component={Order} options={{ title: '주문내역', headerLeft: () => null }} />
                <Stack.Screen name="Classlist" component={Classlist} options={{ headerShown: false }} />
                <Stack.Screen name="LessonDetail" component={LessonDetail} options={{ title: ' ' }} />
                <Stack.Screen name="instDetailProfile" component={instDetailProfile} options={{ title: ' ' }} />
                
                <Stack.Screen name="InstApplicationList" component={InstApplicationList} options={{ title: '신청 내역' }} />
                <Stack.Screen name="InstApplicationDetail" component={InstApplicationDetail} options={{ title: '신청 상세' }} />
                </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
