import 'react-native-gesture-handler';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import theme from '../common/colors';

const CustomHeader = ({ navigation }) => {

  const route = useRoute();

    return (
      
      <View style={ styles.header }>
        {
          route.name === 'Home' ? 
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={ styles.logo }></View>
          </TouchableOpacity> :
          <TouchableOpacity onPress={ navigation.goBack }>
            <Ionicons name="arrow-back" size={ 23 } color="black" />
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={ 23 } color="black" />
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
    header: {
      alignItems: 'center', 
      backgroundColor: theme.white,
      flexDirection: 'row', 
      height: 50, 
      justifyContent: 'space-between', 
      paddingHorizontal: 20,
    },
    logo: {
      backgroundColor: theme.mainRed,
      height: 50,
      width: 100,
    },
});

export default CustomHeader;