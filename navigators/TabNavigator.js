import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Classlist from '../screens/Classlist';
import Beginner from '../screens/Beginner';
import LessonDetail from '../screens/LessonDetail';
import Favorite from '../screens/Favorite';
import Mypage from '../screens/Mypage';
import Order from '../screens/Order';
import LessonOption from '../screens/LessonOption';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 상단 '장바구니' 버튼
const CartButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ paddingRight: 15 }}>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>장바구니</Text>
        </TouchableOpacity>
    );
};
// 강사로그인 상단 '알림' 버튼
export const AlarmButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('instAlarm')} style={{ paddingRight: 15 }}>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>알림</Text>
        </TouchableOpacity>
    );
};


// 클래스 관련 화면을 포함하는 Stack Navigator
const ClassStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: '#FAF287' }, headerTintColor: 'black', headerRight: () => <CartButton />, headerBackTitleVisible: false, }}
        >
            <Stack.Screen 
                name="Classlist" 
                component={Classlist} 
                options={{ 
                    title: " ", 
                    headerLeft: () => null  // 뒤로가기 버튼 제거
                }} 
            />
            <Stack.Screen name="Beginner" component={Beginner} options={{ title: " " }} />
            <Stack.Screen name="LessonDetail" component={LessonDetail} options={{ title: "레슨 상세" }} />
            <Stack.Screen name="LessonOption" component={LessonOption} options={{ title: "레슨 옵션" }} />
        </Stack.Navigator>
    );
};

// // 찜, 주문내역, 마이페이지 상단 탭 네비게이션
const ScreenWithHeader = (Component, title) => {
    return ({ route }) => (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#FAF287' },
                headerTintColor: 'black',
                headerRight: () => <CartButton />,
            }}
        >
            <Stack.Screen
                name={title}
                children={(props) => <Component {...props} route={route} />}
                options={{ headerLeft: () => null }}
            />
        </Stack.Navigator>
    );
};


// 하단 탭 네비게이션
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#FAF287' }, // 하단 탭 배경색
                tabBarActiveTintColor: 'black', // 활성 탭 색상
                tabBarInactiveTintColor: 'black', // 비활성 탭 색상
                
            }}
        >
            <Tab.Screen name="Class" component={ClassStack} options={{ title: "클래스",  headerShown: false }} />
            <Tab.Screen name="Favorite" component={ScreenWithHeader(Favorite, '찜')} options={{ title: "찜", headerShown: false }} />
            <Tab.Screen name="Order" component={ScreenWithHeader(Order, '주문내역')} options={{ title: "주문내역", headerShown: false }}/>
            <Tab.Screen name="Mypage" component={ScreenWithHeader(Mypage, '마이페이지')} options={{ title: "마이페이지", headerShown: false }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
