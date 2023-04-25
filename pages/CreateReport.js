import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { theme } from '../common/colors';

function CreateReport({navigation}) {

    const [report, setReport] = useState(useSelector((state) => state.bookReport.data));

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={{ fontWeight: '600' }}>{ report.title }</Text>
                <Text>{ report.readingStatus }</Text>
            </View>
            <View style={styles.contentArea}>
                <View>
                    <Text>
                        읽기 전 독후감
                    </Text>
                </View>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity>
                    <Button title="코멘트 추가" color={ theme.mainRed } />
                </TouchableOpacity>
            </View>
        </View>
    );
}
  
const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      flex: 1,
      padding: 20
  },
  titleArea: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentArea: {
    flex: 8,
    // backgroundColor: 'grey'
  },
  buttonArea: {
    flex: 1
  }
});

export default CreateReport;