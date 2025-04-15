import React from 'react';
import { StatusBar, Text } from 'react-native';

import {
    StyledContainer,
} from '../components/styles';

const EditLesson = () => {
    return (
        <StyledContainer>
            <StatusBar barStyle="dark-content" />
                <Text>레슨 수정하기 페이지</Text>
        </StyledContainer>
    );
};

export default EditLesson;