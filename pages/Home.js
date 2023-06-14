import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { ScrollView } from "react-native-web";

import baseStyle from "../common/baseStyle";
import theme from "../common/colors";

// console.log('SCREEN_WIDTH:', SCREEN_WIDTH);

function Home({navigation}) {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const calcHeight = SCREEN_HEIGHT - 150;
  const totalBooks = useSelector((state) => state.book.books);
  const totalBooksCount = totalBooks.length;

  console.log('내 서재에 저장된 책:', totalBooks);

  return (
    <View style={[ baseStyle.pageLayout ]}>
      {/* 메인 텍스트 영역 */}
      <View style={ styles.mainTextArea }>
        {
          totalBooksCount !== 0 ?
          <View>
            <Text style={ styles.mainText }>현재 읽고 있는 책은</Text>
            <Text style={ styles.mainText }>{ totalBooksCount }권 입니다.</Text>
          </View>: <Text style={ styles.mainText }>현재 읽고 있는 책이 없어요.</Text>
        }
        
      </View>
      
      {/* 메인 컨텐츠 영역 */}
      <View style={[styles.mainContentsArea, { height: calcHeight }] }>
        {/* 스크롤 영역 */}
        <ScrollView
          pagingEnabled 
          horizontal 
          contentContainerStyle={ styles.scrollArea }
        >
          {
            totalBooksCount !== 0 ? totalBooks.map((thisResult) => {
              const datakey = thisResult.isbn;
              return(
                <TouchableOpacity key={ datakey } style={{ marginRight: 50 }}>
                  {/* <Image source={{ url: thisResult.thumbnail }} style={ styles.bookImage } /> */}
                  <View style={ styles.bookImage }></View>
                  <Text style={ styles.bookTitle }>{ thisResult.title }</Text>
                </TouchableOpacity>
              )
            }) : 
            <View style={{ height: calcHeight, backgroundColor: 'grey' }}>
              {/* <Text> 비어있는 이미지 </Text> */}
            </View>
          }
      </ScrollView>
      </View>
    </View> 
  );
}
  
const styles = StyleSheet.create({
  mainTextArea: {
    // backgroundColor: 'yellow',
    height: 100,
    justifyContent: 'flex-end',
  },
  mainText: {
    fontSize: 24,
  },
  mainContentsArea: {
   
  },
  scrollArea: {
    alignItems: 'center',
    flex: 1,
  },
  bookImage: {
    backgroundColor: theme.mainRed,
    height: 350, 
    width: 250,
  },
  bookTitle:{
    lineHeight: 50,
    textAlign: 'center',
  },
});

export default Home;