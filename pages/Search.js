import React from "react";
import axios from "axios";

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { addBook, deleteBook } from '../redux/bookSlice';

function Search({ navigation: { navigate } }) {
  const dispatch = useDispatch();

  const SERACH_BOOK_API = "491f7507dab4e628fde67856003319a6";
  const totalBookData = useSelector((state) => state.book.books);

  const [searcText, setSearcText] = useState('');
  const [responseBooksData, setResponseBooksData] = useState();
  const [searchBookResults, setSearchBookResults] = useState();  
  const [clickedBookData, setClickedBookData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  
  // 입력값 받아오기
  const onChangeText = (value) => {
    setSearcText(value);
  };

  // 검색한 책 데이터 받아오기
  const getSearchBooksData = () => {
    axios({
      method: "GET",
      url: "https://dapi.kakao.com/v3/search/book?target=title",
      params: { query: searcText },
      headers:{
        Authorization: `KakaoAK ${SERACH_BOOK_API}`
      },
    })
    .then(function (response) {
      // 검색된 도서 데이터 state에 담기
      const getResponseData = JSON.parse(response.request.response);
      setResponseBooksData(getResponseData);

      if(responseBooksData !== undefined) {
        setSearchBookResults(responseBooksData.documents);
      };
    })
    .catch(function(error){
      console.log("error", error);
    });
  };

  // 책 클릭 시 모달 열림
  const onClickBook = (thisClickedBook) => {
    console.log('클릭한 책 : ', thisClickedBook);

    setClickedBookData(thisClickedBook);
    setModalVisible(!modalVisible);
  };
  
  // 독서 상태 변경
  const changeReadingStatus = () => {

    const newBookData = {
      authors: clickedBookData.authors,
      isbn: clickedBookData.isbn,
      thumbnail: clickedBookData.thumbnail,
      title: clickedBookData.title,
      readingStatus : 'reading',
    }

    const isbnArr = totalBookData.map((thisBook) => {
      return thisBook.isbn
    })
    
    const isbnList = isbnArr.filter(thisResult => thisResult === clickedBookData.isbn);

    if(isbnList.length === 0) {
      // 책이 저장되어 있지 않을 때
      dispatch(addBook(newBookData));
    } else {
      // 책이 저장되어 있을 때
      dispatch(deleteBook(clickedBookData.isbn));
    }

    setModalVisible(false);
  };

  console.log('담겨있는 책 리스트', totalBookData);

  return (
    <View style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}  >
      {/* 검색 영역 */}
      <View style={ styles.searchArea }>
        <TextInput 
          onChangeText={ onChangeText }
          placeholder='도서명, 저자명으로 검색'
          style={{ backgroundColor: 'lightgrey' , borderRadius: 5, color: 'grey', padding: 12, width: '80%' }}
          value={ searcText }
        />
        <TouchableOpacity onPress={ getSearchBooksData }>
          <Text>검색</Text>
        </TouchableOpacity>
      </View>

      {/* 스크롤 영역 */}
      <ScrollView style={{ height: '100%' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }  }>
          { searchBookResults !== undefined ? searchBookResults.map((thisClickedBook) => {
            const datakey = thisClickedBook.isbn;

            return (
              <TouchableOpacity 
                key={ datakey } 
                onPress={ () => onClickBook(thisClickedBook) }
              >
                <View>
                  <Image style={{ height: 180, width: 120 }} source={{ url: thisClickedBook.thumbnail }} />
                </View>
                <Text style={{ width: 120 }}>{ thisClickedBook.authors + ' / ' + thisClickedBook.title }</Text>
              </TouchableOpacity>
            )
          }) : null }
        </View>
      </ScrollView>

      {/* 책 클릭시 나오는 모달 */}
      <Modal
        transparent={ true }
        visible={ modalVisible }
      >
        <View style={ styles.modalView }>
          <Text>
            <TouchableOpacity>
              {
                <Button title={ '읽음' } onPress={ changeReadingStatus } />
                // clickedBookData.readingStatus === 'reading' ? <Button title={ '읽는중' } onPress={ changeReadingStatus } /> : <Button title={ '읽음' } onPress={ changeReadingStatus } />
              }
            </TouchableOpacity>
            <Button title={'모달 닫기'} onPress={ () => setModalVisible(false) } />
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  searchArea: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    alignItems: 'center', 
    backgroundColor: 'grey', 
    justifyContent: 'center', 
    marginHorizontal: 30, 
    marginVertical: 200, 
    padding: 40,
  }
});

export default Search;