//TÄNNE LISTATAAN HAKUTULOKSET TYÖPAIKOISTA
// NÄKYMÄSSÄ TÄLLÄ HETKELLÄ KAIKKI JOBS.JSONISSA OLEVAT TYÖPAIKKATIEDOT
// EI YHDISTETTY HOME KOPMPONENTTIIN
import { Text, View, StyleSheet } from "react-native";
import Data from "./jobs.json";

export default function Results({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text>Results: </Text>
      {Data &&
        Data.map((item) => {
          return (
            <View style={styles.info} key={item.id}>
              <Text>{item.header}</Text>
              <Text>{item.company}</Text>
              <Text>{item.url}</Text>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
