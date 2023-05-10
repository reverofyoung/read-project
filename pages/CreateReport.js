import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/ko';

import { theme } from '../common/colors';
import { addReport } from "../redux/bookSlice";

function CreateReport({navigation}) {
    const dispatch = useDispatch();

    const reportData = useSelector((state) => state.book.books);
    const date = new Date();
    const currentDate = moment(date).format('YYYY-MM-DD HH:mm');

    const [reportContent, setReportContent] = useState('');
    
    console.log('reportData.content ', reportData );

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
    };
    // console.log('코멘트 추가 후', reportData);

    return (
        <View style={ styles.container }>
            <View style={ styles.titleArea }>
                <View style={{ maxWidth: '73%' }}>
                    <Text numberOfLines={ 1 } style={{ fontWeight: '600' }}>{ reportData.title }</Text>
                </View>
                <View style={{ minWidth: '20%' }}>
                    { reportData.readingStatus === 'reading' ? <Text>읽는중</Text> : <Text>기타</Text> }
                </View>
            </View>
            <View style={ styles.contentArea }>
                <View>
                    <Text>
                        읽기 전 코멘트
                    </Text>
                </View>

                    {
                        reportData.content ===  undefined || reportData.content ===  '' ?
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
                            <Text>{ reportData.date } </Text>
                            <Text>{ reportData.content } </Text>
                        </ScrollView>
                    }
                   
       
            </View>
            <View style={ styles.buttonArea }>
                <TouchableOpacity>
                    <Button title="코멘트 추가" color={ theme.mainRed } onPress={ saveReport } />
                </TouchableOpacity>
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