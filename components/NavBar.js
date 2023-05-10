import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function NavBar({navigation}) {
  const [menuVisible, setMenuVisible] = useState(false);
  
  const onClickMenuBtn = () => {
    !menuVisible ? setMenuVisible(true) : setMenuVisible(false);
  };

  return (
    <View style={ styles.container }>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>

        {/* 메뉴 버튼 0n/Off */}
        <TouchableOpacity onPress={ onClickMenuBtn }>
          { 
            !menuVisible ? <Text style={{ padding: 5, borderRadius: 20 }}>테스트</Text> : 
            <Text style={{ padding: 5, borderRadius: 20 }}>닫기</Text> 
          
          }
            <Button 
                title={ '책검색' } 
                onPress={ () => navigation.navigate('Search') }
            />
        </TouchableOpacity>
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#222',
      alignItems: 'center',
      justifyContent: 'center',
  }
});

export default NavBar;