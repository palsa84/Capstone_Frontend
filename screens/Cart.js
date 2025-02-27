import React from 'react';
import { StatusBar } from 'react-native'; 

import {  
    StyledContainer,
    InnerContainer,
    SubTitle,
} from './../components/styles'; 


const Cart = ({navigation}) => {
    return (
        <StyledContainer>
        <StatusBar barStyle="dark-content" /> 
        <InnerContainer>
            <SubTitle>장바구니 화면</SubTitle>
        </InnerContainer>
    </StyledContainer>
    );
};


export default Cart;
