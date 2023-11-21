import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import logo from 'assets/logo.png';

export default function Login() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [name, setName] = useState("");

  const handleLogin = () => {
    // Lógica de login aqui
    // Você pode adicionar a lógica de autenticação com o email e senha fornecidos
    console.log("Email:", email);
    console.log("Password:", password);

    // Exemplo: Navegar para a próxima tela após o login bem-sucedido
    push("(tabs)/map");
  };

  const handleCreateAccount = () => {
    // Lógica para criar uma nova conta
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Exemplo: Navegar para a próxima tela após a criação de conta
    push("(tabs)/map");
  };
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Image source={logo} style={styles.logo} />
      {newAccount ? (
        // Tela para criar uma nova conta
        <View style={{ alignItems: "center" }}>
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { marginTop: 15 }]}>
            <Text style={{ color: "white" }}>Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setNewAccount(false)} style={{ marginTop: 15 }}>
            <Text>Voltar para o login</Text>
          </TouchableOpacity>

        </View>
      ) : (
        // Tela de login
        <View style={{ alignItems: "center" }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={{ color: "white" }}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setNewAccount(true)} style={{ marginTop: 15 }}>
            <Text>Criar uma nova conta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Divider */}
      <View style={{ marginVertical: 10, borderBottomColor: "black", borderBottomWidth: 1, width: 200 }} />
      <Text style={{ marginTop: 10, textAlign: "center", fontWeight: "bold" }}>Ou entre usando sua conta:</Text>

      {/* Botões de login social em colunas */}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => console.log("Login com Google")} style={styles.socialButton}>
          <Image source={require('assets/google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Login com Facebook")} style={styles.socialButton}>
          <Image source={require('assets/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Login com Apple")} style={styles.socialButton}>
          <Image source={require('assets/apple.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: 300,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 5,
    width: 300,
    alignItems: "center",
    borderRadius: 10,
  },
  socialButton: {
    padding: 10,
    alignItems: "center",
    marginBottom: 8, // Espaço entre os botões
  },
  socialIcon: {
    width: 200,
    height: 40,
  },
};
