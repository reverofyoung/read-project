import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { setSelectedBook } from "../redux/bookSlice";
import baseStyle from "../common/baseStyle";

function MyLibrary({navigation}) {
  const dispatch = useDispatch();

  // 내 서재에 저장되어 있는 모든 책 가져오기
  const myLibraryBooks= useSelector((state) => state.book.books);
  console.log('내 서재에 저장된 책:', myLibraryBooks);

  // 책 클릭 시, 독후감 작성 화면으로 이동
  const handleBookClick = (thisBook) => {
    dispatch(setSelectedBook(thisBook));
    navigation.navigate('CreateReport');
  };

  return (
    <View style={[ baseStyle.pageLayout ]}>
      {/* 타이틀 영역 */}
      <View style={[ baseStyle.pageTitleArea ]}>
        <Text style={[ baseStyle.pageTitle ]}>내 서재</Text>

      </View>

      {/* 서재 영역 */}
      <ScrollView style={ styles.scrollArea }>
        <TouchableOpacity onPress={ navigation.goBack }>
          <Text> 뒤로 </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }  }>
          { myLibraryBooks.length !== 0 ? myLibraryBooks.map((thisResult) => {
            const datakey = thisResult.isbn;

            return (
              <TouchableOpacity 
                key={ datakey } 
                onPress={ () => handleBookClick(thisResult) }
              >
                <View>
                  <Image style={{ height: 180, width: 120 }} source={{ url: thisResult.thumbnail }} />
                </View>
                <Text style={{ width: 120 }}>{ thisResult.authors + ' / ' + thisResult.title }</Text>
              </TouchableOpacity>
            )
          }) : <View style={ styles.libraryText }><Text>담겨 있는 책이 없어요</Text></View> }
        </View>
      </ScrollView>
    </View>
  );
}
  
const styles = StyleSheet.create({
  bookBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollArea: {
    // backgroundColor: '#DA7B7B',
    paddingBottom: 40,
  },
  libraryText: {
    paddingVertical: 30,
  }
});

export default MyLibrary;