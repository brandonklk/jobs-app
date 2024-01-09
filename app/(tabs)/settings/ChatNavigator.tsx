import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from './chat-list';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

function ChatNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChatList">
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default ChatNavigator;
