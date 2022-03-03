// TÄNNE RAKENNETAAN ALUSTAVA NÄKYMÄ, JOSSA TEHDÄÄN VALINNAT
import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import Radiobutton from "./Radiobutton";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({ route, navigation }) {
  console.log(route);
  // TÄHÄN DATAAN TULISI TYÖPAIKAN TIEDOT: HEADER, COMPANY,URL
  const data = [
    { value: "Tietoevry" },
    { value: "Reaktor" },
    { value: "Visma" },
    { value: "Futurice" },
    { value: "Siili Solutions" },
  ];

  const [yesword, setYesword] = useState(""); // kyllä-tagin muistipaikka
  const [noword, setNoword] = useState(""); // ei-tagin muistipaikka
  const [yestags, setYestags] = useState([]); // kaikki kyllä-tagit
  const [notags, setNotags] = useState([]); // kaikki ei-tagit

  return (
    <View style={styles.form}>
      <Text style={styles.paragraph}>Show jobs from selected companies:</Text>
      <Radiobutton data={data} styles={styles} />
      {/* //TÄTÄ SEURAAVAA EI EHKÄ TARVIS TÄSSÄ, KERTOO PAINALLUKSEN TULOKSEN */}

      {/* // TÄHÄN TULIS SUBMIT JOKA NAVIGOISI RESULTS KOMPONENTTIIN JOSSA NÄKYISI HAKUTULOKSET */}
      <Text style={styles.paragraph}>
        Show only jobs that contain keywords:
      </Text>
      <View style={styles.horizontalform}>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setYesword(text)}
          value={yesword}
          label="Keyword..."
          style={styles.fill}
          returnKeyType="done"
        ></TextInput>
        <Ionicons name="add-circle" size={40} color={route} />
      </View>
      <Text style={styles.paragraph}>Exclude jobs that contain keywords:</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  paragraph: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  horizontalform: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  fill: {
    flex: 1,
    padding: 0,
    marginHorizontal: "2%",
    lineHeight: 1,
  },
  form: {
    padding: "2%",
  },
});
