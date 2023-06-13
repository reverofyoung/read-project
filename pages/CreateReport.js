import React, { useState, useEffect } from "react";
import moment from "moment";
import 'moment/locale/ko';
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import { addPreReport } from "../redux/bookSlice";
import theme from '../common/colors';
import baseStyle from "../common/baseStyle";

function CreateReport({ navigation }) {
    const dispatch = useDispatch();
    const preSelectedBook = useSelector((state) => state.book.selectedBook);
    const newBookArray = useSelector((state) => state.book.books);
    
    const [reportContent, setReportContent] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [contentVisible, setContentVisible] = useState(false);
    
    const date = new Date();
    const currentDate = moment(date).format('YYYY-MM-DD HH:mm');

    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const calcHeight = SCREEN_HEIGHT - 150;

    useEffect(() => { // newBookArray의 값이 변경될 때 마다 실행
        setNewBookData();
    }, [ newBookArray ]);

    // 컨텐츠 보이기, 숨기기
    const toggleButton = () => {
        setContentVisible(!contentVisible);
    }; 

    const onChangeText = (value) => {
        setReportContent(value);
    };

    const saveReport = () => {
        if(reportContent !== ''){
            const newReportData = {
                preReport: reportContent,
                date: currentDate,
            };
            console.log('저장된 코멘트', newReportData);

            setReportContent('');
            dispatch(addPreReport({ isbn: preSelectedBook.isbn, newReportData }));
    
        }else{
            alert('코멘트를 작성해주세요!');
        }
    };
    
    const setNewBookData = () => {
        const findBook = newBookArray.find((thisBook) => thisBook.isbn === preSelectedBook.isbn);
        setSelectedBook(findBook);
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.titleArea }>
                <Text>{ preSelectedBook.title }</Text>
                <Text>{ preSelectedBook.readingStatus === 'reading' ? '읽는중' : '쓰는중' }</Text>
            </View>
            <View style={ styles.contentArea }>
                {/* 컨텐츠 타이틀 영역 */}
                <View style={ styles.contentTitleArea }>
                    <Text style={ styles.contentTitle }>읽기 전 코멘트</Text>
                    <TouchableOpacity onPress={ toggleButton }>
                        {   
                            contentVisible === false ? 
                            <Ionicons name="chevron-down" size={ 22 } color="black" /> :
                            <Ionicons name="chevron-up" size={ 22 } color="black" /> 
                        }
                    </TouchableOpacity>
                </View>

                {/* 컨텐츠 영역 */}
                <View style={{  height: '90%', display: contentVisible === true ? 'flex' :'none' }}>
                    {
                        selectedBook.content !== undefined ? 
                        // 저장된 content가 있을 때
                        <View>
                            {/* <Text>{ selectedBook.content.date }</Text>
                            <Text>{ selectedBook.content.preReport }</Text> */}
                        </View> :

                        // 저장된 content가 없을 때
                        <View style={{ height: '100%', justifyContent: 'space-between' }}>
                            <View>
                                <TextInput
                                    multiline={ true }
                                    onChangeText={ onChangeText }
                                    placeholder='코멘트가 비어있어요.'
                                    style={ styles.inputArea }
                                    textAlignVertical="top"
                                    value={ reportContent }
                                />
                            </View>

                            {/* 저장하기 버튼 */}
                            <View style={ styles.saveButton }>
                                <TouchableOpacity onPress={ saveReport } name='preSave' >
                                   <View style={[ baseStyle.alignCenter, styles.saveButton ]}>
                                        <Text style={{ color: theme.mainRed }}>등록하기</Text>
                                   </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </View>  
        </View>
    );
}
  
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20
  },
  titleArea: {
    // backgroundColor: '#DA7B7B',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentArea: {
    flex: 7,
    // backgroundColor: '#AF4545'
  },
  contentTitleArea: {
    borderBottomWidth: '1px', 
    borderColor: theme.black, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  contentTitle: {
    fontSize: 18,
  },
  mainContent: {

  },
  inputArea: {
    // backgroundColor: '#DA7B7B',
    borderWidth: 1,
    borderColor: 'grey',
    color: 'grey',
    height: 200,
    padding: 10,
    width: '100%'
  },
  scrollArea: {
    // backgroundColor: '#DA7B7B',
    height: 100,
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  saveButton: {
    borderColor: theme.mainRed,
    borderRadius: 10,
    borderWidth: '1px',
    height: 40,
  }
});

export default CreateReport;