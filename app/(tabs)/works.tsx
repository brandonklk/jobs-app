import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';

const Works = () => {
  const route = useRoute();
  const { professional } = route.params;

  const handleSendMessage = () => {
    // Lógica para enviar mensagem para o profissional
    console.log("Enviar mensagem para:", professional.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.colorSection, { flex: 40, backgroundColor: '#4E007C' }]} />
        <View style={[styles.colorSection, { flex: 20, backgroundColor: '#400078' }]} />
        <View style={[styles.colorSection, { flex: 30, backgroundColor: '#411A87' }]} />
        <View style={[styles.colorSection, { flex: 10, backgroundColor: '#160040' }]} />
      </View>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: professional.photoURL }} style={styles.profileImage} />
          <Text style={styles.name}>{professional.name}</Text>
          <Text style={styles.profession}>{professional.serv}</Text>
          <Text style={styles.description}>{professional.desc}</Text>
        </View>
        <TouchableOpacity style={styles.sendMessageButton} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>
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
});

export default Works;
