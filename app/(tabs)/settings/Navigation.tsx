import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from './chat-list';
import ChatScreen from './ChatScreen';
import Conversations from './conversations';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatList">
      <Stack.Screen name="chat-list" component={ChatListScreen}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} /> 
       <Stack.Screen name="conversations" component={Conversations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
