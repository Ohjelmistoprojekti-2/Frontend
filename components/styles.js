import React from "react";
import { StyleSheet } from "react-native";
// TÄNNE VOI TARVITTAESSA LUODA TYYLEJÄ

const orangepurple = {
  colors: {
    primary: "#4e598c",
    secondary: "#f9c784",
    background: "#f2f2f2",
    card: "#ff8c42",
    accent: "#ff8c42",
    text: "#000",
    lighttext: "#fff",
    dullnavtext: "#8e97c1",
  },
};

// kaikki Home.js muotoilut
const homeStyles = StyleSheet.create({
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
    backgroundColor: orangepurple.colors.secondary,
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
  buttonContainer: {
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    fontWeight: "bold",
  },
  buttonView: {
    marginVertical: 10,
  },
});

// kaikki results.js muotoilut
const resultStyles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#8e97c1",
    marginLeft: "10%",
  },
  header: {
    marginBottom: 40,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  items: {
    margin: 20,
  },
  job: {
    fontSize: 20,
    fontWeight: "bold",
  },
  coname: {
    marginBottom: 10,
    fontSize: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: orangepurple.colors.accent,
  },
});

export const colorthemes = {
  orangepurple,
  homeStyles,
  resultStyles,
};
