import React from "react";
import { Accessory } from "../../components/Accessory";

import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImagesSlider";

import speedSvg from "../../assets/speed.svg";
import accelerationvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

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
  Acessories,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";

export function SchedulingDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CardImages>
        <ImagesSlider
          imagesUrl={[
            "https://www.pikpng.com/pngl/b/391-3910364_2018-audi-rs-5-coupe-audi-a8-coup.png",
          ]}
        />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Accessory name={"380km/h"} icon={speedSvg} />
          <Accessory name={"3.2s"} icon={accelerationvg} />
          <Accessory name={"800 HP"} icon={forceSvg} />

          <Accessory name={"Gasolina"} icon={gasolineSvg} />
          <Accessory name={"Auto"} icon={exchangeSvg} />
          <Accessory name={"2 pessoas"} icon={peopleSvg} />
        </Acessories>

        <Footer>
          <Button title={"Escolher período do aluguel"} color="green" />
        </Footer>
      </Content>
    </Container>
  );
}
