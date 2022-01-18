import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

export function SignUpSecondStep() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
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
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              secureTextEntry
            />
          </Form>

          <Button title="Cadastrar" color={theme.colors.success} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
