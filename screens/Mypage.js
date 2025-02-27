import React from 'react';
import { StatusBar } from 'react-native'; 

import {  
    StyledContainer,
    InnerContainer,
    SubTitle,
} from './../components/styles'; 


const Mypage = ({navigation}) => {
    return (
        <StyledContainer>
        <StatusBar barStyle="dark-content" /> 
        <InnerContainer>
            <SubTitle>마이페이지 화면</SubTitle>
        </InnerContainer>
    </StyledContainer>
    );
};


export default Mypage;
