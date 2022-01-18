import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
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
import { getPlatformDate } from "../../utils/getPlatformDate";
import api from "../../services/api";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [loading, serLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car, dates } = route.params as Params;
  const rentTotal = Number(Object.keys(dates).length * car.rent.price);

  async function handleConfirmRental() {
    try {
      serLoading(true);
      const schedulesByCar = await api.get(`schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post("schedules_byuser", {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          "dd/MM/yyyy"
        ),
      });

      api
        .put(`schedules_bycars/${car.id}`, {
          id: car.id,
          unavailable_dates: unavailable_dates,
        })
        .then((response) => {
          navigation.navigate("Confirmation", {
            title: "Conta criada!",
            message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar oo seu automóvel`,
            nextScreenRoute: "Home",
          });
        })
        .catch((err) => {
          Alert.alert("Não foi possível confirmar o agendamento.");
          serLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleBack() {
    navigation.goBack();
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
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
