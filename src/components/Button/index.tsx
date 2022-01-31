import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
  onPress?: () => void;
  enabled?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <Container
      color={color as string}
      enabled={enabled}
      onPress={onPress}
      style={{ opacity: enabled == false || loading == true ? 0.5 : 1 }}
      {...rest}
    >
      <View>
        {loading ? (
          <ActivityIndicator color={theme.colors.shape} />
        ) : (
          <Title light={light}>{title}</Title>
        )}
      </View>
    </Container>
  );
}
