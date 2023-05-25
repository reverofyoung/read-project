import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { setSelectedBook } from "../redux/bookSlice";

function MyLibrary({navigation}) {
  const dispatch = useDispatch();

  const myLibraryBook= useSelector((state) => state.book.books);
  console.log('myLibraryBook:', myLibraryBook);

  const handleBookClick = (thisBook) => {
    dispatch(setSelectedBook(thisBook));
    navigation.navigate('CreateReport');
  };

  return (
    <View style={ styles.container }>
      {
        myLibraryBook.map((thisBookData) => {
          const datakey = thisBookData.isbn;

          return(
            <View key={ datakey } style={ styles.bookBox }>
              <TouchableOpacity onPress={ () => handleBookClick(thisBookData) }>
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