import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';


// Import pages 
import Home from './pages/Home';
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';
import CreateReport from './pages/CreateReport';

//
import store from './redux/store';

const Drawer = createDrawerNavigator();
const Stack1 = createStackNavigator();

const Stack1Screens = () => {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="MyLibrary" component={ MyLibrary }/>
      <Stack1.Screen name="CreateReport" component={ CreateReport } />
    </Stack1.Navigator>
  );
};


const App = () => {

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{ headerShadowVisible: false }}>
          <Drawer.Screen name="Home" component={ Home } options={{ drawerLabel: '홈' }}  />
          <Drawer.Screen name="Search" component={ Search } options={{ drawerLabel: '책 검색' }} />
          <Drawer.Screen name="DrawerMyLibrary" component={ Stack1Screens } options={{ drawerLabel: '내 서재' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
