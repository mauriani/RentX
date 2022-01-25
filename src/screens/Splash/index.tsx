import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import { Container } from "./styles";

export function Splash() {
  const navigation = useNavigation();
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 50], // fases da minha animação
        [1, 0] // níveis de opacity
      ),
      transform: [
        //
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateY: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("SignIn");
  }

  // Altera o valor quando a tela é carregada,
  // splash efeito gradual. Vá até o n° 50 em uma duaração de 1s.
  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 1000,
      },
      () => {
        // joga para a tried "principal"
        "worklet";
        runOnJS(startApp)();
      }
    );
  });

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg height={50} width={80} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg height={20} width={180} />
      </Animated.View>
    </Container>
  );
}
