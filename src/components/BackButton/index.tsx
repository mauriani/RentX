import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BorderlessButtonProps } from "react-native-gesture-handler";

import { useTheme } from "styled-components";

import { Container } from "./styles";

interface Props extends BorderlessButtonProps {
  color?: string;
  onPress: () => void;
}

export function BackButton({ onPress, color, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container {...rest} onPress={onPress}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
