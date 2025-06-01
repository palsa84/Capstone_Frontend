import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity,
    KeyboardAvoidingView, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { getUser } from '../utils/userInfo';

const AddLesson = ({ navigation }) => {
    const [instNum, setInstNum] = useState(null);
    const [lesName, setLesName] = useState('');
    const [lesinfo, setLesinfo] = useState('');
    const [lesLevel, setLesLevel] = useState('');
    const [mainRegion, setMainRegion] = useState('');
    const [subRegion, setSubRegion] = useState('');
    const [lesDetailPlace, setLesDetailPlace] = useState('');
    const [lesPrice, setLesPrice] = useState('');
    const [weekday, setWeekday] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [thumbUri, setThumbUri] = useState(null);
    const [bgUri, setBgUri] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            if (user && user.userNum) {
                setInstNum(user.userNum);
            }
        };
        fetchUser();
    }, []);

    const levelList = ['초보자', '중급자', '전문가', '자격증'];
    const mainRegionList = [
        '서울', '경기', '인천', '강원', '대전', '충북', '충남', '광주',
        '전북', '전남', '대구', '경북', '경남', '부산', '울산', '제주'
    ];
    const subRegionsByMain = {
        대구: ['달서구', '달성군', '수성구', '중구', '남구', '북구', '동구', '서구', '군위군']
    };
    const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
    const timeOptions = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B'];

    const selectImage = (type) => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
            if (!response.didCancel && !response.errorCode) {
                const uri = response.assets[0].uri;
                if (type === 'thumb') setThumbUri(uri);
                else setBgUri(uri);
            }
        });
    };

    const handleSubmit = async () => {
        if (!lesName || !lesinfo || !lesLevel || !mainRegion ||
            (mainRegion === '대구' && !subRegion) || !lesDetailPlace ||
            !lesPrice || !weekday || !startTime || !endTime || !bgUri) {
            Alert.alert('모든 필드를 입력해주세요 (썸네일 제외).');
            return;
        }

        const lesTime = `${weekday} ${startTime}-${endTime}`;
        const formData = new FormData();

        formData.append('instNum', instNum);
        formData.append('lesName', lesName);
        formData.append('lesinfo', lesinfo);
        formData.append('lesLevel', lesLevel);
        formData.append('lesPlace', mainRegion);
        formData.append('lesDetailPlace', lesDetailPlace);
        formData.append('lesPrice', lesPrice);
        formData.append('lesTime', lesTime);
        formData.append('rating', 0);

        if (thumbUri) {
            const filename = thumbUri.split('/').pop();
            const ext = filename.split('.').pop();
            formData.append('lesThumbImg', {
                uri: thumbUri,
                type: `image/${ext}`,
                name: filename,
            });
        }

        if (bgUri) {
            const filename = bgUri.split('/').pop();
            const ext = filename.split('.').pop();
            formData.append('lesBackgroundImg', {
                uri: bgUri,
                type: `image/${ext}`,
                name: filename,
            });
        }

        try {
            await axios.post('http://192.168.0.22:5000/api/lesson', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Alert.alert('레슨 등록 완료');
        } catch (err) {
            console.error('레슨 등록 실패:', err);
            Alert.alert('레슨 등록 실패');
        }
    };

    const handleCancel = () => {
        Alert.alert('작성을 취소하시겠습니까?', '', [
            { text: '아니오' },
            { text: '예', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                style={{ padding: 20 }}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <Text>레슨명:</Text>
                <TextInput value={lesName} onChangeText={setLesName} style={{ borderWidth: 1, marginBottom: 10 }} />

                <Text>레슨 소개:</Text>
                <TextInput value={lesinfo} onChangeText={setLesinfo} multiline style={{ borderWidth: 1, marginBottom: 10 }} />

                <Text>레벨:</Text>
                <Picker selectedValue={lesLevel} onValueChange={setLesLevel}>
                    <Picker.Item label="선택하세요" value="" />
                    {levelList.map((level, i) => <Picker.Item key={i} label={level} value={level} />)}
                </Picker>

                <Text>지역:</Text>
                <Picker selectedValue={mainRegion} onValueChange={(v) => { setMainRegion(v); setSubRegion(''); }}>
                    <Picker.Item label="선택하세요" value="" />
                    {mainRegionList.map((r, i) => <Picker.Item key={i} label={r} value={r} />)}
                </Picker>

                {mainRegion === '대구' && (
                    <>
                        <Text>군/구:</Text>
                        <Picker selectedValue={subRegion} onValueChange={setSubRegion}>
                            <Picker.Item label="선택하세요" value="" />
                            {subRegionsByMain['대구'].map((s, i) => <Picker.Item key={i} label={s} value={s} />)}
                        </Picker>
                    </>
                )}

                <Text>상세 장소:</Text>
                <TextInput value={lesDetailPlace} onChangeText={setLesDetailPlace} style={{ borderWidth: 1, marginBottom: 10 }} />

                <Text>가격:</Text>
                <TextInput value={lesPrice} onChangeText={setLesPrice} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10 }} />

                <Text>요일:</Text>
                <Picker selectedValue={weekday} onValueChange={setWeekday} style={{ marginBottom: 10 }}>
                    <Picker.Item label="선택하세요" value="" />
                    {weekdays.map((w, i) => <Picker.Item key={i} label={w} value={w} />)}
                </Picker>

                <Text>시작 시간:          종료 시간:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Picker
                        selectedValue={startTime}
                        onValueChange={setStartTime}
                        style={{ flex: 1 }}
                    >
                        <Picker.Item label="선택하세요" value="" />
                        {timeOptions.map((t, i) => <Picker.Item key={i} label={t} value={t} />)}
                    </Picker>

                    <Text style={{ marginHorizontal: 5 }}>~</Text>

                    <Picker
                        selectedValue={endTime}
                        onValueChange={setEndTime}
                        style={{ flex: 1 }}
                    >
                        <Picker.Item label="선택하세요" value="" />
                        {timeOptions.map((t, i) => <Picker.Item key={i} label={t} value={t} />)}
                    </Picker>
                </View>

                <Text>썸네일 이미지:</Text>
                <TouchableOpacity onPress={() => selectImage('thumb')} style={{ marginBottom: 10 }}>
                    {thumbUri ? (
                        <Image source={{ uri: thumbUri }} style={{ width: 120, height: 120, borderRadius: 8 }} />
                    ) : (
                        <View style={{
                            width: 120, height: 120, backgroundColor: '#eee',
                            justifyContent: 'center', alignItems: 'center', borderRadius: 8
                        }}>
                            <Text style={{ color: '#999' }}>썸네일 선택</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <Text>레슨 배경 이미지:</Text>
                <TouchableOpacity onPress={() => selectImage('bg')} style={{ marginBottom: 10 }}>
                    {bgUri ? (
                        <Image source={{ uri: bgUri }} style={{ width: 120, height: 120, borderRadius: 8 }} />
                    ) : (
                        <View style={{
                            width: 120, height: 120, backgroundColor: '#eee',
                            justifyContent: 'center', alignItems: 'center', borderRadius: 8
                        }}>
                            <Text style={{ color: '#999' }}>배경 선택</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 10 }}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                            backgroundColor: '#fff000',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 10,
                            marginRight: 10
                        }}
                    >
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>레슨 등록</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleCancel}
                        style={{
                            backgroundColor: '#ccc',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 10
                        }}
                    >
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>취소</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddLesson;