import Button from "@/components/buttons/Button";
import { Input } from "@/components/inputs/input";
import { initialValuesEditUserPage } from "@/constants/pages/user/initialValues";
import { editUserSchema } from "@/constants/pages/user/user";
import { UserValue } from "@/interfaces/pages/user";
import { Formik, FormikHelpers } from "formik";
import { useState, Fragment } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "@/constants/colors";
import { colorIcon } from "@/constants/routes-menu";
import { stylesApp } from "@/styles/appstyles";
import ButtonGroup from "@/components/buttons/ButonGroup";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [buttonSelected, setButtonSelected] = useState<number>(1);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

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
        "Permissão Negada",
        "Para selecionar uma imagem, você precisa conceder permissão para acessar a galeria de fotos nas configurações do seu smartphone."
      );
    }
  };

  const onSubmit = (
    values: UserValue,
    formikHelpers: FormikHelpers<UserValue>
  ) => {
    console.log("values ", JSON.stringify(values, null, 2));
  };

  const onPressGroupButton = (buttonId: number) => {
    setButtonSelected(buttonId)
  };

  const screenProfile = {
    return (
      
    )
  }

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <Formik
        onSubmit={onSubmit}
        validationSchema={editUserSchema}
        initialValues={initialValuesEditUserPage}
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
                    <Text>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 22, alignItems: "center" }}>
              <Text style={[stylesApp.title, { fontSize: 18 }]}>
                João da silva
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
                Pode alterá-las em qualquer momento.
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
                  label="Confirmação de senha"
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
                onChange={handleChange("address.zipcode")}
                onFocus={() => setFieldTouched("address.zipcode", true)}
                onBlur={() => setFieldTouched("address.zipcode")}
                error={
                  touched.address?.zipcode && errors.address?.zipcode
                    ? errors.address?.zipcode
                    : ""
                }
              />
            </View>

            <View style={{ marginBottom: 12, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Estado"
                  placeholder="Digite seu estado"
                  value={values.address.state}
                  onChange={handleChange("address.state")}
                  onFocus={() => setFieldTouched("address.state", true)}
                  onBlur={() => setFieldTouched("address.state")}
                  error={
                    touched.address?.state && errors.address?.state
                      ? errors.address?.state
                      : ""
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Cidade"
                  placeholder="Digite o nome da sua cidade"
                  value={values.address.city}
                  onChange={handleChange("address.city")}
                  onFocus={() => setFieldTouched("address.city", true)}
                  onBlur={() => setFieldTouched("address.city")}
                  error={
                    touched.address?.city && errors.address?.city
                      ? errors.address?.city
                      : ""
                  }
                />
              </View>
            </View>

            <View style={{ marginBottom: 12, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Rua"
                  placeholder="Digite o nome da rua"
                  value={values.address.street}
                  onChange={handleChange("address.street")}
                  onFocus={() => setFieldTouched("address.street", true)}
                  onBlur={() => setFieldTouched("address.street")}
                  error={
                    touched.address?.street && errors.address?.street
                      ? errors.address?.street
                      : ""
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Senha"
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
              <Button title="Entrar" onPress={() => handleSubmit()}></Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}
