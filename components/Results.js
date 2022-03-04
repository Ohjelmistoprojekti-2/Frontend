//TÄNNE LISTATAAN HAKUTULOKSET TYÖPAIKOISTA
// NÄKYMÄSSÄ TÄLLÄ HETKELLÄ KAIKKI JOBS.JSONISSA OLEVAT TYÖPAIKKATIEDOT
// EI YHDISTETTY HOME KOPMPONENTTIIN
import { Text, View, StyleSheet, FlatList, Linking, Button, Pressable } from "react-native";
// "Data" voi olla mikään vaan itsenimetty, jolla vitataan json-tiedostoon
import Data from "./jobs.json";

export default function Results({ route, navigation }) {
  const jobs = Data

  // listSeparator komponentti eriyttää esitetyt duunipaikat näkymässä
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  // jos haettu lista sattuisi olemaan tyhjä, rendröidään tämä komponentti
  const jobListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  // header propsi
  const jobListHeader = () => {
    return (
      <Text style={{ marginBottom: 20, fontSize: 30, textAlign: "center", fontWeight: 'bold', textDecorationLine: 'underline' }}>
        Your results
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        ItemSeparatorComponent={listSeparator}
        ListEmptyComponent={jobListEmpty}
        ListHeaderComponent={jobListHeader}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.header}</Text>
            <Text style={{ marginBottom: 10, fontSize: 20 }}>{item.company}</Text>
            <Pressable styles={styles.button} onPress={() => Linking.openURL(`${item.url}`)} >
              <Text style={{ fontSize: 16, fontWeight: 'bold', lineHeight: 21, color: '#6A5ACD', textDecorationLine: 'underline' }}>See more</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
});

