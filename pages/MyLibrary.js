import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function MyLibrary({navigation}) {

const [myBookData, setMyBookData] = useState(useSelector((state) => state.book.books));
  
  return (
    <View style={styles.container}>
      {
        myBookData.map((thisData) => {
          const datakey = thisData.isbn;

          return(
            <View key={ datakey } style={styles.bookBox}>
              <Text>{ thisData.title }</Text>
              { thisData.readingStatus === 'reading' ? <Text>읽는중</Text> : <Text>기타</Text> }
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