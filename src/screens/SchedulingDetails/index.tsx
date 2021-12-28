import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { Accessory } from "../../components/Accessory";
import { RFValue } from "react-native-responsive-fontsize";

import Feather from "react-native-vector-icons/Feather";

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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";

import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";
import { MarkedDatesProps } from "../../components/Calendar";
import { getPlatformDate } from "../../utils/getPlatformDate";

interface Params {
  car: CarDTO;
  dates: MarkedDatesProps;
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car, dates } = route.params as Params;
  const rentTotal = Number(Object.keys(dates).length * car.rent.price);

  function handleSchedulingComplete() {
    navigation.navigate("SchedulingComplete");
  }

  useEffect(() => {
    const firstDate = Object.keys(dates)[0];
    const endDate = Object.keys(dates)[Object.keys(dates).length - 1];

    setRentalPeriod({
      start: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
      end: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
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
          {car.accessories.map((acessory) => (
            <Accessory
              key={acessory.type}
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${
              Object.keys(dates).length
            } diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title={"Alugar agora"}
          color={theme.colors.success}
          onPress={handleSchedulingComplete}
        />
      </Footer>
    </Container>
  );
}
