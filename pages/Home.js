import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import baseStyle from "../common/baseStyle";

function Home({navigation}) {

  return (
    <View style={[ baseStyle.pageLayout ]}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>

      </View>
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

export default Home;