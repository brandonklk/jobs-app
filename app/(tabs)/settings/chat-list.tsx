import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import Conversations from './conversations';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const user = firebase.auth().currentUser;

if (user) {
  const userId = user.uid;
  // Agora você pode usar userId para verificar se as mensagens foram enviadas por esse usuário
}


const ChatListScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;
      
      const userSentMessagesRef = firebase.database().ref('Chat/Chatrooms');

      userSentMessagesRef.on('value', (snapshot) => {
        const chatsWithSentMessages = [];
        snapshot.forEach((chat) => {
          const messages = chat.val().messages;
          const sentByCurrentUser = messages.some((message) => message.sentById === userId);

          if (sentByCurrentUser) {
            chatsWithSentMessages.push({
              id: chat.key,
              name: chat.val().nome,
              lastMessage: chat.val().ultimaMensagem,
              unreadCount: chat.val().unreadCount,
              lineColor: '#3606B5',
            });
          }
        });
        setChats(chatsWithSentMessages);
      });

      return () => userSentMessagesRef.off('value');
    }
  }, []);

  const navigateToChat = (chatId, chatName) => {
    router.push({
      pathname: '(tabs)/settings/conversations', 
      state: {
        chatId,
        chatName,
      },
    });
  };
  
  const renderChatItem = (item) => {
    const swipeoutButtons = [
      {
        text: 'Excluir',
        backgroundColor: 'red',
        component: (
          <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', marginLeft: 25 }}>
            <Icon name="trash" size={20} color="white" />
          </View>
        ),
        onPress: () => {
          // Lógica para excluir a conversa e suas mensagens
          const chatRef = firebase.database().ref(`Chat/Chatrooms/${item.id}`);
          chatRef.remove()
            .then(() => {
              console.log(`Conversa ${item.name} excluída.`);
              // Atualiza a lista de conversas após a exclusão
              const updatedChats = chats.filter((chat) => chat.id !== item.id);
              setChats(updatedChats);
            })
            .catch((error) => {
              console.error('Erro ao excluir conversa:', error);
            });
        },
      },
    ];
    return (
      <Swipeout right={swipeoutButtons} autoClose={true}>
        <TouchableOpacity
          style={[styles.chatItem, { borderColor: item.lineColor }]}
          onPress={() => navigateToChat(item.id, item.name)}
        >
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>{item.name}</Text>
            <View style={styles.iconContainer}>
              <Icon name="chevron-left" size={20} color="#b8b7b4" />
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => renderChatItem(item)}
        keyExtractor={(item) => item.id}
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1, // Ocupa o espaço disponível
  },
  iconContainer: {
    marginLeft: 'auto', // Alinha à direita da tela
  },
});

export default ChatListScreen;