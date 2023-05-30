import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { setSelectedBook } from "../redux/bookSlice";

function MyLibrary({navigation}) {
  const dispatch = useDispatch();

  // 내 서재에 저장되어 있는 모든 책 가져오기
  const myLibraryBooks= useSelector((state) => state.book.books);
  console.log('myLibraryBooks:', myLibraryBooks);

  // 책 클릭 시, 독후감 작성 화면으로 이동
  const handleBookClick = (thisBook) => {
    dispatch(setSelectedBook(thisBook));
    navigation.navigate('CreateReport');
  };

  return (
    <View style={ styles.container }>
      {/* 타이틀 영역 */}
      <View style={ styles.pageTitleArea }>
        <Text style={ styles.pageTitle }>내 서재</Text>
      </View>

      {/* 서재 영역 */}
      <ScrollView style={ styles.scrollArea }>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }  }>
          { myLibraryBooks !== undefined ? myLibraryBooks.map((thisResult) => {
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
          }) : null }
        </View>
      </ScrollView>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    flex: 1,
    height: '100%' ,
    paddingHorizontal: 20, 
  },
  pageTitleArea: {
    justifyContent: 'center',
    backgroundColor: '#DA7B7B',
    height: 60,
  },
  pageTitle: {
    fontSize: 24,
  },
  bookBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollArea: {
    backgroundColor: '#DA7B7B',
    paddingBottom: 40,
  },
});

export default MyLibrary;