import React from 'react';
import { StatusBar } from 'react-native'; 

import {  
    StyledContainer,
    InnerContainer,
    SubTitle,
} from './../components/styles'; 


const Favorite = ({navigation}) => {
    return (
        <StyledContainer>
        <StatusBar barStyle="dark-content" /> 
        <InnerContainer>
            <SubTitle>찜 화면</SubTitle>
        </InnerContainer>
    </StyledContainer>
    );
};


export default Favorite;
