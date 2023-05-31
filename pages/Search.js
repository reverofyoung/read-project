import React, { useEffect } from "react";
import axios from "axios";

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { addBook, deleteBook } from '../redux/bookSlice';
import baseStyle from "../common/baseStyle";

function Search({ navigation: { navigate } }) {
  const dispatch = useDispatch();

  const SERACH_BOOK_API = "491f7507dab4e628fde67856003319a6";
  const totalBookData = useSelector((state) => state.book.books);

  const [searcText, setSearcText] = useState('');
  const [responseBooksData, setResponseBooksData] = useState();
  const [searchBookResults, setSearchBookResults] = useState();  
  const [clickedBookData, setClickedBookData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if(responseBooksData !== undefined) 
      setSearchBookResults(responseBooksData);
  }, [ responseBooksData ]);

  // 입력값 받아오기
  const onChangeText = (value) => {
    setSearcText(value);
  };

  // 검색한 책 데이터 받아오기
  const getSearchBooksData = () => {
    axios({
      method: "GET",
      url: "https://dapi.kakao.com/v3/search/book?target=title",
      params: { 
        query: searcText,
        size: 50,
      },
      headers:{
        Authorization: `KakaoAK ${SERACH_BOOK_API}`
      },
    })
    .then(function (response) {
      // 검색된 도서 데이터 state에 담기
      const getResponseData = JSON.parse(response.request.response);
      setResponseBooksData(getResponseData.documents);
    })
    .catch(function(error){
      console.log("error", error);
    });
  };

  // 책 클릭 시 모달 열림
  const openModal = (thisClickedBook) => {
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
    };

    const preIsbnList = totalBookData.map((thisBook) => {
      return thisBook.isbn
    });
    
    const isbnList = preIsbnList.filter(thisResult => thisResult === clickedBookData.isbn);

    if(isbnList.length === 0) {
      // 책이 저장되어 있지 않을 때
      dispatch(addBook(newBookData));
    } else {
      // 책이 저장되어 있을 때
      dispatch(deleteBook(clickedBookData.isbn));
    }
    setModalVisible(false);
  };

  return (
    <View style={[ baseStyle.pageLayout ]}>
      {/* 타이틀 영역 */}
      <View style={[ baseStyle.pageTitleArea ]}>
        <Text style={[ baseStyle.pageTitle ]}>검색</Text>
      </View>

      {/* 검색 영역 */}
      <View style={ styles.searchArea }>
        <TextInput 
          onChangeText={ onChangeText }
          placeholder='도서명, 저자명으로 검색해주세요.'
          style={{  borderBottomWidth: '2px', borderColor: '#000', color: 'grey', padding: 12, width: '80%' }}
          value={ searcText }
        />
        <TouchableOpacity onPress={ getSearchBooksData }>
          <Text>검색</Text>
        </TouchableOpacity>
      </View>

      {/* 스크롤 영역 */}
      <ScrollView style={{ paddingBottom: 40 }}>
        <View style={[ baseStyle.scrollLayout ]}>
          { searchBookResults !== undefined ? searchBookResults.map((thisClickedBook) => {
            const datakey = thisClickedBook.isbn;

            return (
              <TouchableOpacity 
                key={ datakey } 
                onPress={ () => openModal(thisClickedBook) }
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
                <Button title={ '담기' } onPress={ changeReadingStatus } />
              }
            </TouchableOpacity>
            <Button title={'모달 닫기'} onPress={ () => setModalVisible(false) } />
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchArea: {
    // backgroundColor: '#AF4545',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 50,
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