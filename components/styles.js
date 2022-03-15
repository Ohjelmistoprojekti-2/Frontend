import { StyleSheet } from "react-native";
// TÄNNE VOI TARVITTAESSA LUODA TYYLEJÄ

const browngreen = {
  colors: {
    primary: "#2c6e49",
    secondary: "#ffc9b9",
    background: "#f2f2f2",
    card: "#4c956c",
    accent: "#d68c45",
    text: "#000",
    lighttext: "#fefee3",
    dullnavtext: "#72ac8b",
  },
};

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

const yellowblue = {
  colors: {
    primary: "#11296b",
    secondary: "#ffdb57",
    background: "#ededed",
    card: "#ffcb05",
    accent: "#00509d",
    text: "#000",
    lighttext: "#fff",
    dullnavtext: "#ededed",
  },
};

const redgreen = {
  colors: {
    primary: "#386641",
    secondary: "#a7c957",
    background: "#ededed",
    card: "#bc4749",
    accent: "#a7c957",
    text: "#000",
    lighttext: "#fff",
    dullnavtext: "#6a994e",
  },
};

const coralgrey = {
  colors: {
    primary: "#102542",
    secondary: "#f87060",
    background: "#ededed",
    card: "#102542",
    accent: "#b3a394",
    text: "#000",
    lighttext: "#fff",
    dullnavtext: "#cdd7d6",
  },
};

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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "blue",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 21,
    color: "#ff8c42",
    textDecorationLine: "underline",
  },
});

export const colorthemes = {
  browngreen,
  orangepurple,
  yellowblue,
  redgreen,
  coralgrey,
  resultStyles,
};
