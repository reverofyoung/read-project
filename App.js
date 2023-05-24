import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import store from './redux/store';
import Home from './pages/Home';
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';
import CreateReport from './pages/CreateReport';
import DrawerNavigator from './components/DrawerNavigator';
import { TouchableHighlight } from 'react-native-gesture-handler';


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView { ...props }>
      <DrawerItemList { ...props } />
      <DrawerItem label="로고 자리" onPress={() => props.navigation.navigate('Home')} />

    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: '100%',
          drawerActiveBackgroundColor: 'red',
          drawerPosition: 'right',
        }
      }}
    >
      <Drawer.Group screenOptions={{ headerTitle: '', headerShadowVisible: false }}>
        <Drawer.Screen name="홈" component={ Home } />
        <Drawer.Screen name="책 검색" component={ Search} />
        <Drawer.Screen name="내 서재" component={ MyLibrary } />
        {/* <Drawer.Screen name="독후감" component={ CreateReport } /> */}
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}