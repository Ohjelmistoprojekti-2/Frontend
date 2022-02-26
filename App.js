// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './components/Home';
import Results from "./components/Results";
import React from "react";

//TÄMÄ LIITTYY NAVIGOINTIIN
// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Home />
  );
}

//TÄMÄ LIITTYY NAVIGOINTIIN, TULEE RETURNIIN
{/* <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='Results' component={Results} />
  </Stack.Navigator>
</NavigationContainer> */}