import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Text, View } from "react-native";

function BookState({ navigation: { navigate }, route }) {
    console.log(route.params.datakey);

    return (
      <Modal>
        <View style={{ backgroundColor: 'green', width: 200 }}>
          <Text>ISBN : {route.params.datakey}</Text>
        </View>
      </Modal>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
  
    searchArea: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    //   paddingVertical: 20,
    }
  });
  
export default BookState;