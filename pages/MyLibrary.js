import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { addReport } from "../redux/bookReportSlice";

function MyLibrary({navigation}) {
  const dispatch = useDispatch();

  const [myBookData, setMyBookData] = useState(useSelector((state) => state.book.books));
    
  const onClick = (thisData) => {
    dispatch(addReport(thisData));
    navigation.navigate('CreateReport');
  };
    return (
      <View style={styles.container}>
        {
          myBookData.map((thisData) => {
            const datakey = thisData.isbn;

            return(
              <View key={ datakey } style={styles.bookBox}>
                <TouchableOpacity onPress={ () => onClick(thisData) }>
                  <Text>{ thisData.title }</Text>
                  { thisData.readingStatus === 'reading' ? <Text>읽는중</Text> : <Text>기타</Text> }
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