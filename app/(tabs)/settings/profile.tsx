import { useEffect, useState, Fragment } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Button from '@/components/buttons/Button';
import { Input } from '@/components/inputs/input';
import { editUserSchema } from '@/constants/pages/user/user';
import { UserValue } from '@/interfaces/pages/user';
import { Formik, FormikHelpers } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/compat/firestore';
import 'firebase/auth';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '@/constants/colors';
import { colorIcon } from '@/constants/routes-menu';
import { stylesApp } from '@/styles/appstyles';
import ButtonGroup from '@/components/buttons/ButonGroup';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';


export default function Profile() {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [buttonSelected, setButtonSelected] = useState<number>(1);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    city: '',
    state: '',
    street: '',
  });
  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    // outros campos do usuário
  });

useEffect(() => {
  const fetchUserDataAfterLogin = async () => {
    try {
      // Lógica para verificar se o usuário está autenticado
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const uid = currentUser.uid;
        setUserId(uid);
        setUserName(currentUser.displayName || '');

        // Recuperar dados do Firestore
        const db = firebase.firestore();
        const userRef = db.collection('Usuarios').doc(uid);
        const doc = await userRef.get();

        if (doc.exists) {
          const userDataFromFirestore = doc.data();
          setUserData((prevUserData) => ({
            ...prevUserData,
            ...userDataFromFirestore,
          }));
        } else {
          console.log('Nenhum documento encontrado!');
        }

        // Recuperar dados do AsyncStorage
        const userDataFromStorage = await AsyncStorage.getItem('userData');
        if (userDataFromStorage) {
          setUserData(JSON.parse(userDataFromStorage));
        }
        await getImageFromFirebaseStorage(uid);

        setUserDataLoaded(true); // Marcar que os dados foram carregados
      }
    } catch (error) {
      console.error('Erro ao recuperar dados após o login:', error);
    }
  };

  // Chama a função após o login
  fetchUserDataAfterLogin();
}, []);


  const storage = getStorage();

  const selectImage = async () => {
    const { granted } = await requestPermission();

    if (granted) {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!canceled) {
        const [asset] = assets;
        setImage(asset.uri);
      }
    } else {
      Alert.alert(
        'Permissão Negada',
        'Para selecionar uma imagem, você precisa conceder permissão para acessar a galeria de fotos nas configurações do seu smartphone.'
      );
    }
  };


  const storageRef = ref(storage, `user/${userId}/profile.png`);

// Função para enviar a imagem para o Storage
const uploadImageToFirebase = async (imageURI: string, uid: string) => {
  try {
    const response = await fetch(imageURI);
    const blob = await response.blob();

    const storageRef = ref(storage, `user/${uid}/profile.png`);
    await uploadBytes(storageRef, blob);

    console.log('Imagem enviada para o Firebase Storage com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar a imagem para o Firebase Storage:', error);
  }
};

  const getImageFromFirebaseStorage = async (uid: string) => {
    const storageRef = ref(storage, `user/${uid}/profile.png`);
    try {
      const url = await getDownloadURL(storageRef);
      console.log('URL da imagem recuperada do Firebase Storage:', url);
      setImage(url);
    } catch (error) {
      console.error('Erro ao obter a URL da imagem do Firebase Storage:', error);
    }
  };

  const db = firebase.firestore();

// Função para enviar os dados para o Firestore
const sendDataToFirestore = async (values, userId) => {
  try {
    const userRef = db.collection('Usuarios').doc(userId);

    // Adiciona ou atualiza os dados do usuário no Firestore
    await userRef.set(values, { merge: true });

    console.log('Dados do usuário enviados para o Firestore com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar os dados para o Firestore:', error);
  }
};

  // Função para recuperar os dados do usuário
  const fetchData = async () => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const uid = currentUser.uid;
        setUserId(uid);
        setUserName(currentUser.displayName || '');

        // Resto da sua lógica para recuperar os dados do usuário...

        // Recuperar dados do AsyncStorage
        const userDataFromStorage = await AsyncStorage.getItem('userData');
        if (userDataFromStorage) {
          setUserData(JSON.parse(userDataFromStorage));
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar dados:', error);
    }
  };

const handleFormSubmit = (updatedUserData) => {
  // Atualize os dados do usuário no Firestore
  const db = firebase.firestore();
  const userRef = db.collection('Usuarios').doc(userId);

  userRef.update(updatedUserData)
    .then(() => {
      console.log('Dados do usuário atualizados com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao atualizar os dados do usuário:', error);
    });
};

const onSubmit = async (
  values: UserValue,
  formikHelpers: FormikHelpers<UserValue>
) => {
  const updatedUserData = {

    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    zipcode: values.address.zipcode, 
    city: values.address.city,
    street: values.address.street, 
    state: values.address.state,
    number: values.address.number,
   
  };

  if (image) {
    await uploadImageToFirebase(image, userId);
    await getImageFromFirebaseStorage(userId);
  }

   // Enviar dados atualizados para o Firestore
   await sendDataToFirestore(updatedUserData, userId);
   // Atualizar os campos do formulário com os novos valores
  formikHelpers.setValues({
    ...values,
    ...updatedUserData,
  });
  // Atualizar estados para exibir os dados atualizados
  setUserData({ ...userData, ...updatedUserData });
  setImage(image); // Se a imagem mudou, atualize o estado aqui
};
// Exibir alerta após salvar os dados
Alert.alert('Dados Salvos', 'Os dados foram salvos com sucesso!', [
  {
    text: 'OK',
    onPress: () => {
      // Adicione aqui qualquer ação que você queira fazer após o OK no alerta
      console.log('Usuário pressionou OK no alerta');
    },
  },
]);


const onPressGroupButton = (buttonId: number) => {
  setButtonSelected(buttonId);
};



  const fetchAddressInfo = async (zipcode) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
      const { localidade: city, uf: state, logradouro: street } = response.data;

      setAddressInfo({ city, state, street });
    } catch (error) {
      console.error('Error fetching address info:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <Formik
        onSubmit={onSubmit}
        validationSchema={editUserSchema}
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          passwordConfirmation: '',
          address: {
            zipcode: '',
            state: '',
            city: '',
            street: '',
            number: '',
          },
        }}
      >
        {({
          handleSubmit,
          handleChange,
          errors,
          values,
          touched,
          setFieldTouched,
        }) => (
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{ marginTop: 22, marginBottom: 14, alignItems: "center" }}
            >
              <TouchableOpacity onPress={selectImage}>
                {image ? (
                  <Fragment>
                    <Image
                      source={{ uri: image }}
                      style={{ width: 140, height: 140, borderRadius: 100 }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "white",
                        borderRadius: 50,
                        padding: 5,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <MaterialIcons name="edit" size={26} color={colorIcon} />
                    </View>
                  </Fragment>
                ) : (
                  <View
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 100,
                      borderColor: colors.gray[300],
                      borderWidth: 1,
                      backgroundColor: colors.gray[200],
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>Adicionar Foto</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 22, alignItems: "center" }}>
  <Text style={[stylesApp.title, { fontSize: 18 }]}>
    {userData.firstName || 'Nome do usuário'}
  </Text>
</View>


            <View style={{ marginVertical: 22 }}>
              <ButtonGroup
                onPress={onPressGroupButton}
                buttonSelected={buttonSelected}
                buttons={[
                  { buttonName: "Perfil", buttonId: 1 },
                  { buttonName: "Configurações", buttonId: 2 },
                ]}
              ></ButtonGroup>
            </View>

            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#404D61",
                  lineHeight: 24,
                }}
              >
                Informações do usuário
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 16,
                  color: "#757D8A",
                  lineHeight: 24,
                }}
              >
                Introduza as informações desejadas, para alterar seu perfil.
                Você pode alterá-las a qualquer momento.
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Input
                label="Endereço de e-mail"
                placeholder="Digite o email"
                value={values.email}
                onChange={handleChange("email")}
                onFocus={() => setFieldTouched("email", true)}
                onBlur={() => setFieldTouched("email")}
                error={touched.email && errors.email ? errors.email : ""}
              />
            </View>

            <View style={{ marginBottom: 12, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Primeiro nome"
                  placeholder="Digite seu primeiro nome"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  onFocus={() => setFieldTouched("firstName", true)}
                  onBlur={() => setFieldTouched("firstName")}
                  error={
                    touched.firstName && errors.firstName
                      ? errors.firstName
                      : ""
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Último nome"
                  placeholder="Digite seu último nome"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  onFocus={() => setFieldTouched("lastName", true)}
                  onBlur={() => setFieldTouched("lastName")}
                  error={
                    touched.lastName && errors.lastName ? errors.lastName : ""
                  }
                />
              </View>
            </View>

            <View style={{ marginBottom: 12, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Senha"
                  placeholder="Digite sua senha"
                  value={values.password}
                  onChange={handleChange("password")}
                  onFocus={() => setFieldTouched("password", true)}
                  onBlur={() => setFieldTouched("password")}
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Repita a senha"
                  placeholder="Digite sua confirmação de senha"
                  value={values.passwordConfirmation}
                  onChange={handleChange("passwordConfirmation")}
                  onFocus={() => setFieldTouched("passwordConfirmation", true)}
                  onBlur={() => setFieldTouched("passwordConfirmation")}
                  error={
                    touched.passwordConfirmation && errors.passwordConfirmation
                      ? errors.passwordConfirmation
                      : ""
                  }
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Input
                label="Endereço residencial"
                placeholder="Digite seu CEP"
                value={String(values.address.zipcode)}
                onChange={async (zipcode) => {
                  handleChange('address.zipcode')(zipcode);

                  // Fetch address info when zip code changes
                  await fetchAddressInfo(zipcode);
                }}
                onFocus={() => setFieldTouched('address.zipcode', true)}
                onBlur={() => setFieldTouched('address.zipcode')}
                error={
                  touched.address?.zipcode && errors.address?.zipcode
                    ? errors.address?.zipcode
                    : ''
                }
              />
            </View>

            <View style={{ marginBottom: 12, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Estado"
                  placeholder="Digite seu estado"
                  value={values.address.state || addressInfo.state}
                  onChange={handleChange('address.state')}
                  onFocus={() => setFieldTouched('address.state', true)}
                  onBlur={() => setFieldTouched('address.state')}
                  error={
                    touched.address?.state && errors.address?.state
                      ? errors.address?.state
                      : ''
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Cidade"
                  placeholder="Digite o nome da sua cidade"
                  value={values.address.city || addressInfo.city}
                  onChange={handleChange('address.city')}
                  onFocus={() => setFieldTouched('address.city', true)}
                  onBlur={() => setFieldTouched('address.city')}
                  error={
                    touched.address?.city && errors.address?.city
                      ? errors.address?.city
                      : ''
                  }
                />
              </View>
            </View>

            <View style={{ marginBottom: 12, flexDirection: "row" }}>
              <View style={{ marginBottom: 12 }}>
                <Input
                  label="Rua"
                  placeholder="Digite o nome da rua"
                  value={values.address.street || addressInfo.street}
                  onChange={handleChange('address.street')}
                  onFocus={() => setFieldTouched('address.street', true)}
                  onBlur={() => setFieldTouched('address.street')}
                  error={
                    touched.address?.street && errors.address?.street
                      ? errors.address?.street
                      : ''
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Número"
                  placeholder="Digite sua senha"
                  value={String(values.address.number)}
                  onChange={handleChange("address.number")}
                  onFocus={() => setFieldTouched("address.number", true)}
                  onBlur={() => setFieldTouched("address.number")}
                  error={
                    touched.address?.number && errors.address?.number
                      ? errors.address?.number
                      : ""
                  }
                />
              </View>
            </View>

            <View>
            <Button
  title="Salvar"
  onPress={handleSubmit}
  disabled={!userDataLoaded}
></Button>

            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}
