import React from "react";
import axios from "axios";

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { clickedBook } from '../redux/bookSlice';

function Search({ navigation: { navigate } }) 
{
  const dispatch = useDispatch()

  const SERACH_BOOK_API = "491f7507dab4e628fde67856003319a6";
  // const totalBookData = useSelector((state) => state.book.value)

  const [searchWord, setSearchWord] = useState('');
  const [responseBooksData, setResponseBooksData] = useState();
  const [searchBookResults, setSearchBookResults] = useState();  
  const [clickedBookData, setClickedBookData] = useState({ authors: '', title: '', isbn: '', readingStatus: '' });
  const [totalBookData, setTotalBookData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  
  const [testData, setTestData] = useState(useSelector((state) => state.book.value));

  // 헤더에 검색창..안됨..
  // React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //         headerShadowVisible: false,
  //         headerTintColor: 'grey',
  //         // title: '책 검색',
  //         headerSearchBarOptions: {
  //         placeholder: '검색',
  //         barTintColor: 'red'
  //       },
  //     });
  //   }, [navigation]);

  
  // 입력값 받아오기
  const onChangeText = (value) => {
    setSearchWord(value);
  };

  // 검색한 책 데이터 받아오기
  const getSearchBooksData = () => {
    axios({
      method: "GET",
      url: "https://dapi.kakao.com/v3/search/book?target=title",
      params: { query: searchWord },
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

  // 책 클릭 시 
  const onClickBook = (thisBook) => {
    console.log('클릭한 책 : ', thisBook);
    setClickedBookData(thisBook);

    // if( thisBook.readingStatus === undefined ) {
    //   console.log('없다')
    //   // dispatch(clickedBook({ authors: thisBook.authors, title: thisBook.title , isbn: thisBook.isbn, thumbnail: thisBook.thumbnail }));
    // } else {
      //   console.log('이미 가지고 있네 : ', importedClickedtotalBookData);
      // }
      
    setModalVisible(!modalVisible);
  };
  // console.log('clickedBookData : ', clickedBookData);
  
  const changeReadingStatus = () => {
    const newBookList = {
      title: clickedBookData.title,
      readingStatus : 'reading'
    }
    setTotalBookData([...totalBookData, newBookList]);
    // dispatch(clickedBook([...totalBookData, newBookList]));

    setModalVisible(false);
  };
  console.log('totalBookData', totalBookData);
  console.log('과연..', testData);

  return (
    <View style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}  >
      {/* 검색 영역 */}
      <View style={ styles.searchArea }>
        <TextInput 
          onChangeText={ onChangeText }
          placeholder='도서명, 저자명으로 검색'
          style={{ backgroundColor: 'lightgrey' , borderRadius: 5, color: 'grey', padding: 12, width: '80%' }}
          value={ searchWord }
        />
        <TouchableOpacity onPress={ getSearchBooksData }>
          <Text>검색</Text>
        </TouchableOpacity>
      </View>

      {/* 스크롤 영역 */}
      <ScrollView style={{ height: '100%' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }  }>
          { searchBookResults !== undefined ? searchBookResults.map((thisBook) => {
            const datakey = thisBook.isbn;

            return (
              <TouchableOpacity 
                key={ datakey } 
                onPress={ () => onClickBook(thisBook) }
              >
                <View>
                  <Image style={{ height: 180, width: 120 }} source={{ url: thisBook.thumbnail }} />
                </View>
                <Text style={{ width: 120 }}>{ thisBook.authors + ' / ' + thisBook.title }</Text>
              </TouchableOpacity>
            )
          }) : null }
        </View>
      </ScrollView>

      {/* 검색 영역 */}
      <Modal
        transparent={ true }
        visible={ modalVisible }
      >
        <View style={ styles.modalView }>
          <Text>
            <TouchableOpacity>
              {
                totalBookData.status === 'reading' ? <Button title={ '읽는중' } onPress={ changeReadingStatus } /> : <Button title={ '읽음' } onPress={ changeReadingStatus } />
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