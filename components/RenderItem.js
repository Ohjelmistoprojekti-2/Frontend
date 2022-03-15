import { View } from "react-native";
import * as Colorthemes from "./styles";

const colorthemes = Colorthemes.colorthemes;

export default function RenderItem({ item, yestags, notags, locations }) {
  // todo: tarkista, onko itemin location jokin valituista locations-arrayssa

  //// jos on: itemin näytetään-status true

  // todo: tarkista, onko itemin tekstissä jotain yestags-arrayn tageja

  //// jos on: itemin näytetään-status true, muuten false

  // todo: tarkista, onko itemin tekstissä jotain notags-arrayn tageja

  //// jos on: itemin näytetään-status false

  // lopulliseen renderöintiin päätyvät komponentit:
  //// -location täsmää
  //// -yestags-tageista jokin tai useampi löytyy tekstistä
  //// - tekstistä ei löydy yhtään notags-tagia
  return (
    <View style={colorthemes.resultStyles.items}>
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
}
