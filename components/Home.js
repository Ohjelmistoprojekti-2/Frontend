// TÄNNE RAKENNETAAN ALUSTAVA NÄKYMÄ, JOSSA TEHDÄÄN VALINNAT
import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import Radiobutton from "./Radiobutton";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({
  route,
  navigation,
  theme,
  funktiot,
  muuttujat,
  tyopaikat,
}) {
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

  // funktiot ja muuttujat app.js:stä propsina
  const lisaatagi = funktiot.lisaatagi;
  const poistatagi = funktiot.poistatagi;

  const tyopaikkaarray = muuttujat.tyopaikat;

  const [yesword, setYesword] = muuttujat.yesmuuttujat; // kyllä-tagin muistipaikka
  const [noword, setNoword] = muuttujat.nomuuttujat; // ei-tagin muistipaikka
  const [location, setLocation] = muuttujat.locationmuuttujat; //sijainnin muistipaikka

  const [yestags, setYestags] = muuttujat.yesarray; // kaikki kyllä-tagit
  const [notags, setNotags] = muuttujat.noarray; // kaikki ei-tagit
  const [locations, setLocations] = muuttujat.locationsarray; // halutut sijainnit

  const [userOptions, setUserOptions] = muuttujat.valintamuuttujat;

  function Tags(props) {
    return props.data.map((tag, index) => {
      if (tag != null) {
        return (
          <TouchableOpacity
            style={styles.tagbutton}
            key={index}
            onPress={() => {
              poistatagi(index, props.setLitania);
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

  return (
    <View style={styles.form}>
      <Text style={styles.paragraph}>Show jobs from selected companies:</Text>
      <Radiobutton
        tyopaikat={tyopaikkaarray}
        styles={styles}
        valintamuuttujat={[userOptions, setUserOptions]}
      />
      <Text style={styles.paragraph}>
        Show only jobs that contain keywords:
      </Text>
      <View style={styles.horizontalform}>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setYesword(text)}
          value={yesword}
          label="Including keyword..."
          style={styles.fill}
          returnKeyType="done"
          onSubmitEditing={() => lisaatagi(yesword, setYesword, setYestags)}
        ></TextInput>
        <Ionicons
          name="add-circle"
          size={40}
          color={theme.colors.card}
          onPress={() => lisaatagi(yesword, setYesword, setYestags)}
        />
      </View>
      <View style={styles.horizontal}>
        <Tags data={yestags} setLitania={setYestags} />
      </View>
      <Text style={styles.paragraph}>Exclude jobs that contain keywords:</Text>
      <View style={styles.horizontalform}>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setNoword(text)}
          value={noword}
          label="Excluding keyword..."
          style={styles.fill}
          returnKeyType="done"
          onSubmitEditing={() => lisaatagi(noword, setNoword, setNotags)}
        ></TextInput>
        <Ionicons
          name="add-circle"
          size={40}
          color={theme.colors.card}
          onPress={() => lisaatagi(noword, setNoword, setNotags)}
        />
      </View>
      <View style={styles.horizontal}>
        <Tags data={notags} setLitania={setNotags} />
      </View>

      <Text style={styles.paragraph}>Show only jobs from location(s):</Text>
      <View style={styles.horizontalform}>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setLocation(text)}
          value={location}
          label="Location..."
          style={styles.fill}
          returnKeyType="done"
          onSubmitEditing={() => lisaatagi(location, setLocation, setLocations)}
        ></TextInput>
        <Ionicons
          name="add-circle"
          size={40}
          color={theme.colors.card}
          onPress={() => lisaatagi(location, setLocation, setLocations)}
        />
      </View>
      <View style={styles.horizontal}>
        <Tags data={locations} setLitania={setLocations} />
      </View>
    </View>
  );
}
