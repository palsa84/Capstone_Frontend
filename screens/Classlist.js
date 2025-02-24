import React from 'react';
import { StatusBar, FlatList, View } from 'react-native';
import {  
    StyledContainer,
    StyledFormArea,
    ClassButton,
    ClassContainer,
    ButtonText,
} from './../components/styles'; 

const classData = [
    { id: '1', title: '초보자', screen: 'Beginner' },
    { id: '2', title: '중급자', screen: 'Intermediate' },
    { id: '3', title: '전문가', screen: 'Expert' },
    { id: '4', title: '자격증', screen: 'Certification' }
];

const Classlist = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar barStyle="dark-content" /> 
            <ClassContainer>
                <StyledFormArea>
                <FlatList
                data={classData}
                renderItem={({ item }) => (
                    <ClassButton onPress={() => navigation.navigate(item.screen)}>
                        <ButtonText style={{ fontSize: 17, fontWeight: 'bold' }}>
                            {item.title}
                        </ButtonText>
                    </ClassButton>
                )}
                actor={item => item.id}
                numColumns={2} // 2x2 그리드 설정
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
                </StyledFormArea>
            </ClassContainer>
        </StyledContainer>
    );
};

export default Classlist;
