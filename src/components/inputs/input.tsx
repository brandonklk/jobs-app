import { colors } from "@/constants/colors";
import { InputProps } from "@/interfaces/components/inputs";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const Input = ({
  label,
  placeholder,
  error,
  keyboardType = "default",
  onChange,
  onBlur,
  onFocus,
  password = false,
  disabled = false,
  value,
  titleInput,
}: InputProps) => {
  return (
    <View style={styles.container}>
      {/* {titleInput ? (
        <View style={styles.labelView}>
          <Text style={styles.labelText}>{titleInput}</Text>
        </View>
      ) : null} */}

      <View style={styles.labelView}>
        <Text style={styles.labelText}>{label}</Text>
      </View>

      <View>
        <TextInput
          style={
            error
              ? styles.inputTextError
              : disabled
              ? styles.disabledInput
              : styles.inputText
          }
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={password}
          editable={!disabled}
          value={value}
        />
      </View>
      {error && (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 0 },
  labelView: { margin: 0 },
  inputView: { margin: 0 },
  errorView: {
    margin: 0,
    padding: 6,
    marginTop: 4,
    backgroundColor: colors.red[100],
    borderColor: colors.red[300],
    borderRadius: 6,
  },
  labelText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#404D61",
    lineHeight: 24,
  },
  inputText: {
    fontSize: 22,
    borderColor: colors.gray[200],
    borderWidth: 2,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
  },
  disabledInput: { fontSize: 22, borderColor: "#a7a7a7", borderWidth: 2 },
  errorText: { color: colors.red[400], fontSize: 18, fontWeight: "bold" },
  inputTextError: {
    fontSize: 22,
    backgroundColor: colors.white,
    borderColor: colors.red[400],
    borderWidth: 2,
    borderRadius: 4,
    padding: 16,
  },
});
