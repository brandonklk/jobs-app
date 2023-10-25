import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';
import Swipeout from 'react-native-swipeout';

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
