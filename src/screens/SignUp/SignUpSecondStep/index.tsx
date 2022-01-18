import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Confirmation } from "../../Confirmation";
import { Bullet } from "../../../components/Bullet";
import { PasswordInput } from "../../../components/PasswordInput";
import { Button } from "../../../components/Button";
import { BackButton } from "../../../components/BackButton";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import theme from "../../../styles/theme";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e confirme");
    }

    if (password != passwordConfirm) {
      return Alert.alert("As senhas não são iguais");
    }

    // Enviar para API E CADASTRAR.

    navigation.navigate("Confirmation", {
      title: "Conta criada!",
      message: `Agora é só fazer login\ne aproveitar.`,
      nextScreenRoute: "SignIn",
    });
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>Faça seu cadastro de{"\n"}forma rápida e fácil.</SubTitle>

          <Form>
            <FormTitle>02. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              secureTextEntry
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
