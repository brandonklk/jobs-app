import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatListScreen = () => {
  const navigation = useNavigation();
  const chats = [
    { id: 1, name: 'João da Silva', lastMessage: 'Hello!', unreadCount: 0, lineColor: '#3606B5', userImage: require('./assets/user.png') },
    { id: 2, name: 'Zé Carlos', lastMessage: 'Hi there!', unreadCount: 0, lineColor: '#3606B5', userImage: require('./assets/user.png') },
    // ... outros chats que tem ligação no firebase
  ];

  const navigateToChat = (chatId, chatName) => {
    navigation.navigate('Chat', { chatId, chatName });
  };

  const renderChatItem = (item) => {
    const swipeoutButtons = [
      {
        text: 'folder-open',
        backgroundColor: '#4B0082',
        component: (
          <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', marginLeft: 25 }}>
            <Icon name="folder-open" size={20} color="white" />
          </View>
        ), 
        onPress: () => {
          // Lógica para arquivar a conversa aqui
          console.log(`Arquivando ${item.name}`);
        },
      },
      {
        text: 'Excluir',
        backgroundColor: 'red',
        component: (
          <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', marginLeft: 25 }}>
            <Icon name="trash" size={20} color="white" />
          </View>
        ),
        onPress: () => {
          // Lógica para excluir a conversa aqui
          console.log(`Excluindo ${item.name}`);
        },
      },
    ];

    return (
      <Swipeout right={swipeoutButtons} autoClose={true}>
        <TouchableOpacity
          style={[styles.chatItem, { borderColor: item.lineColor }]}
          onPress={() => navigateToChat(item.id, item.name)}
        >
          <Image
            source={item.userImage}
            style={{ width: 32, height: 32, marginRight: 10, marginLeft: 10 }}
          />
          <Text style={styles.chatName}>{item.name}</Text>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => renderChatItem(item)}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ChatListScreen;
