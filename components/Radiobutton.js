//TÄNNE RADIOBUTTONIN MUOTOILUT
import React, { useState } from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";

// PROPSINA HOME KOMPONENTISTA DATA ARRAYN VAIHTOEHDOT JA ONSELECT JOS KÄYTTÄJÄ TEKEE VALINNAN
export default function Radiobutton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const [checked, setChecked] = React.useState(null);

  // SELECTHANDLER AJAA ONSELECTIN SEKÄ CHECKAA + PÄIVITTÄÄ KÄYTTÄJÄN VALINNAN
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
    setChecked(value);
  };
  return (
    <View>
      {/* MAPATAAN VALINTAVAIHTOEHDOT LÄPI */}
      {data.map((item) => {
        return (
          <View>
            <Text> {item.value}</Text>
            <RadioButton
              value={item.value}
              // EHTO, JOSSA TARKASTETAAN, ONKO KÄYTTÄJÄN VALINTA SAMA KUIN JOKU BUTTONIN ARVOISTA
              status={checked === `${item.value}` ? "checked" : "unchecked"}
              // ONPRESS AJAA SELECTHANDLER METODIN
              onPress={() => selectHandler(item.value)}
            />
          </View>
        );
      })}
    </View>
  );
}
