// listanäkymä hakutuloksista
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import * as Colorthemes from "./styles";
import { ListItem, Icon, Avatar } from "react-native-elements";

export default function Results({
  route,
  navigation,
  theme,
  fetchJobs,
  funktiot,
  muuttujat,
}) {
  const colorthemes = Colorthemes.colorthemes;

  // muuttujat app.js:stä
  const [jobs, setJobs] = muuttujat.jobsmuuttujat; // filtteröity työpaikka-array
  const [yestags, setYestags] = muuttujat.yesarray; // kaikki kyllä-tagit
  const [notags, setNotags] = muuttujat.noarray; // kaikki ei-tagit
  const [locations, setLocations] = muuttujat.locationsarray; // halutut sijainnit
  const [userOptions, setUserOptions] = muuttujat.valintamuuttujat; // firman nimet

  // console.log(jobs);

  // listSeparator komponentti eriyttää esitetyt duunipaikat näkymässä
  // const listSeparator = () => {
  //   return <View style={colorthemes.resultStyles.separator} />;
  // };

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

  const renderItem = ({ item }) => {
    let others = 0;
    return (
      <ListItem bottomDivider testID="job">
        <ListItem.Content
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: '#f2f2f2'
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
            <View style={{ marginLeft: 30 }}>
              <ListItem.Title style={colorthemes.resultStyles.job}>
                {item._values.header}
              </ListItem.Title>
              <ListItem.Subtitle style={colorthemes.resultStyles.coname}>
                {item._values.company}
              </ListItem.Subtitle>
              {
                // jos valittuja locationseja on enemmän ku nolla
                locations.length > 0 ? (
                  <ListItem.Subtitle>
                    {
                      // jos työpaikan locationsit on arrayna
                      Array.isArray(item._values.location)
                        ? // mappaa object values ja filtteröi vaan ne jotka on valitussa arrayssa tai remote work
                          Object.values(item._values.location)
                            .filter((location, index) => {
                              if (
                                locations
                                  .join(", ")
                                  .toLowerCase()
                                  .split(", ")
                                  .indexOf(location.toLowerCase()) > -1 ||
                                location.toLowerCase() == "remote work"
                              ) {
                                return location;
                              } else {
                                others++;
                              }
                            })
                            .join(", ") // joinataan array pilkulla tulostusta varten
                        : // jos työpaikan locationsit on stringinä
                          item._values.location
                            .split(", ") // splittaa pilkusta ja filtteröi saatu array
                            .filter((location, index) => {
                              if (
                                locations
                                  .join(", ")
                                  .toLowerCase()
                                  .split(", ")
                                  .indexOf(location.toLowerCase()) > -1 ||
                                location.toLowerCase() == "remote work"
                              ) {
                                return location;
                              } else {
                                others++;
                              }
                            })
                            .join(", ")
                    }
                    {others == 1
                      ? " + " + others + " other"
                      : others > 0
                      ? " + " + others + " others"
                      : null}
                  </ListItem.Subtitle>
                ) : (
                  // jos valittuja locationseja ei ole olemassa, tulostetaan kaikki mitä työpaikalla on:
                  <ListItem.Subtitle>
                    {
                      // jos locationit on array, joinaa pilkulla ja jos ei niin palauta string sellasenaan
                      Array.isArray(item._values.location)
                        ? item._values.location.join(", ")
                        : item._values.location
                    }
                  </ListItem.Subtitle>
                )
              }
            </View>
          </View>
          <View>
            <View style={{ justifyContent: "flex-end" }}>
              <Icon
                type="material"
                color="#f9c784"
                name="info"
                size={50}
                onPress={() => Linking.openURL(`${item._values.url}`)}
              />
              <TouchableOpacity
                onPress={() => Linking.openURL(`${item._values.url}`)}
              >
                <Text>More info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <ScrollView style={colorthemes.resultStyles.container}>
      <FlatList
        data={jobs}
        // ItemSeparatorComponent={listSeparator}
        ListEmptyComponent={jobListEmpty}
        ListHeaderComponent={jobListHeader}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      />
    </ScrollView>
  );
}
