import { StyleSheet } from "react-native";

const baseStyle = StyleSheet.create({
    pageLayout: {
        backgroundColor: '#fff', 
        flex: 1,
        height: '100%' ,
        paddingHorizontal: 20, 
    },
    pageTitleArea: {
        backgroundColor: '#DA7B7B',
        justifyContent: 'center',
        height: 60,
    },
    pageTitle: {
        fontSize: 24,
    },
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollLayout: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
    },
});

export default baseStyle;