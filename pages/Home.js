import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import CreateReport from "./CreateReport";

function Home({navigation}) {
  const [menuVisible, setMenuVisible] = useState(false);

  const menuOpen = () => {
    console.log('클릭');
  };
  
  const onClickMenuBtn = () => {
    !menuVisible ? setMenuVisible(true) : setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={ () => navigation.openDrawer() }>
        <Text>메뉴</Text>
      </TouchableOpacity> */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <Button title="글쓰기로 가용" onPress={() => navigation.navigate('CreateReport')} />
        </View>
        {/* 메뉴 버튼 0n/Off */}
        {/* <TouchableOpacity onPress={ onClickMenuBtn }>
          { 
            !menuVisible ? <Text style={{ padding: 5, borderRadius: 20 }}>⭕️</Text> : 
            <Text style={{ padding: 5, borderRadius: 20 }}>❌</Text> 
          }
        </TouchableOpacity> */}

        {/* <View style={{ flexDirection: 'row', display: !menuVisible ? 'none' : 'flex'}}>
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
        </View> */}

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