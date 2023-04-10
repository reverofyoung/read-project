import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Home({navigation}) {
  const [menuVisible, setMenuVisible] = useState(false);
  
  const clickMenuBtn = () => {
    !menuVisible ? setMenuVisible(true) : setMenuVisible(false);
  };

  // const clickSearch = () => {
  //   console.log('책검색');
  //   setSearchInputVisible(true);
  // };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', display: !menuVisible ? 'none' : 'flex'}}>
          <Button 
            title={ '책검색' } 
            onPress={ () => navigation.navigate('Search') }
          />
          
          <Button 
            title={ '내서재' }
          />

        </View>

        <TouchableOpacity onPress={ clickMenuBtn }>
          { 
            !menuVisible ? <Text style={{ padding: 5, borderRadius: 20 }}>⭕️</Text> : 
            <Text style={{ padding: 5, borderRadius: 20 }}>❌</Text> 
          }
        </TouchableOpacity>

        {/* <Button 
          title= { !menuVisible ? '메뉴 열기' : '메뉴 닫기' }
          onPress={ clickMenuBtn }  
        /> */}
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