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
  orangepurple,
  resultStyles,
};
