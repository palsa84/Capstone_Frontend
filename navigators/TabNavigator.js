import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // 아이콘 추가
// import Icon from 'react-native-vector-icons/AntDesign';

import Classlist from '../screens/Classlist';
import Beginner from '../screens/Beginner';
import Intermediate from '../screens/Intermediate';
import Expert from '../screens/Expert';
import Certification from '../screens/Certification';
import Favorite from '../screens/Favorite';
import Mypage from '../screens/Mypage';

import { HeaderContainer, HeaderButton, HeaderText } from '../components/styles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 커스텀 헤더
const CustomHeader = () => {
    const navigation = useNavigation();

    return (
        <HeaderContainer>
            {/* goBack()으로 이전 화면으로 돌아가게 변경 */}
                <HeaderButton onPress={() =>  navigation.goBack()}>
                </HeaderButton>

            <HeaderButton onPress={() => navigation.navigate('Cart')}>
                <HeaderText style={{ color: 'black' }}>🛒</HeaderText>
            </HeaderButton>
        </HeaderContainer>
    );
};

// 클래스 관련 스택 네비게이터
const ClassStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Classlist" component={Classlist} />
            <Stack.Screen name="Beginner" component={Beginner} options={{ title: '초보자' }} />
            <Stack.Screen name="Intermediate" component={Intermediate} options={{ title: '중급자' }} />
            <Stack.Screen name="Expert" component={Expert} options={{ title: '전문가' }} />
            <Stack.Screen name="Certification" component={Certification} options={{ title: '자격증' }} />
        </Stack.Navigator>
    );
};

// 하단 탭 네비게이션
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                header: () => <CustomHeader />,
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            }}
        >
            <Tab.Screen 
                name="Class" 
                component={ClassStack} 
                options={{
                    title: '클래스'
                }}
            />
            <Tab.Screen 
                name="Favorite" 
                component={Favorite} 
                options={{
                    title: '찜'
                }}
            />
            <Tab.Screen 
                name="Mypage" 
                component={Mypage} 
                options={{
                    title: '마이페이지'
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
