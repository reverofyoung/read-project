import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Home({navigation}) {
  const [menuVisible, setMenuVisible] = useState(false);
  
  const onClickMenuBtn = () => {
    !menuVisible ? setMenuVisible(true) : setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>

        {/* 메뉴 버튼 0n/Off */}
        <TouchableOpacity onPress={ onClickMenuBtn }>
          { 
            !menuVisible ? <Text style={{ padding: 5, borderRadius: 20 }}>⭕️</Text> : 
            <Text style={{ padding: 5, borderRadius: 20 }}>❌</Text> 
          }
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', display: !menuVisible ? 'none' : 'flex'}}>
          <Button 
            title={ '책검색' } 
            onPress={ () => navigation.navigate('Search') }
          />
          <Button 
            title={ '내서재' }
            onPress={ () => navigation.navigate('MyLibrary') }
          />
           <Button 
            title={ '글쓰기' }
            onPress={ () => navigation.navigate('CreateReport') }
          />
        </View>

        {/* <Button 
          title= { !menuVisible ? '메뉴 열기' : '메뉴 닫기' }
          onPress={ onClickMenuBtn }  
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