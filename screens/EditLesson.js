import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Alert, ScrollView, Image,
    TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditLesson = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const lesNum = route.params?.lesNum;

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
    const [originThumb, setOriginThumb] = useState(null);  
    const [originBg, setOriginBg] = useState(null);       

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


    useEffect(() => {
        if (!lesNum) return;
        axios.get(`http://192.168.0.22:5000/api/lesson-api/${lesNum}`)
            .then(res => {
                const data = res.data;
                setLesName(data.lesName);
                setLesinfo(data.lesinfo);
                setLesLevel(data.lesLevel);
                setLesDetailPlace(data.lesDetailPlace);
                setLesPrice(String(data.lesPrice));
                if (data.lesTime) {
                    const [day, range] = data.lesTime.split(' ');
                    const [start, end] = range.split('-');
                    setWeekday(day);
                    setStartTime(start);
                    setEndTime(end);
                }
                if (subRegionsByMain['대구'].includes(data.lesPlace)) {
                    setMainRegion('대구');
                    setSubRegion(data.lesPlace);
                }

                setOriginThumb(`http://192.168.0.22:5000/img/${data.lesThumbImg}`);
                setOriginBg(`http://192.168.0.22:5000/img/${data.lesBackgroundImg}`);
            })
            .catch(err => {
                console.error('레슨 불러오기 실패:', err);
                Alert.alert('레슨 정보를 불러올 수 없습니다.');
            });
    }, [lesNum]);


    const selectImage = (type) => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
            if (!response.didCancel && !response.errorCode) {
                const uri = response.assets[0].uri;
                if (type === 'thumb') setThumbUri(uri);
                else setBgUri(uri);
            }
        });
    };

    const handleUpdate = async () => {
        if (!lesName || !lesinfo || !lesLevel || !subRegion || !lesDetailPlace || !lesPrice || !weekday || !startTime || !endTime) {
            Alert.alert('모든 필드를 입력해주세요.');
            return;
        }

        const lesTime = `${weekday} ${startTime}-${endTime}`;
        const formData = new FormData();

        formData.append('lesName', lesName);
        formData.append('lesinfo', lesinfo);
        formData.append('lesLevel', lesLevel);
        formData.append('lesPlace', subRegion);
        formData.append('lesDetailPlace', lesDetailPlace);
        formData.append('lesPrice', lesPrice);
        formData.append('lesTime', lesTime);

        if (thumbUri) {
            const filename = thumbUri.split('/').pop();
            const ext = filename.split('.').pop();
            formData.append('lesThumbImg', {
                uri: thumbUri,
                type: `image/${ext}`,
                name: filename,
            });
        } else {
            formData.append('originThumb', originThumb?.split('/').pop());
        }

        if (bgUri) {
            const filename = bgUri.split('/').pop();
            const ext = filename.split('.').pop();
            formData.append('lesBackgroundImg', {
                uri: bgUri,
                type: `image/${ext}`,
                name: filename,
            });
        } else {
            formData.append('originBg', originBg?.split('/').pop());
        }

        try {
            await axios.put(`http://192.168.0.22:5000/api/lesson-api/${lesNum}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Alert.alert('레슨 수정 완료');
            navigation.goBack();
        } catch (err) {
            console.error('레슨 수정 실패:', err);
            Alert.alert('레슨 수정 실패');
        }
    };

    const handleCancel = () => {
        Alert.alert('수정을 취소하시겠습니까?', '', [
            { text: '아니오' },
            { text: '예', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView style={{ padding: 20 }} contentContainerStyle={{ paddingBottom: 200 }}>
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
                    <Picker selectedValue={startTime} onValueChange={setStartTime} style={{ flex: 1 }}>
                        <Picker.Item label="선택하세요" value="" />
                        {timeOptions.map((t, i) => <Picker.Item key={i} label={t} value={t} />)}
                    </Picker>
                    <Text style={{ marginHorizontal: 5 }}>~</Text>
                    <Picker selectedValue={endTime} onValueChange={setEndTime} style={{ flex: 1 }}>
                        <Picker.Item label="선택하세요" value="" />
                        {timeOptions.map((t, i) => <Picker.Item key={i} label={t} value={t} />)}
                    </Picker>
                </View>

                <Text>레슨 대표 이미지:</Text>
                <TouchableOpacity onPress={() => selectImage('thumb')} style={{ marginBottom: 10 }}>
                    {thumbUri ? (
                        <Image source={{ uri: thumbUri }} style={{ width: 120, height: 120, borderRadius: 8 }} />
                    ) : originThumb ? (
                        <Image source={{ uri: originThumb }} style={{ width: 120, height: 120, borderRadius: 8 }} />
                    ) : (
                        <View style={{ width: 120, height: 120, backgroundColor: '#efefef', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                            <Text style={{ color: '#999' }}>대표 선택</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <Text>레슨 배경 이미지:</Text>
                <TouchableOpacity onPress={() => selectImage('bg')} style={{ marginBottom: 10 }}>
                    {bgUri ? (
                        <Image source={{ uri: bgUri }} style={{ width: 120, height: 120, borderRadius: 8 }} />
                    ) : originBg ? (
                        <Image source={{ uri: originBg }} style={{ width: 120, height: 120, borderRadius: 8 }} />
                    ) : (
                        <View style={{ width: 120, height: 120, backgroundColor: '#efefef', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                            <Text style={{ color: '#999' }}>배경 선택</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 10 }}>
                    <TouchableOpacity onPress={handleUpdate} style={{ width: 150, backgroundColor: '#7aae3e', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>레슨 수정</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCancel} style={{ width: 150, backgroundColor: '#ccc', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>취소</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditLesson;
