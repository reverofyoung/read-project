import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function MyLibrary({navigation}) {

const importedClickedBookData = useSelector((state) => state.book.value);
console.log(importedClickedBookData);
  return (
    <View style={styles.container}>
      
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  }
});

export default MyLibrary;