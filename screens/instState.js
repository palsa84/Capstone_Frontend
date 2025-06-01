import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import {
    LessonDetailContainer,
    ScrollTabContainer,
    ScrollTabButton,
    ScrollTabText,
    StyledAppCard,
    StyledAppCardLeft,
    StyledAppCardRight,
    StyledAppCardTitle,
    StyledAppCardPlace,
} from '../components/styles';

const CATEGORIES = [
    '승인대기',
    '승인완료진행예정',
    '입금대기',
    '레슨완료',
    '취소요청',
    '거절'
];

const instState = () => {
    const nav = useNavigation();
    const route = useRoute();
    const scrollRef = useRef(null);

    const initialCategory = route.params?.category || '승인대기';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [applications, setApplications] = useState([]);

    const instNum = 1; // 실제 배포 시 로그인 값으로 교체

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get(`http://192.168.0.22:5000/api/application/instructor/${instNum}`);
                setApplications(res.data);
            } catch (err) {
                console.error('신청 목록 불러오기 실패:', err);
            }
        };

        fetchApplications();
    }, [selectedCategory]);

    useLayoutEffect(() => {
        nav.setOptions({
            headerTitle: '',
            headerBackTitleVisible: false,
        });

        const index = CATEGORIES.findIndex(cat => cat === selectedCategory);
        if (scrollRef.current && index !== -1) {
            scrollRef.current.scrollTo({ x: index * 110, animated: true });
        }
    }, [nav, selectedCategory]);

    const filteredList = applications.filter(app => app.status === selectedCategory);

    return (
        <LessonDetailContainer>
            <StatusBar barStyle="dark-content" />

            <ScrollTabContainer
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={scrollRef}
            >
                {CATEGORIES.map((category) => (
                    <ScrollTabButton
                        key={category}
                        selected={selectedCategory === category}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <ScrollTabText>{category}</ScrollTabText>
                    </ScrollTabButton>
                ))}
            </ScrollTabContainer>

            <FlatList
                data={filteredList}
                contentContainerStyle={{ padding: 16 }}
                keyExtractor={(item) => item.appId.toString()}
                renderItem={({ item }) => (
                    <StyledAppCard onPress={() => nav.navigate('InstApplicationDetail', { appId: item.appId })}>
                        <StyledAppCardLeft>
                            <StyledAppCardTitle>{item.lesName}</StyledAppCardTitle>
                            {item.lesDetailPlace ? (
                                <StyledAppCardPlace>{item.lesDetailPlace}</StyledAppCardPlace>
                            ) : null}
                        </StyledAppCardLeft>

                        {(item.lesDate || item.lesTime) && (
                            <StyledAppCardRight>
                                <StyledAppCardPlace>
                                    {item.lesDate || ''}
                                    {item.lesDate && item.lesTime ? ' / ' : ''}
                                    {item.lesTime || ''}
                                </StyledAppCardPlace>
                            </StyledAppCardRight>
                        )}
                    </StyledAppCard>
                )}
                ListEmptyComponent={<StyledAppCardPlace style={{ textAlign: 'center', padding: 20 }}>해당 상태의 신청이 없습니다.</StyledAppCardPlace>}
            />
        </LessonDetailContainer>
    );
};

export default instState;