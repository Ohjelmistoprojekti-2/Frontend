//TÄNNE LISTATAAN HAKUTULOKSET TYÖPAIKOISTA
// NÄKYMÄSSÄ TÄLLÄ HETKELLÄ KAIKKI JOBS.JSONISSA OLEVAT TYÖPAIKKATIEDOT
// EI YHDISTETTY HOME KOPMPONENTTIIN
import { Text, View, StyleSheet } from 'react-native';
import Data from './jobs.json'

export default function Results() {
    return (
        <View style={styles.container}>
            <Text>Results: </Text>
            {
                Data && Data.map((item) => {
                    return (
                        <View style={styles.info} key={item.id}>
                            <Text>{item.company}</Text>
                            {item && item.content.map(data => {
                                return (
                                    <View key={item.id}>
                                        <Text>{data.header}</Text>
                                        <Text>{data.url}</Text>
                                    </View>
                                )
                            })
                            }

                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
    },
    info: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});