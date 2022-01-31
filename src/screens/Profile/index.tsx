import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../../components/BackButton";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
} from "./styles";

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    console.log("fui chamado");
  }

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected);
  }
  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo
            source={{
              uri: "https://avatars.githubusercontent.com/u/32397288?s=400&u=3686e0d65c8f2e21c3e4fee1e22108d52f7712d7&v=4",
            }}
          />

          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <Options>
          <Option
            active={option === "dataEdit"}
            onPress={() => handleOptionChange("dataEdit")}
          >
            <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
          </Option>

          <Option
            active={option === "passwordEdit"}
            onPress={() => handleOptionChange("passwordEdit")}
          >
            <OptionTitle active={option === "passwordEdit"}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
}
