import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux';
import store from './redux/store';

import "react-native-gesture-handler";

// import screens 
import Home from './screens/Home';
import Search from './screens/Search';
import BookState from './screens/BookState';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={ Home } />
          </Stack.Group>
          <Stack.Group screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name="Search" component={ Search }  options={{title: ''}} />
            <Stack.Screen name="BookState" component={ BookState }  options={{title: ''}} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
