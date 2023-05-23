import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/ko';

import { theme } from '../common/colors';
// 작동하지만 저장된 책 데이터와 연결 안됨..
import { addBook, addReport } from "../redux/bookSlice";

function CreateReport({navigation}) {
    const dispatch = useDispatch();

    const [totalBook, setTotalBook] = useState(useSelector((state) => state.book.books));
    const [reportData, setReportData] = useState(useSelector((state) => state.bookReport.data));
    const [reportContent, setReportContent] = useState('');

    const date = new Date();
    const currentDate = moment(date).format('YYYY-MM-DD HH:mm');

    console.log('저장되어 있는 모든 책 ', totalBook );

    const currentBook = totalBook.filter((thisData) => reportData.isbn === thisData.isbn);

    const onChangeText = (value) => {
        setReportContent(value);
    };

    const saveReport = () => {
        const newReportData = {
            ...reportData,
            content: reportContent,
            date: currentDate
        };
        setReportContent('');
        dispatch(addReport(newReportData));
        dispatch(addBook(newReportData));
    };

    return (
        <View style={ styles.container }>
            {
                currentBook.map((thisBook) => {
                    const datakey = thisBook.isbn;
                    
                    return(
                        <View key={ datakey }>
                            {/* 책 타이틀, 독서 상태 */}
                            <View style={ styles.titleArea }>
                                <View style={{ maxWidth: '73%' }}>
                                    <Text numberOfLines={ 1 } style={{ fontWeight: '600' }}>{ thisBook.title }</Text>
                                </View>
                                <View style={{ minWidth: '20%' }}>
                                    { thisBook.readingStatus === 'reading' ? <Text>읽는중</Text> : <Text>기타</Text> }
                                </View>
                            </View>

                            {/* 코멘트 영역 */}
                            <View style={ styles.contentArea }>
                                <View>
                                    <Text>
                                        읽기 전 코멘트
                                    </Text>
                                </View>

                                {
                                    thisBook.content ===  undefined || thisBook.content ===  '' ?
                                    <View>
                                        <TextInput
                                            multiline={ true }
                                            onChangeText={ onChangeText }
                                            placeholder='코멘트를 작성해주삼 '
                                            style={ styles.inputArea }
                                            textAlignVertical="top"
                                            value={ reportContent }
                                        />
                                    </View> : 
                                    <ScrollView 
                                        bounces={ true }
                                        keyboardDismissMode={ "on-drag" }
                                        style={ styles.scrollArea }
                                    >
                                        <Text>{ thisBook.date } </Text>
                                        <Text>{ thisBook.content } </Text>
                                    </ScrollView>
                                }
                        
                            </View>

                            {/* '코멘트 추가' 버튼 영역 */}
                            <View style={ styles.buttonArea }>
                                <TouchableOpacity>
                                    <Button title="코멘트 추가" color={ theme.mainRed } onPress={ saveReport } />
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                    })
                }
            
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
  inputArea: {
    backgroundColor: '#DA7B7B',
    borderWidth: 1,
    borderColor: 'grey',
    color: 'grey',
    height: 200,
    padding: 10,
    width: '100%'
  },
  scrollArea: {
    backgroundColor: '#DA7B7B',
    height: 100,
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default CreateReport;