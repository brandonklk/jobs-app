import React from "react";
import { Text, View, Switch, SafeAreaView, Image, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Input } from "@/components/inputs/input";
import Button from "@/components/buttons/Button";
import { Feather } from "@expo/vector-icons";

const logoIco = require('assets/logo-ico.png');

export default function CreateProfileWork() {
  const initialValues = {
    servico: "",
    descricao: "",
    recebimentoDinheiro: false,
    recebimentoApp: false,
  };

  const salvarInformacoes = (values) => {
    console.log("Serviço:", values.servico);
    console.log("Descrição:", values.descricao);
    console.log("Recebimento pelo App:", values.recebimentoApp ? "PELO APP" : "DINHEIRO");
    // Lógica de salvamento de dados aqui
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={salvarInformacoes}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
          <View style={{ padding: 16 }}>
            <Text>Informe seus serviços</Text>

            <Input
              label="Serviço:"
              placeholder="Digite o serviço"
              value={values.servico}
              onChange={handleChange("servico")}
              onBlur={handleBlur("servico")}
            />

            <Input
              label="Descrição:"
              placeholder="Digite a descrição"
              value={values.descricao}
              onChange={handleChange("descricao")}
              onBlur={handleBlur("descricao")}
            />

            <Text>Recebimento:</Text>
            <View style={styles.switchContainer}>
              <View style={styles.switchItem}>
                <Feather name="dollar-sign" size={24} color="black" />
                <Text>Em dinheiro</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#BCE56C" }}
                  thumbColor={values.recebimentoDinheiro ? "#706f70" : "#2F006A"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => handleChange("recebimentoDinheiro")(value)}
                  value={values.recebimentoDinheiro}
                />
              </View>
              <View style={styles.space}></View>
              <View style={styles.switchItem}>
                <Image
                  source={logoIco}
                  style={{ width: 32, height: 32 }}
                />
                <Text>Pelo APP</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#BCE56C" }}
                  thumbColor={values.recebimentoApp ? "#706f70" : "#2F006A"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => handleChange("recebimentoApp")(value)}
                  value={values.recebimentoApp}
                />
              </View>
            </View>
            <Text>Serviços com recebimento pelo App terão taxa de 9% do valor total.</Text>
            <Text>{"\n"}</Text>
            <Button
              title="Salvar"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

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
});
