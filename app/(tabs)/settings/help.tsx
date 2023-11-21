import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";

export function Ajuda() {
  const [tituloProblema, setTituloProblema] = useState('');
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [imagem, setImagem] = useState(null);



  const handleTituloChange = (text) => {
    setTituloProblema(text);
  };

  const handleDescricaoChange = (text) => {
    setDescricaoProblema(text);
  };

  const handleEscolherImagem = () => {
    const options = {
      title: 'Escolher uma imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar uma foto',
      chooseFromLibraryButtonTitle: 'Escolher da galeria',
    };

    ImagePicker.showImagePicker(options, (response: any) => {
      if (response.didCancel) {
        console.log('Seleção de imagem cancelada');
      } else if (response.error) {
        console.log('Erro ao escolher imagem:', response.error);
      } else {
        // A imagem foi escolhida com sucesso
        setImagem(response.uri);
      }
    });
  };

const handleSubmit = () => {
  if (!tituloProblema || !descricaoProblema) {
    // Se qualquer um dos campos obrigatórios não estiver preenchido, exiba uma mensagem de erro
    alert('Por favor, preencha todos os campos obrigatórios.');
    return; // Impede que o envio ocorra se algum campo obrigatório estiver em branco
  }

  // Confere se os campos obrigatórios estão preenchidos.
  console.log('Título do Problema:', tituloProblema);
  console.log('Descrição do Problema:', descricaoProblema);

  // Envio dos dados para a rota do Firebase
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Problema*:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título do problema"
        value={tituloProblema}
        onChangeText={handleTituloChange}
      />

      <Text style={styles.label}>Descrição*:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva seu problema"
        multiline
        numberOfLines={4}
        value={descricaoProblema}
        onChangeText={handleDescricaoChange}
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={handleEscolherImagem}>
        <Text style={styles.imagePickerText}>Escolher Imagem</Text>
      </TouchableOpacity>

      {imagem && <Image source={{ uri: imagem }} style={styles.imagemSelecionada} />}

      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    textAlignVertical: 'top', // rolagem no campo de texto
  },
  imagePickerButton: {
    backgroundColor: '#1d044e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    color: 'white',
    fontSize: 16,
  },
  imagemSelecionada: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#1d044e', // Cor dos botões
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 16,
  }
});

export default Ajuda;
