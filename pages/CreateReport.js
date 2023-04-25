import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/ko';

import { theme } from '../common/colors';
import { addReport } from "../redux/bookReportSlice";

function CreateReport({navigation}) {
    const dispatch = useDispatch();

    const [report, setReport] = useState(useSelector((state) => state.bookReport.data));
    console.log('추가 전', report.title);

    const date = new Date();
    const currentDate = moment(date).format('YYYY-MM-DD HH:mm');

    const saveReport = () => {
        const newReportData = {
            content: '코멘트 예시',
            date: currentDate
        };
        // console.log(newReportData);
        // dispatch(addReport(newReportData));
    };
    // console.log('추가 후', report);

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={{ fontWeight: '600' }}>{ report.title }</Text>
                { report.readingStatus === 'reading' ? <Text>읽는중</Text> : <Text>기타</Text> }
            </View>
            <View style={styles.contentArea}>
                <View>
                    <Text>
                        읽기 전 코멘트
                    </Text>
                </View>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity>
                    <Button title="코멘트 추가" color={ theme.mainRed }/>
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