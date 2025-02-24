import React from 'react';
import { StatusBar } from 'react-native'; 

import {  
    StyledContainer,
    InnerContainer,
    SubTitle,
} from './../components/styles'; 


const Expert = ({navigation}) => {
    return (
        <StyledContainer>
        <StatusBar barStyle="dark-content" /> 
        <InnerContainer>
            <SubTitle>전문가클래스</SubTitle>
        </InnerContainer>
    </StyledContainer>
    );
};


export default Expert;
