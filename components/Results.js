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
  ScrollView,
} from "react-native";
import * as Colorthemes from "./styles";
// import RenderItem from "./RenderItem";

// "Data" voi olla mikään vaan itsenimetty, jolla vitataan json-tiedostoon
// import Data from "./jobs.json";

export default function Results({
  route,
  navigation,
  theme,
  fetchJobs,
  funktiot,
  muuttujat,
}) {
  const colorthemes = Colorthemes.colorthemes;

  // dummydata-haamu:
  // const jobs = Data;

  // muuttujat app.js:stä
  const [jobs, setJobs] = muuttujat.jobsmuuttujat;
  const [yestags, setYestags] = muuttujat.yesarray; // kaikki kyllä-tagit
  const [notags, setNotags] = muuttujat.noarray; // kaikki ei-tagit
  const [locations, setLocations] = muuttujat.locationsarray; // halutut sijainnit

  // muunnetaan locationista kaikki array muotoon, tämä yritys myös app.js komponentissa
  // const locationsToArray =
  //   jobs.map(job => {
  //     if (typeof job._values.location === 'string') {
  //       return job._values.location.split(", ");
  //     } else {
  //       return job._values.location;
  //     };
  //   })

  // yritys filtteröidä locations results.js komponentissa
  // const getResult = (locations, jobs) => {
  //   return jobs.filter(function (obj) {
  //     return obj.Object.keys(_values).some(function (item) {
  //       return item.location.some(function (o) {
  //         return o.indexOf(locations) >= 0;
  //       })
  //     })
  //   })
  // }

  //console.log(jobs);

  // listSeparator komponentti eriyttää esitetyt duunipaikat näkymässä
  const listSeparator = () => {
    return <View style={colorthemes.resultStyles.separator} />;
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
    return <Text style={colorthemes.resultStyles.header}>Your results</Text>;
  };

  const renderItem = ({ item }) => (
    <View style={colorthemes.resultStyles.items}>
      <Text style={colorthemes.resultStyles.job}>{item._values.header}</Text>
      <Text style={colorthemes.resultStyles.coname}>
        {item._values.company}
      </Text>
      <Text style={colorthemes.resultStyles.coname}>
        {item._values.location}
      </Text>
      <TouchableOpacity
        styles={colorthemes.resultStyles.button}
        onPress={() => Linking.openURL(`${item._values.url}`)}
      >
        <Text style={colorthemes.resultStyles.buttonText}>See more</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={colorthemes.resultStyles.container}>
      <FlatList
        data={jobs}
        ItemSeparatorComponent={listSeparator}
        ListEmptyComponent={jobListEmpty}
        ListHeaderComponent={jobListHeader}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        // renderItem={({ item }) => (
        //   <RenderItem
        //     item={item}
        //     yestags={yestags}
        //     notags={notags}
        //     locations={locations}
        //   />
        // )}
      />
    </ScrollView>
  );
}
