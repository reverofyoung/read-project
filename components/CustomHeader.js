import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const CustomHeader = ({ navigation }) => {
    return (
      <View style={ styles.header }>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>로고</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={ 24 } color="black" />
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
    header: {
        alignItems: 'center', 
        backgroundColor: 'grey',
        flexDirection: 'row', 
        height: 50, 
        justifyContent: 'space-between', 
        paddingHorizontal: 20,
    }
});

export default CustomHeader;