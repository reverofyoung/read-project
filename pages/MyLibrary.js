import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { addReport } from "../redux/bookReportSlice";

function MyLibrary({navigation}) {
  const dispatch = useDispatch();

  const myLibraryData = useSelector((state) => state.book.books);
  // const reportData = useSelector((state) => state.bookReport.data);
  console.log('myLibraryData:', myLibraryData);
    
  const onClickBook = (thisBookData) => {
    console.log('thisBookData:', thisBookData);
    dispatch(addReport(thisBookData));
    navigation.navigate('CreateReport');
  };

  return (
    <View style={ styles.container }>
      {
        myLibraryData.map((thisBookData) => {
          const datakey = thisBookData.isbn;

          return(
            <View key={ datakey } style={ styles.bookBox }>
              <TouchableOpacity onPress={ () => onClickBook(thisBookData) }>
                <Text>{ thisBookData.title }</Text>
                { thisBookData.readingStatus === 'reading' ? <Text>읽는중</Text> : <Text>기타</Text> }
              </TouchableOpacity>
            </View>
          )
        })
      }
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  bookBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default MyLibrary;