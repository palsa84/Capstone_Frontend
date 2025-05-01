import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { StatusBar, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
    LessonDetailContainer,
    ScrollTabContainer,
    ScrollTabButton,
    ScrollTabText,
} from '../components/styles';

const CATEGORIES = [
    '승인완료진행예정',
    '승인대기',
    '취소요청',
    '입금대기',
    '레슨완료',
];

const instState = () => {
    const nav = useNavigation();
    const route = useRoute();
    const initialCategory = route.params?.category || '승인완료진행예정';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const scrollRef = useRef(null);

    useEffect(() => {
        const index = CATEGORIES.findIndex(cat => cat === initialCategory);
        if (scrollRef.current && index !== -1) {
            scrollRef.current.scrollTo({
                x: index * 110, 
                animated: true,
            });
        }
    }, [initialCategory]);

    useLayoutEffect(() => {
        nav.setOptions({
            headerTitle: '',
            headerBackTitleVisible: false,
        });
    }, [nav]);

    return (
        <LessonDetailContainer>
            <StatusBar barStyle="dark-content" />

            {/* 카테고리 탭 스크롤 */}
            <ScrollTabContainer
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={scrollRef} // 
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
        </LessonDetailContainer>
    );
};

export default instState;
