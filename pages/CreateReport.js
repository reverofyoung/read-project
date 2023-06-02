import React, { useState, useEffect } from "react";
import moment from "moment";
import 'moment/locale/ko';
import { View, Text, Button, StyleSheet } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import { addReport } from "../redux/bookSlice";
import theme from '../common/colors';

function CreateReport({ navigation }) {
    const dispatch = useDispatch();
    const preSelectedBook = useSelector((state) => state.book.selectedBook);
    const newBookArray = useSelector((state) => state.book.books);
    
    const [reportContent, setReportContent] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [contentVisible, setContentVisible] = useState(false);
    
    const date = new Date();
    const currentDate = moment(date).format('YYYY-MM-DD HH:mm');

    useEffect(() => {// newBookArray의 값이 변경될 때 마다 실행
        setNewBookData();
    }, [ newBookArray ]);

    const toggleButton = () => {
        console.log('contentVisible', contentVisible);
        setContentVisible(!contentVisible);
    }; 

    const onChangeText = (value) => {
        setReportContent(value);
    };

    const saveReport = () => {
        if(reportContent !== ''){
            const newReportData = {
                content: reportContent,
                date: currentDate,
            };
            console.log('저장된 코멘트', newReportData);

            setReportContent('');
            dispatch(addReport({ isbn: preSelectedBook.isbn, newReportData }));
    
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


                <View style={ styles.contentTitleArea }>
                    <Text style={ styles.contentTitle }>읽는 중 코멘트</Text>
                    <TouchableOpacity onPress={ toggleButton }>
                        { 
                            contentVisible === false ? 
                            <Ionicons name="chevron-down" size={ 22 } color="black" /> :
                            <Ionicons name="chevron-up" size={ 22 } color="black" /> 
                        }
                    </TouchableOpacity>
                </View>


                <View style={{ display: contentVisible === true ? 'flex' :'none' }}>
                    {
                        selectedBook.content !== undefined ? 
                        // 저장된 content가 있을 때
                        <View>
                            <Text>{ selectedBook.date }</Text>
                            <Text>{ selectedBook.content }</Text>
                        </View> :
                        // 저장된 content가 없을 때
                        <View style={{ justifyContent: 'space-between' }}>
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
                            <View style={ styles.saveButton }>
                                <TouchableOpacity>
                                    <Button title="코멘트 등록하기" color={ theme.mainRed } onPress={ saveReport } />
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
    backgroundColor: '#AF4545'
  },
  contentTitleArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: 40,
    justifyContent: 'flex-end',
  }
});

export default CreateReport;