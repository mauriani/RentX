import React, { useState, useRef } from "react";
import { FlatList, ViewToken } from "react-native";

import { Bullet } from "../Bullet";

import { Container, ImageIndexes, CardImageWrapper, CarImage } from "./styles";

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImagesSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageindex] = useState(0);
  const indexChanged = useRef((info: ChangeImageProps) => {
    // ponto de ! dizendo que não vai ser nulo
    const index = info.viewableItems[0].index!;
    setImageindex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet key={String(item.id)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CardImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
