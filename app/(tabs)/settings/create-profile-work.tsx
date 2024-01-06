import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Formik } from "formik";
// import Button from "@/components/buttons/Button";
import { Feather } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../../src/Services/firebaseConfig';

if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const logoIco = require('assets/logo-ico.png');

export default function CreateProfileWork() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProfession, setSelectedProfession] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [recebimentoDinheiro, setRecebimentoDinheiro] = useState(false);
  const [recebimentoApp, setRecebimentoApp] = useState(false);
  const [agencia, setAgencia] = useState('');
  const [numeroConta, setNumeroConta] = useState('');
  const [tipoConta, setTipoConta] = useState('Conta corrente');
  const [open, setOpen] = useState(false);
  const [nomeContato, setNomeContato] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [whatsappContato, setWhatsappContato] = useState('');
  const totalSteps = 3;

  const maskPhoneNumber = (value) => {
    // Remove todos os caracteres não numéricos
    const phoneNumber = value.replace(/\D/g, '');
    // Aplica a máscara no número de telefone
    let formattedPhoneNumber = '';
    if (phoneNumber.length > 2) {
      formattedPhoneNumber += `(${phoneNumber.substring(0, 2)}) `;
      if (phoneNumber.length > 6) {
        formattedPhoneNumber += `${phoneNumber.substring(2, 3)} ${phoneNumber.substring(3, 7)}-${phoneNumber.substring(7, 11)}`;
      } else {
        formattedPhoneNumber += `${phoneNumber.substring(2)}`;
      }
    } else {
      formattedPhoneNumber = phoneNumber;
    }

    return formattedPhoneNumber;
  };


  const salvarInformacoes = (dataToSave) => {
    console.log('Dados para salvar:', dataToSave);

    const dataToPush = {
      name: nomeContato,
      desc: serviceDescription,
      serv: selectedProfession,
      money: recebimentoDinheiro,
      card: recebimentoApp,
      mail: emailContato,
      whatsapp: whatsappContato,
      // ...outros campos
    };

    console.log('Profissão:', selectedProfession);
    console.log('Descrição dos serviços:', serviceDescription);
    console.log('Recebimento pelo App:', recebimentoApp);
    console.log('Recebimento em Dinheiro:', recebimentoDinheiro);
    console.log('Agência:', agencia);
    console.log('Número da Conta:', numeroConta);
    console.log('Tipo de Conta:', tipoConta);
    console.log('Banco:', value);

    if (firebase && firebase.database) {
      const database = firebase.database();
      database
        .ref('data')
        .push(dataToPush)
        .then(() => {
          console.log('Data sent successfully to the Realtime Database!');
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    } else {
      console.error('Firebase is not properly initialized or imported.');
    }
  };

  const handleCustomNextButton = () => {
    // Adicione aqui a lógica que deseja executar ao clicar no botão personalizado para avançar
    setCurrentStep(currentStep + 1); // Avança para a próxima etapa
  };
  const handleCustomNextButtonSecondStep = () => {
    const totalSteps = 3; // Total de etapas (steps) no formulário
  
    // Verifica se é possível avançar para o próximo step
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1); // Avança para o próximo step
    } else {
      // Implemente aqui a lógica de envio do formulário ou ação após a última etapa
      console.log('Último step alcançado. Aqui você pode enviar o formulário ou fazer outra ação.');
    }
  };

  // const handleSave = (values) => {
  //   // Realize a validação manual antes de salvar os dados
  //   Object.keys(values).forEach((key) => {
  //     validateField(key, values[key]);
  //   });

  //   // Se não houver erros de validação, salve os dados
  //   if (Object.values(validationErrors).every((error) => !error)) {
  //     // Lógica para salvar os dados no Firebase ou no seu backend
  //     console.log('Dados salvos:', values);
  //   } else {
  //     console.log('Corrija os erros antes de salvar os dados.');
  //   }
  // };

  // // Restante do seu código


  const banksList = [
    'Agibank',
    'Alfa',
    'Banco da Amazônia',
    'Banco do Brasil',
    'Banco do Nordeste',
    'Banco Inter',
    'Banco XP',
    'BancoSeguro',
    'Banese',
    'Banestes',
    'Banpará',
    'Banrisul',
    'BMG',
    'Bradesco',
    'BRB',
    'BS2',
    'BTG Pactual',
    'BV',
    'C6',
    'Caixa',
    'CCB Brasil',
    'Clássico',
    'Daycoval',
    'Digimais',
    'Digio',
    'Fibra',
    'Genial',
    'Industrial do Brasil',
    'Itaú Unibanco',
    'Luso Brasileiro',
    'Master',
    'Mercantil do Brasil',
    'Modal',
    'Nubank',
    'Omni',
    'Original',
    'Paccar',
    'Pan',
    'Paraná',
    'Paulista',
    'Pine',
    'Randon',
    'Rendimento',
    'Rodobens',
    'Safra',
    'Sicoob',
    'Sicredi',
    'Sofisa',
    'Topázio',
    'Tribanco',
    'Voiter'
  ];

  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    banksList.map(bank => ({
      label: bank,
      value: bank
    }))
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        initialValues={{
          selectedProfession: '',
          serviceDescription: '',
          nomeContato: '',
          emailContato: '',
          whatsappContato: '',
        }}
        onSubmit={(values) => salvarInformacoes(values)}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <ProgressSteps activeStep={currentStep} onChange={setCurrentStep}>
            <ProgressStep label="Profissão" nextBtnDisabled nextBtnText="">
              <View style={styles.step}>
                {/* Etapa 1 - Profissão */}
                <Text>Insira sua profissão</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escolha a profissão"
                  value={values.selectedProfession}
                  onChangeText={handleChange('selectedProfession')}
                  onBlur={handleBlur('selectedProfession')}
                />
                <Text>Descreva seus serviços</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Conte para todos o que você faz"
                  value={values.serviceDescription}
                  onChangeText={handleChange('serviceDescription')}
                  onBlur={handleBlur('serviceDescription')}
                />
                {/* Seu botão personalizado para avançar */}
                <TouchableOpacity
                  style={styles.customButton}
                  onPress={handleCustomNextButton}
                >
                  <Text style={{ color: 'white' }}>Avançar</Text>
                </TouchableOpacity>
              </View>
            </ProgressStep>

            {/* Etapa 2 - Recebimento */}
            <ProgressStep
  label="Recebimento"
  nextBtnDisabled
  nextBtnText=""
  prevBtnDisabled={true}
  removeBtnRow={true}
>  
      <View style={styles.step}>
    <Text style={styles.recebimentoTitle}>Como deseja receber:</Text>
                <View style={styles.switchContainer}>
                  {/* Adicione seus switches */}
                  <Feather name="dollar-sign" size={24} color="black" />
                  <Text>Em dinheiro</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#BCE56C' }}
                    thumbColor={recebimentoDinheiro ? '#2F006A' : '#706f70'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => setRecebimentoDinheiro(value)}
                    value={recebimentoDinheiro}
                  />
                  <Image source={logoIco} style={{ width: 32, height: 32 }} />
                  <Text>Pelo APP</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#BCE56C' }}
                    thumbColor={recebimentoApp ? '#2F006A' : '#706f70'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => setRecebimentoApp(value)}
                    value={recebimentoApp}
                  />

                  {/* Mensagem sobre a taxa de 9% */}
                  {/* {recebimentoApp && (
  <View style={{ alignItems: 'center', marginTop: 10 }}>
    <Text>
      Pagamentos feitos pelo app terão 9% de taxa.
    </Text>
    <Text>
      A conta deve estar em nome do mesmo.
    </Text>
  </View>
)} */}
                </View>
                {/* Selecione o banco */}
                <View style={{ ...styles.selectContainer, marginHorizontal: 20 }}>
                <Text style={styles.label}>Selecione o banco</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    multiple={false}
                    mode="SIMPLE"
                    badgeDotColors={["#8ac926"]}
                  />
                  {/* Campos para agência e número da conta */}
                  <TextInput
                    placeholder="Número da agência"
                    value={agencia}
                    style={styles.input}
                    onChangeText={setAgencia}
                    keyboardType="numeric" // Definindo o teclado para aceitar apenas números
                  />
                  <TextInput
                    placeholder="Número da conta"
                    value={numeroConta}
                    style={styles.input}
                    onChangeText={setNumeroConta}
                    keyboardType="numeric" // Definindo o teclado para aceitar apenas números
                  />

                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {/* Botões de seleção para Conta corrente e Poupança */}
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        { marginRight: 20 }, // Espaço maior entre as opções
                        tipoConta === 'Conta corrente' && { fontWeight: 'bold', color: 'green' }, // Negrito e cor verde para opção selecionada
                      ]}
                      onPress={() => setTipoConta('Conta corrente')}>
                      <Text style={tipoConta === 'Conta corrente' ? { fontWeight: 'bold', color: 'green' } : {}}>
                        Conta corrente
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        tipoConta === 'Poupança' && { fontWeight: 'bold', color: 'blue' }, // Negrito e cor azul para opção selecionada
                      ]}
                      onPress={() => setTipoConta('Poupança')}>
                      <Text style={tipoConta === 'Poupança' ? { fontWeight: 'bold', color: 'blue' } : {}}>
                        Poupança
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
             {/* Botões de navegação */}
             <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.customButton}
        onPress={handleCustomNextButtonSecondStep}
      >
        <Text style={{ color: 'white' }}>Avançar</Text>
      </TouchableOpacity>
      
      {/* Botão de navegação para o step anterior */}
      <View>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={{ color: 'white' }}>Anterior</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
</ProgressStep>
    
           {/* Etapa 3 - Contato */}
<ProgressStep label="Contato"
 nextBtnDisabled
 nextBtnText=""
 prevBtnDisabled={true}
 removeBtnRow={true}
>
  <View style={styles.step}>
    <Text>Nome:</Text>
    <TextInput
      style={styles.input}
      placeholder="Digite seu nome"
      value={nomeContato}
      onChangeText={setNomeContato}
    />
    <Text>Email:</Text>
    <TextInput
      style={styles.input}
      placeholder="Digite seu email"
      value={emailContato}
      onChangeText={setEmailContato}
    />
    <Text>WhatsApp:</Text>
    <TextInput
      style={styles.input}
      placeholder="Digite seu WhatsApp"
      value={maskPhoneNumber(whatsappContato)}
      keyboardType="numeric"
      onChangeText={(value) => setWhatsappContato(maskPhoneNumber(value))}
    />
    {/* Botão Salvar */}
  {/* Botão Anterior */}
{currentStep > 0 && (
  <TouchableOpacity
    style={styles.customButton}
    onPress={() => setCurrentStep(currentStep - 1)}
  >
    <Text style={{ color: 'white' }}>Anterior</Text>
  </TouchableOpacity>
)}

{/* Botão Enviar - renderizado apenas no último step */}
{currentStep === totalSteps - 1 && (
  <TouchableOpacity
    style={styles.customButton}
    onPress={handleSubmit}
    disabled={currentStep !== totalSteps - 1}
  >
    <Text style={{ color: 'white' }}>Salvar</Text>
  </TouchableOpacity>
)}


    </View>
  </ProgressStep>
</ProgressSteps>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  switchItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  space: {
    width: 32,
  },
  recebimentoTitle: {
    textAlign: 'center',
    fontSize: 18, // Ajuste conforme necessário
    marginBottom: 10, // Ajuste o espaçamento inferior conforme necessário
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  customButton: {
    backgroundColor: 'blue', // Cor de fundo do botão
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12, // Espaçamento vertical interno
    paddingHorizontal: 20, // Espaçamento horizontal interno
    borderRadius: 5, // Borda arredondada
    padding: 10,
  },
});
