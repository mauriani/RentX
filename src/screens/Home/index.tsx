import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { CarDTO } from "../../dtos/CarDTO";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import api from "../../services/api";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CardList,
} from "./styles";

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
    let isMounted = true;
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    // essa e a nossa função de retorno
    return () => {
      isMounted = false;
    };
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

          {!loading ? (
            <TotalCars>Total de {cars.length} carros</TotalCars>
          ) : null}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CardList
          data={cars}
          renderItem={({ item }: { item: CarDTO }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
          keyExtractor={(item: CarDTO) => item.id}
        />
      )}
    </Container>
  );
}
