import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Results from "./components/Results";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image, View, Text } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import * as Colorthemes from "./components/styles";
import ReactLoading from "react-loading";
import {
  coJobs,
  yesTags,
  noTags,
  jobLocations,
} from "./components/filterFunctions";

// tämä liittyy navigointiin
const Tab = createBottomTabNavigator();

export default function App() {
  const colorthemes = Colorthemes.colorthemes;

  // määrittele tässä teeman väri
  const [colorscheme, setColorscheme] = useState(
    colorthemes.orangepurple.colors
  );

  const [originaljobs, setOriginaljobs] = useState([]);
  // listan sisältömuuttuja
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  // yritysten nimet checkboxissa
  const tyopaikat = ["Reaktor", "Visma", "Futurice", "Siili Solutions"];

  // tilamuuttujat joita home.js:ssä muokataan
  const [yesword, setYesword] = useState(""); // kyllä-tagin muistipaikka
  const [noword, setNoword] = useState(""); // ei-tagin muistipaikka
  const [location, setLocation] = useState(""); //sijainnin muistipaikka

  const [yestags, setYestags] = useState([]); // kaikki kyllä-tagit
  const [notags, setNotags] = useState([]); // kaikki ei-tagit
  const [locations, setLocations] = useState([]); // halutut sijainnit

  const [userOptions, setUserOptions] = useState(tyopaikat); // valitut työpaikat

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    dark: false,
    colors: colorscheme,
  };

  const fetchJobs = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
      method: "GET",
      headers: {
        "API-KEY": `${process.env.REACT_APP_BACKEND_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setOriginaljobs(data);
        setLoading(false);
        console.log(`${process.env.REACT_APP_BACKEND_URL}`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // yläpalkin ulkomuoto
  function LogoTitle() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          color: colorscheme.lighttext,
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 30, width: 40 }}
          source={require("./assets/duuniapp.svg")}
        />
        <Text
          style={{ color: colorscheme.lighttext, fontSize: 25, marginLeft: 10 }}
        >
          DuuniApp
        </Text>
        <Text style={{ color: colorscheme.lighttext, fontSize: 25 }}></Text>
      </View>
    );
  }

  const lisaatagi = (muistipaikka, setMuistipaikka, setLitania) => {
    if (muistipaikka == "") {
      return;
    }
    setLitania((litania) => [...litania, muistipaikka]);
    setMuistipaikka("");
  };

  const poistatagi = (index, setLitania) => {
    if (index !== -1) {
      setLitania((litania) => litania.filter((_, i) => i !== index));
    }
  };

  const tyhjennaKaikki = () => {
    setLocations([]);
    setNotags([]);
    setYestags([]);
    setUserOptions(tyopaikat);
  };

  // työpaikkojen filtteröinti:
  useEffect(() => {
    const filtered1 = coJobs(originaljobs, userOptions);
    setJobs(filtered1);
    const filtered2 = yesTags(filtered1, yestags);
    setJobs(filtered2);
    const filtered3 = noTags(filtered2, notags);
    setJobs(filtered3);
    const filtered4 = jobLocations(filtered3, locations);
    setJobs(filtered4);
    // filtteröityjen lkm consoleen, saa poistaa
    console.log("Filtered: " + filtered4.length + "kpl");
  }, [userOptions, yestags, notags, locations]);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "ios-options-outline";
              } else if (route.name === "Results") {
                iconName = "ios-list";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colorscheme.secondary,
            tabBarInactiveTintColor: colorscheme.dullnavtext,
            tabBarStyle: {
              backgroundColor: colorscheme.primary,
              margin: 0,
              padding: 0,
            },
            tabBarLabelStyle: {
              fontSize: 16,
              marginLeft: 15,
            },
            tabBarItemStyle: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              margin: 0,
            },
            tabBarLabelPosition: "beside-icon",
          })}
        >
          <Tab.Screen
            name="Home"
            children={() => (
              <Home
                theme={theme}
                funktiot={{
                  lisaatagi: lisaatagi,
                  poistatagi: poistatagi,
                  tyhjennaKaikki: tyhjennaKaikki,
                }}
                muuttujat={{
                  yesmuuttujat: [yesword, setYesword],
                  nomuuttujat: [noword, setNoword],
                  locationmuuttujat: [location, setLocation],
                  yesarray: [yestags, setYestags],
                  noarray: [notags, setNotags],
                  locationsarray: [locations, setLocations],
                  valintamuuttujat: [userOptions, setUserOptions],
                  tyopaikat: tyopaikat,
                }}
              />
            )}
            options={{
              title: "Options",
              headerTitle: (props) => <LogoTitle {...props} />,
              headerStyle: {
                backgroundColor: colorscheme.primary,
              },
              headerTitleStyle: { fontSize: 25, color: colorscheme.lighttext },
            }}
          />
          <Tab.Screen
            name="Results"
            children={() => {
              if (loading === false) {
                return (
                  <Results
                    theme={theme}
                    fetchJobs={fetchJobs}
                    funktiot={{ lisaatagi: lisaatagi, poistatagi: poistatagi }}
                    muuttujat={{
                      yesmuuttujat: [yesword, setYesword],
                      nomuuttujat: [noword, setNoword],
                      locationmuuttujat: [location, setLocation],
                      yesarray: [yestags, setYestags],
                      noarray: [notags, setNotags],
                      locationsarray: [locations, setLocations],
                      jobsmuuttujat: [jobs, setJobs],
                      valintamuuttujat: [userOptions, setUserOptions],
                    }}
                  />
                );
              } else {
                return (
                  <View
                    style={{ alignItems: "center", margin: 20 }}
                    testID="loading"
                  >
                    <ReactLoading
                      type="spinningBubbles"
                      color={colorscheme.secondary}
                      height={50}
                      width={50}
                    />
                  </View>
                );
              }
            }}
            options={{
              title: "Job results",
              headerTitle: (props) => <LogoTitle {...props} />,
              headerStyle: {
                backgroundColor: colorscheme.primary,
              },
              headerTitleStyle: { fontSize: 25, color: colorscheme.lighttext },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// .join(", ")
//   .toLowerCase()
//   .split(", ")
//   .includes(tag.toLowerCase());
