import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Conversations from './settings/conversations';

const Works = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const professional = route.params?.professional;
  

  const handleSendMessage = (professionalId, professionalName) => {
    navigation.navigate('conversations', {
      chatId: professionalId,
      chatName: professionalName,
    });    
  };
  
  
  
  
  const renderPaymentIcons = () => {
    const { card, money } = professional;
    const icons = [];
    if (card) {
      icons.push(
        <Icon key="card" name="credit-card" size={30} color="#BCE56C" />
      );
    }
    if (money) {
      icons.push(
        <Icon key="money" name="money" size={30} color="#BCE56C" />
      );
    }
    return icons;
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.colorSection, { flex: 40, backgroundColor: '#4E007C' }]} />
        <View style={[styles.colorSection, { flex: 20, backgroundColor: '#400078' }]} />
        <View style={[styles.colorSection, { flex: 30, backgroundColor: '#411A87' }]} />
        <View style={[styles.colorSection, { flex: 10, backgroundColor: '#160040' }]} />
      </View>
      {professional && (
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: professional.photoURL }} style={styles.profileImage} />
            <Text style={styles.name}>{professional.name}</Text>
            <Text style={styles.profession}>{professional.serv}</Text>
            <Text style={styles.description}>{professional.desc}</Text>
          </View>
          <View style={styles.paymentMethods}>
        <Text style={styles.paymentLabel}>Métodos de Pagamento:</Text>
        <View style={styles.paymentIcons}>
          {renderPaymentIcons()}
        </View>
      </View>
          <TouchableOpacity
            style={styles.sendMessageButton}
            onPress={() => handleSendMessage(professional.uid, professional.name)}>
            <Text style={styles.buttonText}>Enviar Mensagem</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  profession: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    color: "white",
  },
  sendMessageButton: {
    backgroundColor: "#BCE56C",
    width: 150,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: "black",
    fontSize: 14, // Reduzindo o tamanho da fonte
    fontWeight: "bold",
  },
  background: {
    flexDirection: 'column',
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  colorSection: {
    flex: 1,
  },
  paymentMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  paymentLabel: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginHorizontal: 5, // Ajuste o espaçamento horizontal conforme necessário
  },
});

export default Works;
