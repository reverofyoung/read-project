import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
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
import CustomHeader from './components/CustomHeader';

const Drawer = createDrawerNavigator();
const Stack1 = createStackNavigator();

const MyLibraryStack = () => {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="MyLibrary" component={ MyLibrary }/>
      <Stack1.Screen name="CreateReport" component={ CreateReport } />
    </Stack1.Navigator>
  );
};

// const CustomHeader = ({ navigation }) => {
//   return (
//     <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 60, paddingRight: 20 }}>
//       <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//         <Text>✚</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


const App = () => {

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Drawer.Navigator 
          screenOptions={{ 
            drawerStyle: { 
              backgroundColor: '#fff',
              width: '100%', 
            },
            drawerContentOptions: {
              drawerPosition: 'right',
            },
            drawerPosition: 'right',
            header: (props) => <CustomHeader { ...props } />,
            headerShadowVisible: false,
          }}
        >
          <Drawer.Screen name="Home" component={ Home } options={{ drawerLabel: '홈', title: '' }}  />
          <Drawer.Screen name="Search" component={ Search } options={{ drawerLabel: '책 검색', title: '' }} />
          <Drawer.Screen name="DrawerMyLibrary" component={ MyLibraryStack } options={{ drawerLabel: '내 서재', title: '' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
