import React from 'react';
import { StatusBar } from 'react-native'; 

import {  
    StyledContainer,
    InnerContainer,
    SubTitle,
} from './../components/styles'; 


const Certification = ({navigation}) => {
    return (
        <StyledContainer>
        <StatusBar barStyle="dark-content" /> 
        <InnerContainer>
            <SubTitle>자격증클래스</SubTitle>
        </InnerContainer>
    </StyledContainer>
    );
};


export default Certification;
