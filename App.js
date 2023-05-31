import 'react-native-gesture-handler';
import React from 'react';
import Animated from 'react-native-reanimated';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-web';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import pages 
import Home from './pages/Home';
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';
import CreateReport from './pages/CreateReport';

//
import store from './redux/store';
import theme from './common/colors'
import CustomHeader from './components/CustomHeader';

const Drawer = createDrawerNavigator();
const Stack1 = createStackNavigator();

const MyLibraryStack = () => {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="MyLibrary" component={ MyLibrary } options={{ unmountOnBlur: true }}/>
      <Stack1.Screen name="CreateReport" component={ CreateReport } options={{ unmountOnBlur: true }} />
    </Stack1.Navigator>
  );
};

const CustomButtonList = () => {
  return(
    <SafeAreaView>
      {/* 드로어 메뉴 헤더  */}
      <View style={ styles.drawerContentHeader }>
        <TouchableOpacity onPress={ () => navigation.closeDrawer() }>
          <Text>X</Text>
        </TouchableOpacity>
      </View>

      {/* 드로어 메뉴 목록 */}
      <View style={ styles.drawerContentBox }>
        <TouchableOpacity onPress={ () => navigation.navigate('Home') } style={ styles.customButton }>
          <Text style={{ color: theme.black, fontSize: 30 }}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => navigation.navigate('Search') } style={ styles.customButton }>
          <Text style={{ color: theme.black, fontSize: 30 }}>책 검색</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => navigation.navigate('DrawerMyLibrary') } style={ styles.customButton }>
          <Text style={{ color: theme.black, fontSize: 30 }}>내 서재</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const App = () => {
  const rotationValue = new Animated.Value(0);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const interpolatedRotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Drawer.Navigator 
          drawerContent={({ navigation }) => (
            <SafeAreaView>
              {/* 드로어 메뉴 헤더  */}
              <View style={ styles.drawerContentHeader }>
                <TouchableOpacity onPress={ () => navigation.closeDrawer() }>
                <Ionicons name="close" size={ 24 } color="black" />
                {/* <View style={styles.container}>
                  <Animated.Image
                    source={ require('./path/to/image.png') }
                    style={ [styles.image, { transform: [{ rotate: interpolatedRotation }] }] }
                    onLoad={ startRotation }
                  />
                </View> */}
                </TouchableOpacity>
              </View>

              {/* 드로어 메뉴 목록 */}
              <View style={ styles.drawerContentBox }>
                <TouchableOpacity onPress={ () => navigation.navigate('Home') } style={ styles.customButton }>
                  <Text style={{ color: theme.black, fontSize: 30 }}>홈</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate('Search') } style={ styles.customButton }>
                  <Text style={{ color: theme.black, fontSize: 30 }}>책 검색</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate('DrawerMyLibrary') } style={ styles.customButton }>
                  <Text style={{ color: theme.black, fontSize: 30 }}>내 서재</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )}
          screenOptions={{ 
            drawerStyle: { 
              backgroundColor: theme.white,
              width: '100%', 
            },
            drawerContentOptions: {
              drawerPosition: 'right',
            },
            drawerActiveBackgroundColor: theme.white,
            drawerActiveTintColor: theme.black,
            drawerInactiveTintColor: theme.black,
            drawerLabelStyle: { fontSize: 30 },
            drawerPosition: 'right',
            header: (props) => <CustomHeader { ...props } />,
            headerShadowVisible: false,
          }}
        >
          <Drawer.Screen name="Home" component={ Home } options={{ drawerLabel: '홈', title: '', unmountOnBlur: true }}  />
          <Drawer.Screen name="Search" component={ Search } options={{ drawerLabel: '책 검색', title: '', unmountOnBlur: true }} />
          <Drawer.Screen name="DrawerMyLibrary" component={ MyLibraryStack } options={{ drawerLabel: '내 서재', title: '' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  drawerContentHeader: {
    alignItems: 'flex-start',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,

  },
  drawerContentBox: {
    padding: 20,
  },
  customButton: {
    borderBottomWidth: 1,
    borderBottomColor: theme.black,
    paddingVertical: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
});
export default App;
