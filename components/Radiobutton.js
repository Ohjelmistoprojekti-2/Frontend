//TÄNNE RADIOBUTTONIN MUOTOILUT
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";

// PROPSINA HOME KOMPONENTISTA DATA ARRAYN VAIHTOEHDOT JA ONSELECT JOS KÄYTTÄJÄ TEKEE VALINNAN
export default function Radiobutton({ data }) {
  const [userOption, setUserOption] = useState([]);
  const [checked, setChecked] = useState(new Array(data.length).fill(false));

  // SELECTHANDLER AJAA ONSELECTIN SEKÄ CHECKAA + PÄIVITTÄÄ KÄYTTÄJÄN VALINNAN
  const selectHandler = (value, position) => {
    const updatedChecked = checked.map((item, index) =>
      index === position ? !item : item
    );

    setChecked(updatedChecked);

    if (userOption.indexOf(value) > -1) {
      let filtered = userOption.filter((item) => item !== value);
      setUserOption(filtered);
    } else {
      setUserOption((userOption) => [...userOption, value]);
    }
  };
  return (
    <View>
      {/* MAPATAAN VALINTAVAIHTOEHDOT LÄPI */}
      {data.map((item, index) => {
        return (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Checkbox
              value={item.value}
              // EHTO, JOSSA TARKASTETAAN, ONKO KÄYTTÄJÄN VALINTA SAMA KUIN JOKU BUTTONIN ARVOISTA
              status={checked[index] === true ? "checked" : "unchecked"}
              // ONPRESS AJAA SELECTHANDLER METODIN
              onPress={() => selectHandler(item.value, index)}
            />
            <Text>{item.value}</Text>
          </View>
        );
      })}
    </View>
  );
}
