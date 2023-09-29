// import { Text, View, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function Help() {
//   const { back } = useRouter();
//   const insets = useSafeAreaInsets();

//   return (
//     <View>
//       <Text>Conversations</Text>
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const Ajuda = () => {
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [imagem, setImagem] = useState(null);

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

    ImagePicker.showImagePicker(options, (response) => {
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
    // Enviar para a rota do firebase para ir por email.
    console.log('Descrição do Problema:', descricaoProblema);
    console.log('Imagem:', imagem);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição do Problema:</Text>
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

      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSubmit}
      >
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

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

