import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { StatusBar } from "react-native";

import Logo from "../../assets/logo.svg";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CardList,
} from "./styles";
import { Car } from "../../components/Car";

const CardData = {
  brand: "Audi ",
  name: "RS 5 Coupé",
  rent: {
    period: "Ao dia",
    price: 120,
  },
  thumbnail:
    "https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png",
};

export function Home() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CardList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <Car data={CardData} />}
      />
    </Container>
  );
}
