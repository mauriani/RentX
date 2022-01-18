import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { CardDetails } from "../screens/CardDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";

import { CarDTO } from "../dtos/CarDTO";

export type RootStackParamList = {
  Home: undefined;
  CardDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: Object[] };
  SchedulingComplete: undefined;
  MyCars: undefined;
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="Splash"
        component={Splash}
        options={{
          gestureEnabled: false, // usuário do ios não volta para a tela anterior
        }}
      />
      <Screen name="Home" component={Home} />
      <Screen name="CardDetails" component={CardDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
    </Navigator>
  );
}
