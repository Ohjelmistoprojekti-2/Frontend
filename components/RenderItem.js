import React, { useState } from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import * as Colorthemes from "./styles";

const colorthemes = Colorthemes.colorthemes;

export default function RenderItem({ item, yestags, notags, locations }) {
<<<<<<< HEAD
  const [naytetaan, setNaytetaan] = useState(false); // oletusarvo: itemiä ei näytetä
=======
  const [naytetaan, setNaytetaan] = useState(true); // oletusarvo: itemiä ei näytetä
>>>>>>> cc111718514a6d895e7dc4b5376efa9277f9c49d

  // todo: tarkista, onko itemin location jokin valituista locations-arrayssa

  //    jos on: itemin näytetään-status true

  // todo: tarkista, onko itemin tekstissä jotain yestags-arrayn tageja

  //    jos on: itemin näytetään-status true, muuten false

  // todo: tarkista, onko itemin tekstissä jotain notags-arrayn tageja

  //    jos on: itemin näytetään-status false

  // lopulliseen renderöintiin päätyvät itemit:
  //// -location täsmää
  //// -yestags-tageista jokin tai useampi löytyy tekstistä
  //// - tekstistä ei löydy yhtään notags-tagia

<<<<<<< HEAD

  // jos item on selvinnyt seulasta
  return (
    <View style={[colorthemes.resultStyles.items, { display: naytetaan ? 'block' : 'none' }]}>
=======
  // jos item on selvinnyt seulasta
  return (
    <View
      style={[
        colorthemes.resultStyles.items,
        { display: naytetaan ? "block" : "none" },
      ]}
    >
>>>>>>> cc111718514a6d895e7dc4b5376efa9277f9c49d
      <Text style={colorthemes.resultStyles.job}>{item._values.header}</Text>
      <Text style={colorthemes.resultStyles.coname}>
        {item._values.company}
      </Text>
      <TouchableOpacity
        styles={colorthemes.resultStyles.button}
        onPress={() => Linking.openURL(`${item._values.url}`)}
      >
        <Text style={colorthemes.resultStyles.buttonText}>See more</Text>
      </TouchableOpacity>
    </View>
  );
<<<<<<< HEAD

=======
>>>>>>> cc111718514a6d895e7dc4b5376efa9277f9c49d
}
