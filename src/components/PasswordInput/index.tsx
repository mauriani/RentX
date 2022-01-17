import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "styled-components";

import { Container, IconContainer, InputText } from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function PasswordInput({ iconName, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handlepasswordvisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const theme = useTheme();
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>

      <InputText {...rest} secureTextEntry={isPasswordVisible} />

      <BorderlessButton onPress={handlepasswordvisibilityChange}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
