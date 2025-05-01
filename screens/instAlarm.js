import React from 'react';
import { StatusBar } from 'react-native';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
} from '../components/styles';

const instAlarm = ({ }) => {

    return (
        <StyledContainer>
            <StatusBar barStyle="dark-content" />
            <InnerContainer>
            <PageTitle> 강사알림페이지</PageTitle>

            </InnerContainer>
        </StyledContainer>
    );
};

export default instAlarm;
