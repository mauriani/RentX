import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { Confirmation } from "../screens/Confirmation";

// parametros que minha rota recebe

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: {
    user: { name: string; email: string; driverLicense: string };
  };
  SignUpSecondStep: {
    user: { name: string; email: string; driverLicense: string };
  };
  Confirmation: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen
        name="Splash"
        component={Splash}
        options={{
          gestureEnabled: false, // usuário do ios não volta para a tela anterior
        }}
      />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
