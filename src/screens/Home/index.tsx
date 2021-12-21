import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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

import { CarDTO } from "../../dtos/CarDTO";

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import api from "../../services/api";

export function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [cars, setCars] = useState<CarDTO[]>([]);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CardDetails", {
      car,
    });
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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

      {loading ? (
        <Load />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item: CarDTO) => item.id}
          renderItem={({ item }: { item: CarDTO }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
