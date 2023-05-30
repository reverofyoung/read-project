import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const CustomHeader = ({ navigation }) => {
    return (
      <View style={ styles.header }>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Text>✚</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
    header: {
        alignItems: 'center', 
        backgroundColor: '#fff',
        flexDirection: 'row', 
        height: 50, 
        justifyContent: 'flex-end', 
        paddingRight: 20,
    }
});

export default CustomHeader;