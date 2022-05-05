import React from "react";
import { View, Text, Pressable } from "react-native";
import { colorthemes } from "./styles";

export default function CustomButton({
  bgcolor,
  fontcolor = "#fff",
  onPress,
  text,
  outlined = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        colorthemes.homeStyles.buttonContainer,
        bgcolor ? { backgroundColor: bgcolor } : {},
        outlined === true ? { borderWidth: 1 } : {},
        fontcolor && outlined === true ? { borderColor: fontcolor } : {},
      ]}
    >
      <Text
        style={[
          colorthemes.homeStyles.buttonText,
          fontcolor ? { color: fontcolor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}
