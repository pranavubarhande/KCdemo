import React,  { createContext, useContext, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import ThemeToggle from './src/components/ThemeToggle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider } from "react-redux";
import store from './src/store/store.js'
const Tab = createBottomTabNavigator();
const App = () => {
  
  

  return (
    <Provider store={store}>
      <NavigationContainer >
        <Tab.Navigator >
          <Tab.Screen options={{headerShown: false, tabBarLabelStyle:{color:'black'}, tabBarIcon:({color}) => (<MaterialCommunityIcons name="home-outline" color={"black"} size={24} />)}}  name="Home" component={HomeScreen} />
        </Tab.Navigator>
        <ThemeToggle />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

