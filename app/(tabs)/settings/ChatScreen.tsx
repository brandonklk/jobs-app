import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatScreen = ({ route }) => {
  const { chatId, chatName } = route.params;
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Conversa com ${chatName}`,
    });
  }, [navigation, chatName]);

const handleSend = () => {
  if (inputText.trim() === '') {
    return;
  }

  const currentTime = new Date();
  const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

  setMessages([
    ...messages,
    { text: inputText, isSender: true, time: formattedTime },
  ]);
  setInputText('');
};

  const handleBackToChatList = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleCameraModal = () => {
    setCameraModalVisible(!isCameraModalVisible);
  };

  const selectImage = () => {
    // Função seleção de imagem
  };

  async function criarProdutoComPreco(
    serviceName,
    serviceDescription,
    servicePrice
  ) {
    try {
      // Lógica da API Stripe para criar um produto com preço
    } catch (error) {
      console.error('Erro ao criar o serviço:', error);
    }
  }

  const criarServico = async () => {
    if (
      serviceName.trim() === '' ||
      serviceDescription.trim() === '' ||
      !servicePrice
    ) {
      console.error('Preencha todos os campos do serviço.');
      return;
    }

    try {
      const paymentLink = await criarProdutoComPreco(
        serviceName,
        serviceDescription,
        servicePrice
      );
      console.log('Link de pagamento:', paymentLink);
      toggleModal();
    } catch (error) {
      console.error('Erro ao criar o serviço:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.isSender ? styles.senderMessage : styles.receiverMessage,
            ]}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          style={[
            styles.input,
            {
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 8,
              padding: 4,
            },
          ]}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.optionButton}
            onPress={toggleCameraModal}>
            <Text style={styles.optionText}>Enviar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Enviar Arquivo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4B0082',
    color: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#6959CD',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  message: {
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',
    borderRadius: 8,
  },
  messageText: {
    fontSize: 14,
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
    marginLeft: 6,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#4B0082',
    padding: 12,
    borderRadius: 8,
    marginLeft: 6,
  },
  cameraButton: {
    backgroundColor: 'transparent',
    padding: 12,
    marginLeft: 8,
  },
  modalContent: {
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
  messageTime: {
    fontSize: 8,
    color: '#c6ee79',
    marginTop: 2,
  },
});

export default ChatScreen;
