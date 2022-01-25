import * as React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeSvg from "../assets/home.svg";
import PeopleSvg from "../assets/people.svg";
import CarSvg from "../assets/car.svg";

import { MyCars } from "../screens/MyCars";

import { AppStackRoutes } from "./app.stack.routes";

// parametros que minha rota recebe

export type RootStackParamList = {
  Home: undefined;
  MyCars: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

export function AppTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // não aparece texto
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarStyle: {
          height: 70,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
