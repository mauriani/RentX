import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { CardDetails } from "../screens/CardDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";

import { CarDTO } from "../dtos/CarDTO";

// parametros que minha rota recebe

export type RootStackParamList = {
  Home: undefined;
  CardDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: Object[] };
  Confirmation: { title: string; message: string; nextScreenRoute: string };
  MyCars: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen name="Home" component={Home} />
      <Screen name="CardDetails" component={CardDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
