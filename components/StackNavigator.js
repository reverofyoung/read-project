import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../pages/Home';
import Search from '../pages/Search';
import MyLibrary from '../pages/MyLibrary';
import CreateReport from '../pages/CreateReport';

const Stack = createStackNavigator();

function StackNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ Home } />
      <Stack.Screen name="Search" component={ Search } />
      <Stack.Screen name="MyLibrary" component={ MyLibrary } />
      <Stack.Screen name="CreateReport" component={ CreateReport } />
    </Stack.Navigator>
  );
}

export default StackNavigator ;