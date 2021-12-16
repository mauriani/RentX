import React from "react";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";

import { Home } from "./src/screens/Home";
import { CardDetails } from "./src/screens/CardDetails";
import { Scheduling } from "./src/screens/Scheduling";
import { SchedulingDetails } from "./src/screens/SchedulingDetails";
import { SchedulingComplete } from "./src/screens/SchedulingComplete";

import theme from "./src/styles/theme";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <SchedulingComplete />
      </ThemeProvider>
    );
  }
}
