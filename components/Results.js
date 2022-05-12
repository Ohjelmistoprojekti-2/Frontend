// listanäkymä hakutuloksista
import React from "react";
import {
  Text,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as Colorthemes from "./styles";
import { ListItem, Icon, Avatar } from "react-native-elements";

export default function Results({ muuttujat }) {
  const colorthemes = Colorthemes.colorthemes;

  // muuttujat app.js:stä
  const [jobs, setJobs] = muuttujat.jobsmuuttujat; // filtteröity työpaikka-array
  const [locations, setLocations] = muuttujat.locationsarray; // halutut sijainnit

  const companyAvatars = {
    Reaktor: require("../assets/reaktor.png"),
    "Siili Solutions": require("../assets/siili.png"),
    Visma: require("../assets/visma.png"),
    Futurice: require("../assets/futurice.png"),
  };

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

  const renderItem = ({ item }) => {
    let others = 0;
    return (
      <ListItem bottomDivider>
        <ListItem.Content
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: '#f2f2f2'
          }}
          testID="job"
        >
          <View style={{ flexDirection: "row", maxWidth: "80%" }}>
            <View style={{ justifyContent: "center" }}>
              <Avatar
                rounded
                size="medium"
                source={companyAvatars[item._values.company]}
                imageProps={{
                  resizeMode: "contain",
                  borderWidth: 1,
                  borderColor: "#eee",
                }}
                avatarStyle={{ flex: 1 }}
              />
            </View>
            <View style={{ marginLeft: 10, maxWidth: "80%" }}>
              <ListItem.Title style={colorthemes.resultStyles.job}>
                {item._values.header.replace("→", "")}
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

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 0,
            }}
          >
            <Pressable
              onPress={() => Linking.openURL(`${item._values.url}`)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: colorthemes.orangepurple.colors.secondary,
                justifyContent: "center",
              }}
            >
              <Icon
                type="octicon"
                color="#fff"
                name="link-external"
                size={25}
              />
            </Pressable>
            <TouchableOpacity
              onPress={() => Linking.openURL(`${item._values.url}`)}
              style={{ alignItems: "center" }}
            >
              <Text>More info</Text>
            </TouchableOpacity>
          </View>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <FlatList
      data={jobs}
      // ItemSeparatorComponent={listSeparator}
      ListEmptyComponent={jobListEmpty}
      keyExtractor={(item, index) => index}
      renderItem={renderItem}
      testID="list"
    />
  );
}
