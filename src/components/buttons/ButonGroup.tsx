import { colors } from '@/constants/colors';
import { ButtonGroupProps } from '@/interfaces/components/buttons';
import { stylesApp } from '@/styles/appstyles';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ButtonGroup = ({ buttons, buttonSelected, onPress }: ButtonGroupProps) => {
  return (
    <View
      style={{
        marginVertical: 22,
        justifyContent: "center",
        flexDirection: "row",
        flex: 1,
      }}
    >
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            {
              backgroundColor: buttonSelected === button.buttonId ? colors.sky[600] : colors.gray[50],
              borderColor: buttonSelected === button.buttonId ? colors.sky[600] : colors.gray[50],
              borderTopLeftRadius: index === 0 ? 8 : 0,
              borderBottomLeftRadius: index === 0 ? 8 : 0,
              borderTopRightRadius: index === buttons.length - 1 ? 8 : 0,
              borderBottomRightRadius: index === buttons.length - 1 ? 8 : 0,
              borderWidth: 1,
            },
          ]}
          onPress={() => onPress(button.buttonId)}
        >
          <Text style={stylesApp.textButton}>{button.buttonName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  textButton: {
    color: 'white', // Adicione a cor do texto desejada
  },
});

export default ButtonGroup;