import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

// PanGestureHandler indentifica quando o usuário arrastou o button
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

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
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  // visualiza para onde o usuário está arrastando o meu botão
  const onGestureEvent = useAnimatedGestureHandler({
    // quando o usuário pressiona o elemento e começa a arrastar
    onStart(_, context: any) {
      // pega a posição do meu elemento
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    // enquanto o usuário está arrastando meu elemento pela tela
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },

    // quando o usuário terminou e soltou
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const [loading, setLoading] = useState(true);

  const [cars, setCars] = useState<CarDTO[]>([]);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CardDetails", {
      car,
    });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
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

  // não permite que possamos voltar para a tela de splash (Funciona apenas no android)
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="car-sport-outline"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
