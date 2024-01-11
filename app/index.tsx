import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../app/src/Services/firebaseConfig.js';
import logo from '../assets/logo.png';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.initializeApp(firebaseConfig);

export default function Login() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [name, setName] = useState("");

  const auth = firebase.auth();

  

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        await Google.configureAsync({
          iosClientId: 'SEU_IOS_CLIENT_ID',
          androidClientId: '273563287501-4p9586n56mddh9at7j45ed25ngjmgfj7.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });
      } catch (err) {
        console.log('Erro ao configurar o login do Google:', err);
      }
    };
    configureGoogleSignIn();
  }, []);


  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password) // Use signInWithEmailAndPassword diretamente com 'auth'
      .then((userCredential) => {
        // Login bem-sucedido, redirecionar para a página desejada
        push("(tabs)/map");
      })
      .catch((error) => {
        // Houve um erro no login
        console.error("Erro ao fazer login:", error);
        // Exibir mensagem de erro para o usuário
      });
  };

  const handleCreateAccount = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Conta criada com sucesso
        const user = userCredential.user;
        console.log("Usuário criado com sucesso:", user);
        push("(tabs)/map");
      })
      .catch((error) => {
        // Houve um erro na criação da conta
        console.error("Erro ao criar conta:", error);
        // Exibir mensagem de erro para o usuário
      });
  };
  
  async function handleGoogleLogin() {
    try {
      // Verifica se o dispositivo suporta o Google Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Obtém o token de ID do usuário
      const { idToken } = await GoogleSignin.signIn();
  
      // Cria uma credencial do Google com o token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Faz o login do usuário com a credencial
      const result = await auth().signInWithCredential(googleCredential);
  
      console.log('Usuário do Firebase:', result.user);
      // Redirecionamento após o login bem-sucedido
      // Push para a página desejada após o login
      push("(tabs)/map");
    } catch (error) {
      console.error('Erro ao iniciar o login com o Google:', error);
      Alert.alert('Erro ao fazer login com o Google');
    }
  }

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);

      // Redirecionamento após o login bem-sucedido
      push("(tabs)/map");

      console.log('Login com Facebook realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login com o Facebook:', error);
      // Exibir mensagem de erro para o usuário
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={logo} style={styles.logo} />
      {newAccount ? (
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
  
      <View style={{ marginVertical: 10, borderBottomColor: "black", borderBottomWidth: 1, width: 200 }} />
      <Text style={{ marginTop: 10, textAlign: "center", fontWeight: "bold" }}>Ou entre usando sua conta:</Text>
  
      {/* Social login buttons */}
      <View style={{ alignItems: "center" }}>
        {/* Code for Google, Facebook, and Apple login buttons */}
        <TouchableOpacity onPress={(handleGoogleLogin)=> console.log("Login com Gooogle")} style={styles.socialButton}>
  <Image source={require('assets/google.png')} style={styles.socialIcon} />
</TouchableOpacity>

<TouchableOpacity onPress={handleFacebookLogin} style={styles.socialButton}>
  <Image source={require('assets/facebook.png')} style={styles.socialIcon} />
</TouchableOpacity>


      </View>
    </View>
  );
};  
const styles = {
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: 300,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#400078",
    padding: 10,
    margin: 5,
    width: 300,
    alignItems: "center",
    borderRadius: 10,
  },
  socialButton: {
    padding: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  socialIcon: {
    width: 200,
    height: 40,
  },
};
