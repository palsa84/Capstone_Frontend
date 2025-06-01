import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
    LessonDetailContainer,
    GrayBox,
    LessonInfoBox,
    LessonInfoTitle,
    LessonInfoText,
    StyledButton,
    ButtonText
} from '../components/styles';

const InstApplicationDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { appId } = route.params;

    const [application, setApplication] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`http://192.168.0.22:5000/api/application/${appId}`);
                setApplication(res.data);
            } catch (err) {
                console.error('신청 상세 조회 실패:', err);
            }
        };
        fetchDetail();
    }, [appId]);

    const handleAction = (type) => {
        const msg = type === 'approve' ? '승인하시겠습니까?' : '거절하시겠습니까?';
        Alert.alert(msg, '', [
            { text: '아니오', style: 'cancel' },
            {
                text: '예',
                onPress: async () => {
                    try {
                        await axios.put(`http://192.168.0.22:5000/api/application/${appId}/status`, {
                            status: type === 'approve' ? '승인완료진행예정' : '거절'
                        });
                        navigation.goBack();
                    } catch (err) {
                        console.error('처리 실패:', err);
                    }
                }
            }
        ]);
    };

    return (
        <LessonDetailContainer>
            {application && (
                <GrayBox>
                    <LessonInfoBox>
                        <LessonInfoTitle>레슨명</LessonInfoTitle>
                        <LessonInfoText>{application.lesName}</LessonInfoText>
                    </LessonInfoBox>

                    <LessonInfoBox>
                        <LessonInfoTitle>레슨일자</LessonInfoTitle>
                        <LessonInfoText>{application.lesDate || '날짜 없음'}</LessonInfoText>
                    </LessonInfoBox>

                    <LessonInfoBox>
                        <LessonInfoTitle>레슨시간</LessonInfoTitle>
                        <LessonInfoText>{application.lesTime || '시간 없음'}</LessonInfoText>
                    </LessonInfoBox>

                    <LessonInfoBox>
                        <LessonInfoTitle>수강생 정보</LessonInfoTitle>
                        <LessonInfoText>이름: </LessonInfoText>
                        <LessonInfoText>성별: </LessonInfoText>
                        <LessonInfoText>생년월일: </LessonInfoText>
                        <LessonInfoText>건강상태: </LessonInfoText>
                    </LessonInfoBox>

                    {application.status === '승인대기' && (
                        <>
                            <StyledButton
                                style={{ backgroundColor: '#FAF287', marginTop: 30 }}
                                onPress={() => handleAction('approve')}
                            >
                                <ButtonText>승인</ButtonText>
                            </StyledButton>
                            <StyledButton
                                style={{ backgroundColor: '#ccc', marginTop: 12 }}
                                onPress={() => handleAction('reject')}
                            >
                                <ButtonText>거절</ButtonText>
                            </StyledButton>
                        </>
                    )}
                </GrayBox>
            )}
        </LessonDetailContainer>
    );
};

export default InstApplicationDetail;