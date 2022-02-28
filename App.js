import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Results from "./components/Results";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image, View, Text } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import * as Colorthemes from "./components/styles";

//TÄMÄ LIITTYY NAVIGOINTIIN
const Tab = createBottomTabNavigator();

export default function App() {
  const colorthemes = Colorthemes.colorthemes;

  // määrittele tässä teeman väri
  const [colorscheme, setColorscheme] = useState(
    colorthemes.orangepurple.colors
  );

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    dark: false,
    colors: colorscheme,
  };

  function LogoTitle() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          color: colorscheme.lighttext,
        }}
      >
        <Image
          style={{ height: 50 + "%", width: 40 }}
          source={require("./assets/duuniapp.svg")}
        />
        <Text
          style={{ color: colorscheme.lighttext, fontSize: 25, marginLeft: 10 }}
        >
          DuuniApp
        </Text>
      </View>
    );
  }

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
            },
            tabBarLabelStyle: {
              fontSize: 18,
              marginTop: 0,
            },
            tabBarItemStyle: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: "Options",
              headerTitle: (props) => <LogoTitle {...props} />,
              headerStyle: {
                backgroundColor: colorscheme.primary,
                alignItems: "center",
              },
              headerTitleStyle: { fontSize: 25, color: colorscheme.lighttext },
            }}
          />
          <Tab.Screen
            name="Results"
            component={Results}
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
