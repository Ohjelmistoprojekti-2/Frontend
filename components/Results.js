//TÄNNE LISTATAAN HAKUTULOKSET TYÖPAIKOISTA
// NÄKYMÄSSÄ TÄLLÄ HETKELLÄ KAIKKI JOBS.JSONISSA OLEVAT TYÖPAIKKATIEDOT
// EI YHDISTETTY HOME KOPMPONENTTIIN
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";
import * as Colorthemes from "./styles";

// "Data" voi olla mikään vaan itsenimetty, jolla vitataan json-tiedostoon
// import Data from "./jobs.json";

export default function Results({ route, navigation, props, theme }) {
  const colorthemes = Colorthemes.colorthemes;
  // const jobs = Data;
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // listSeparator komponentti eriyttää esitetyt duunipaikat näkymässä
  const listSeparator = () => {
    return (
      <View
        style={colorthemes.resultStyles.separator}
      />
    );
  };

  // jos haettu lista sattuisi olemaan tyhjä, rendröidään tämä komponentti
  const jobListEmpty = () => {
    return (
      <View>
        <Text style={colorthemes.resultStyles.header}>No data found</Text>
      </View>
    );
  };

  // header propsi
  const jobListHeader = () => {
    return (
      <Text
        style={colorthemes.resultStyles.header}
      >Your results</Text>
    );
  };

  const renderItem = ({ item }) => (
    <View style={colorthemes.resultStyles.items}>
      <Text style={colorthemes.resultStyles.job}>
        {item._values.header}
      </Text>
      <Text style={colorthemes.resultStyles.coname}>
        {item._values.company}
      </Text>
      <TouchableOpacity
        styles={colorthemes.resultStyles.button}
        onPress={() => Linking.openURL(`${item._values.url}`)}>
        <Text
          style={colorthemes.resultStyles.buttonText}
        >See more
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={colorthemes.resultStyles.container}>
      <FlatList
        data={jobs}
        ItemSeparatorComponent={listSeparator}
        ListEmptyComponent={jobListEmpty}
        ListHeaderComponent={jobListHeader}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      />
    </View>
  );
}


