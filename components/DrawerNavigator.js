import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./StackNavigator";

import Home from "../pages/Home";
import Search from "../pages/Search";
import MyLibrary from "../pages/MyLibrary";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {


  return (
    <Drawer.Navigator
        initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={ StackNavigator } options={{drawerLabel: '홈'}} />
      <Drawer.Screen name="Search" component={ Search } options={{drawerLabel: '책 검색'}} />
      <Drawer.Screen name="MyLibrary" component={ MyLibrary } options={{drawerLabel: '내 서재'}} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;