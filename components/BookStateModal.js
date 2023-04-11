import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Text, View } from "react-native";

function BookStateModal() {

    return (
        <Modal
            transparent={ true }
        >
            <View style={{ backgroundColor: 'green', margin: 30, padding: 40}}>
                <Text>
                    하하
                </Text>
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
  
export default BookStateModal;