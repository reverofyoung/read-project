import React, { useState } from "react";
import moment from "moment";
import 'moment/locale/ko';
import { View, Text, Button, StyleSheet } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import { theme } from '../common/colors';
import { addReport } from "../redux/bookSlice";

function CreateReport({ navigation }) {
    const dispatch = useDispatch();
    const preSelectedBook = useSelector((state) => state.book.selectedBook);
    const newBookArray = useSelector((state) => state.book.books);
    console.log('preSelectedBook', preSelectedBook.content);
    console.log('newBookArray', newBookArray);
    
    const [reportContent, setReportContent] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [contentVisible, setContentVisible] = useState(false);
    
    const date = new Date();
    const currentDate = moment(date).format('YYYY-MM-DD HH:mm');

    const toggleButton = () => {
        setContentVisible(true);
    }; 

    const onChangeText = (value) => {
        setReportContent(value);
    };

    const saveReport = () => {
        const newReportData = {
            content: reportContent,
            date: currentDate,
        };
        console.log('newReportData', newReportData);
        setReportContent('');
        dispatch(addReport({ isbn: preSelectedBook.isbn, newReportData }));

        const findBook = newBookArray.find((thisBook) => thisBook.isbn === preSelectedBook.isbn);
        console.log('findBook',findBook);
        setSelectedBook(findBook);
    };

    console.log('selectedBook', selectedBook);

    return (
        <View style={ styles.container }>
            <View style={ styles.titleArea }>
                <Text>{ preSelectedBook.title }</Text>
                <Text>{ preSelectedBook.readingStatus ==='reading' ? '읽는중' : '쓰는중' }</Text>
            </View>
            <View style={ styles.contentArea }>
                <TouchableOpacity onPress={ toggleButton }>
                    <Text>
                        읽기 전 코멘트
                    </Text>
                </TouchableOpacity>
                {
                    selectedBook.content !== undefined ? 
                    <View>
                        <Text>{ selectedBook.date }</Text>
                        <Text>{ selectedBook.content }</Text>
                    </View> :
                    <TextInput
                        multiline={ true }
                        onChangeText={ onChangeText }
                        placeholder='코멘트가 비어있어요'
                        style={ styles.inputArea }
                        textAlignVertical="top"
                        value={ reportContent }
                    />
                }
            </View>  
            <View style={ styles.buttonArea }>
                <TouchableOpacity>
                    <Button title="코멘트 등록하기" color={ theme.mainRed } onPress={ saveReport } />
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