import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../utils/userInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

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
            <Icon name="cart-outline" size={24} color="#006633" />
        </TouchableOpacity>
    );
};

// 강사로그인 우측 상단 '알림' 버튼
export const AlarmButton = ({ hasUnread }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('instAlarm')} style={{ paddingRight: 15 }}>
            <View>
                <Icon name="notifications-outline" size={24} color="#006633" />
                {hasUnread && (
                    <View style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'red'
                    }} />
                )}
            </View>
        </TouchableOpacity>
    );
};

// 강사로그인 좌측 상단 '로그아웃' 버튼
export const LogoutButton = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        setUser(null);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Logininst' }],
        });

        setTimeout(() => {
            Toast.show('로그아웃되었습니다.', {
                duration: 3000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: '#333',
                textColor: '#fff',
            });
        }, 300);
    };

    return (
        <TouchableOpacity onPress={handleLogout} style={{ paddingLeft: 15 }}>
            <Icon name="power-outline" size={24} color="#006633" />
        </TouchableOpacity>
    );
};



// 클래스 관련 화면을 포함하는 Stack Navigator
const ClassStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e9ffc7' }, headerTintColor: 'black', headerRight: () => <CartButton />, headerBackTitleVisible: false }}>
            <Stack.Screen 
                name="Classlist" 
                component={Classlist} 
                options={{ 
                    title: " ", 
                    headerLeft: () => null
                }} 
            />
            <Stack.Screen name="Beginner" component={Beginner} options={{ title: " " }} />
            <Stack.Screen name="LessonDetail" component={LessonDetail} options={{ title: "레슨 상세" }} />
            <Stack.Screen name="LessonOption" component={LessonOption} options={{ title: "레슨 옵션" }} />
        </Stack.Navigator>
    );
};

// 찜, 주문내역, 마이페이지 상단 탭 네비게이션
const ScreenWithHeader = (Component, title) => {
    return ({ route }) => (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#e9ffc7' },
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
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Class') iconName = 'golf-outline';
                else if (route.name === 'Favorite') iconName = 'heart';
                else if (route.name === 'Order') iconName = 'receipt-outline';
                else if (route.name === 'Mypage') iconName = 'person-circle';

                return <Icon name={iconName} size={25} color={color} />;
            },
            tabBarStyle: { backgroundColor: '#e9ffc7' },
            tabBarActiveTintColor: '#c4e499',
            tabBarInactiveTintColor: '#006633',
        })}>
            <Tab.Screen name="Class" component={ClassStack} options={{ title: "클래스",  headerShown: false }} />
            <Tab.Screen name="Favorite" component={ScreenWithHeader(Favorite, '찜')} options={{ title: "찜", headerShown: false }} />
            <Tab.Screen name="Order" component={ScreenWithHeader(Order, '주문내역')} options={{ title: "주문내역", headerShown: false }}/>
            <Tab.Screen name="Mypage" component={ScreenWithHeader(Mypage, '마이페이지')} options={{ title: "마이페이지", headerShown: false }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;