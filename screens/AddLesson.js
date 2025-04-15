import React from 'react';
import { StatusBar, Text } from 'react-native';

import {
    StyledContainer,
} from '../components/styles';

const AddLesson = () => {
    return (
        <StyledContainer>
            <StatusBar barStyle="dark-content" />
                <Text>레슨 생성하기 페이지</Text>
        </StyledContainer>
    );
};
export default AddLesson;