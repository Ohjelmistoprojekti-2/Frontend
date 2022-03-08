// TÄNNE RAKENNETAAN ALUSTAVA NÄKYMÄ, JOSSA TEHDÄÄN VALINNAT
import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import Radiobutton from "./Radiobutton";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({ route, navigation, theme }) {
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
    tagbutton: {
      padding: 0,
      fontSize: 12,
      borderRadius: 15,
      backgroundColor: theme.colors.secondary,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
      flexDirection: "row",
      padding: 5,
    },
    form: {
      padding: "2%",
    },
    center: {
      display: "flex",
      fontSize: 15,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 8,
    },
    icon: { marginHorizontal: 5 },
  });
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

  function Tags(props) {
    return props.data.map((tag, index) => {
      if (tag != null) {
        return (
          <TouchableOpacity
            style={styles.tagbutton}
            key={index}
            onPress={() => {
              props.fun(index);
            }}
          >
            <Text style={styles.center}>{tag}</Text>
            <Ionicons
              name="close-outline"
              size={20}
              style={styles.icon}
              color={theme.colors.lighttext}
            />
          </TouchableOpacity>
        );
      }
    });
  }

  useEffect(() => {
    //alert("muuttui!!!");
  }, [yestags]);

  const lisaatagi = () => {
    if (yesword == "") {
      return;
    }
    setYestags((yestags) => [...yestags, yesword]);
    setYesword("");
  };

  const lisaaeitagi = () => {
    if (noword == "") {
      return;
    }
    setNotags((notags) => [...notags, noword]);
    setNoword("");
  };

  const poistatagi = (index) => {
    if (index !== -1) {
      setYestags((yestags) => yestags.filter((_, i) => i !== index));
    }
  };

  const poistaeitagi = (index) => {
    if (index !== -1) {
      setNotags((notags) => notags.filter((_, i) => i !== index));
    }
  };

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
          onSubmitEditing={lisaatagi}
        ></TextInput>
        <Ionicons
          name="add-circle"
          size={40}
          color={theme.colors.card}
          onPress={lisaatagi}
        />
      </View>
      <View style={styles.horizontal}>
        <Tags data={yestags} fun={poistatagi} />
      </View>
      <Text style={styles.paragraph}>Exclude jobs that contain keywords:</Text>
      <View style={styles.horizontalform}>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setNoword(text)}
          value={noword}
          label="Keyword..."
          style={styles.fill}
          returnKeyType="done"
          onSubmitEditing={lisaaeitagi}
        ></TextInput>
        <Ionicons
          name="add-circle"
          size={40}
          color={theme.colors.card}
          onPress={lisaaeitagi}
        />
      </View>
      <View style={styles.horizontal}>
        <Tags data={notags} fun={poistaeitagi} />
      </View>
    </View>
  );
}
