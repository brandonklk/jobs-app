import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";

export default function Premium() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const handleSubscribe = () => {
    if (selectedOption) {
      // Lógica para assinar a opção selecionada
      console.log("Assinando opção:", selectedOption);
    } else {
      // Caso nenhuma opção esteja selecionada
      console.log("Selecione uma opção antes de assinar");
    }
  };
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

      <TouchableOpacity
        style={[styles.option, selectedOption === 1 && styles.selectedOption]}
        onPress={() => handleOptionSelection(1)}
      >
        <Text style={[styles.optionText, selectedOption === 1 && styles.invertedText]}>
          <Text style={[styles.priceText, selectedOption === 1 && styles.invertedText]}>
            {formatPrice(5.99)} - 7 Dias
          </Text>
          {"\n\n"}
          A assinatura de 7 dias oferece uma amostra inicial do serviço, permitindo explorar completamente todos os recursos. Destaque a facilidade de experimentar e usufruir dos benefícios em um curto prazo.
        </Text>
      </TouchableOpacity>


<TouchableOpacity
  style={[
    styles.option,
    selectedOption === 2 && styles.selectedOption,
    selectedOption === 2 && styles.invertedText,
  ]}
  onPress={() => handleOptionSelection(2)}
>
  <Text style={[styles.optionText, selectedOption === 2 && styles.invertedText]}>
    <Text style={[styles.priceText, selectedOption === 2 && styles.invertedText]}>
      {formatPrice(9.99)} - 15 Dias
    </Text>
    {"\n\n"}
    Esta opção permite uma experiência mais prolongada, dando tempo suficiente para se aprofundar no serviço e entender melhor como ele se encaixa no dia a dia. Destaque a oportunidade de explorar mais funcionalidades e se familiarizar com o aplicativo.
  </Text>
</TouchableOpacity>


<TouchableOpacity
  style={[
    styles.option,
    selectedOption === 3 && styles.selectedOption,
    selectedOption === 3 && styles.invertedText,
  ]}
  onPress={() => handleOptionSelection(3)}
>
  <Text style={[styles.optionText, selectedOption === 3 && styles.invertedText]}>
    <Text style={[styles.priceText, selectedOption === 3 && styles.invertedText]}>
      {formatPrice(19.99)} - 20 Dias
    </Text>
    {"\n\n"}
    Com essa opção, o usuário tem ainda mais tempo para se beneficiar do serviço, explorando cada detalhe e tendo uma experiência mais completa. Destaque a ampla visibilidade no mapa durante um período significativo.
  </Text>
</TouchableOpacity>



<TouchableOpacity
  style={[
    styles.option,
    selectedOption === 4 && styles.selectedOption,
    selectedOption === 4 && styles.invertedText,
  ]}
  onPress={() => handleOptionSelection(4)}
>
  <Text style={[styles.optionText, selectedOption === 4 && styles.invertedText]}>
    <Text style={[styles.priceText, selectedOption === 4 && styles.invertedText]}>
      {formatPrice(39.90)} - 30 Dias
    </Text>
    {"\n\n"}
    A opção de 30 dias oferece uma visão holística do serviço, permitindo que o usuário mergulhe completamente na experiência e usufrua ao máximo de todas as funcionalidades. Destaque a visibilidade ampla e prolongada no mapa, criando uma presença marcante.
  </Text>
</TouchableOpacity>



      <Button
        title="Assinar"
        onPress={handleSubscribe}
        disabled={!selectedOption}
        color="#BCE56C"
      />
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    width: 200,
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BCE56C",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedText: {
    color: "#2F006A", // roxo
  },
  unselectedText: {
    color: "#BCE56C", // verde
  },
  selectedOption: {
    backgroundColor: "#BCE56C", // verde
  },
  unselectedOption: {
    backgroundColor: "#2F006A", // roxo
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});