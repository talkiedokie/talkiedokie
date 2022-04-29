import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeBottomTabNavigator from './homeBottomTabNavigator';
import Home from '../screens/Home';
import Camera from '../screens/Camera';
import CreatePost from '../screens/CreatePost';


const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="CreatePost" component={CreatePost} options={{headerShown: true,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
