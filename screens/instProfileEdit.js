import React, { useLayoutEffect, useState, useEffect  } from 'react';
import { StatusBar, View, Text, ToastAndroid, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    MypageContainer,
    ProfileWrapper,
    ProfileImage,
    RoleBox,
    RoleText,
    NameBox,
    NameText,
    PwCangeGrayBox,
    StyledInputLabel,
    StyledTextInput,
    GenderContainer,
    GenderButton,
    GenderText,
    CareerInputBox,
    CareerInputLabel,
    CareerInput,
    StyledButton,
    Row,
    TextButton,
    TextButtonText,
} from '../components/styles';

import { getUser } from '../utils/userInfo';

const instProfileEdit = () => {
    const nav = useNavigation();
    const user = getUser();

    useEffect(() => {
        if (!user) {
            nav.reset({ index: 0, routes: [{ name: 'Logininst' }] });
        }
    }, []);

    if (!user) return null;

    const { userName, userRole, userImg } = user;

    const [name, setName] = useState(userName);
    const [gender, setGender] = useState('');
    const [career, setCareer] = useState('');

    const handleSave = () => {
        ToastAndroid.show('프로필이 수정되었습니다.', ToastAndroid.LONG); 
        nav.goBack(); // 
    };
    
    useLayoutEffect(() => {
        nav.setOptions({
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#FAF287' },
            headerTintColor: 'black',
        });
    }, [nav, name, gender, career]);

    return (
        <MypageContainer>
            <StatusBar barStyle="dark-content" />

            {/* 프로필 상단 */}
            <ProfileWrapper>
                <ProfileImage source={{ uri: userImg }} />
            </ProfileWrapper>

            {/* 편집 폼 영역 */}
            <PwCangeGrayBox>

                {/* 이름 + 성별 가로 배치 */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* 이름 */}
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <StyledInputLabel>
                            <Text>이름</Text>
                        </StyledInputLabel>
                        <StyledTextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="이름을 입력하세요"
                        />
                    </View>

                    {/* 성별 */}
                    <View style={{ flex: 1 }}>
                        <StyledInputLabel>
                            <Text>성별</Text>
                        </StyledInputLabel>
                        <GenderContainer>
                            <GenderButton selected={gender === 'male'} onPress={() => setGender('male')}>
                                <GenderText>남</GenderText>
                            </GenderButton>
                            <GenderButton selected={gender === 'female'} onPress={() => setGender('female')}>
                                <GenderText>여</GenderText>
                            </GenderButton>
                        </GenderContainer>
                    </View>
                </View>

                {/* 레슨 경력 및 자격증 */}
                <CareerInputBox>
                    <CareerInputLabel>레슨 경력 및 자격증</CareerInputLabel>
                    <CareerInput
                        multiline
                        numberOfLines={5}
                        placeholder="레슨 경력 및 자격증"
                        value={career}
                        onChangeText={setCareer}
                    />
                </CareerInputBox>
            </PwCangeGrayBox>
            <Row style={{ justifyContent: 'center', marginTop: 10 }}>
                <TextButton onPress={handleSave}>
                    <TextButtonText style={{ backgroundColor: '#fff000', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10 }}>
                    저장
                    </TextButtonText>
                </TextButton>
            </Row>
        </MypageContainer>
    );
};

export default instProfileEdit;
