import React, { useEffect, useState } from "react";
import { StatusBar, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";

import Logo from "../../assets/logo.svg";
import { Car as ModelCar } from "../../database/model/Car";
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
  const netInfo = useNetInfo();

  const [loading, setLoading] = useState(true);

  const [cars, setCars] = useState<ModelCar[]>([]);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CardDetails", {
      car,
    });
  }
  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = response.data;
        console.log("### changes", changes);
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("/users/sync", user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>("cars");

        const cars = await carCollection.query().fetch();

        console.log(cars);

        if (isMounted) {
          setCars(cars);
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
      <Button title="Sincronizar" onPress={() => offlineSynchronize()} />

      {loading ? (
        <LoadAnimation />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
