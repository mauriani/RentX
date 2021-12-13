import React from "react";

import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
}

export function Button({ title, color, ...rest }: Props) {
  return (
    <Container color={color as string} onPress={() => {}} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
