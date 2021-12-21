import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Accessory } from "../../components/Accessory";

import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImagesSlider";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Container,
  Header,
  CardImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";

interface Params {
  car: CarDTO;
}

export function CardDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate("Scheduling");
  }
  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CardImages>
        <ImagesSlider imagesUrl={car.photos} />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((item) => (
            <Accessory
              key={item.name}
              name={item.name}
              icon={getAccessoryIcon(item.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>

        <Footer>
          <Button
            title={"Escolher período do aluguel"}
            onPress={handleConfirmRental}
          />
        </Footer>
      </Content>
    </Container>
  );
}
