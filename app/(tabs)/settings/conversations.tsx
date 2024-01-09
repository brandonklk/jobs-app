import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';


export default function Conversations() {
  const route = useRoute();
  const navigation = useNavigation();
  const { chatName } = route.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Conversa com ${chatName}`,
    });
  }, [navigation, chatName]);


  function Message({ text, isSender, userId }) {
    return (
      <View style={[styles.message, isSender ? styles.senderMessage : styles.receiverMessage]}>
        <View style={styles.messageHeader}>
        </View>
        <Text style={styles.messageText}>{text}</Text>
      </View>
    );
  }
  

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  
  const handleSend = () => {
    if (inputText.trim() === '') {
      return;
    }

    setMessages([...messages, { text: inputText, isSender: true }]);
    setInputText('');
  };

 return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message text={item.text} isSender={item.isSender} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>

        {/* Botão do modal */}
        <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
          <Icon name="ellipsis-v" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Enviar Cotação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Opção 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  messagesContainer: {
    padding: 16,
  },
  message: {
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',
    borderRadius: 8,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4B0082',
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#400078',
    color: 'black',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  sendButton: {
    backgroundColor: '#4B0082',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#4B0082',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  modalContent: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    zIndex: 2,
  },
  optionButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 8,
    backgroundColor: '#1d044e',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});