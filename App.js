import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Results from "./components/Results";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image, View, Text } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import * as Colorthemes from "./components/styles";
import 'dotenv/config'

//liittyy .env tiedoston käyttöön
require('dotenv').config()

//TÄMÄ LIITTYY NAVIGOINTIIN
const Tab = createBottomTabNavigator();

export default function App() {
  const colorthemes = Colorthemes.colorthemes;

  // määrittele tässä teeman väri
  const [colorscheme, setColorscheme] = useState(
    colorthemes.orangepurple.colors
  );

    // listan sisältömuuttuja
    const [jobs, setJobs] = useState([]);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    dark: false,
    colors: colorscheme,
  };

  // fetchfunktio results-komponentille  https://tyonhakuappi.herokuapp.com/api/tyopaikat    process.env.SECRET_API_KEY
  const fetchJobs = () => {
    fetch("http://127.0.0.1:5000/api/tyopaikat",{
      method: 'GET',
      headers: {
        'API-KEY':'6cc1d83f-0e10-4906-a5e1-1f6016f093bc'
      }
    })
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((err) => {
        console.log(err);
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
        <Text style={{ color: colorscheme.lighttext, fontSize: 25 }}>
          <Ionicons
            name="leaf-outline"
            onPress={() => setColorscheme(colorthemes.browngreen.colors)}
            style={{ marginHorizontal: 5 }}
            size={30}
          />
          <Ionicons
            name="cafe-outline"
            onPress={() => setColorscheme(colorthemes.orangepurple.colors)}
            style={{ marginHorizontal: 5 }}
            size={30}
          />
          <Ionicons
            name="happy-outline"
            onPress={() => setColorscheme(colorthemes.yellowblue.colors)}
            style={{ marginHorizontal: 5 }}
            size={30}
          />
          <Ionicons
            name="bug-outline"
            onPress={() => setColorscheme(colorthemes.redgreen.colors)}
            style={{ marginHorizontal: 5 }}
            size={30}
          />
          <Ionicons
            name="fitness-outline"
            onPress={() => setColorscheme(colorthemes.coralgrey.colors)}
            style={{ marginHorizontal: 5 }}
            size={30}
          />
        </Text>
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

  // tilamuuttujat joita home.js:ssä muokataan
  const [yesword, setYesword] = useState(""); // kyllä-tagin muistipaikka
  const [noword, setNoword] = useState(""); // ei-tagin muistipaikka
  const [location, setLocation] = useState(""); //sijainnin muistipaikka

  const [yestags, setYestags] = useState([]); // kaikki kyllä-tagit
  const [notags, setNotags] = useState([]); // kaikki ei-tagit
  const [locations, setLocations] = useState([]); // halutut sijainnit

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
                funktiot={{ lisaatagi: lisaatagi, poistatagi: poistatagi }}
                muuttujat={{
                  yesmuuttujat: [yesword, setYesword],
                  nomuuttujat: [noword, setNoword],
                  locationmuuttujat: [location, setLocation],
                  yesarray: [yestags, setYestags],
                  noarray: [notags, setNotags],
                  locationsarray: [locations, setLocations],
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
            children={() => (
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
                  jobsmuuttujat: [jobs, setJobs]
                }}
              />
            )}
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
