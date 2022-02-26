// TÄNNE RAKENNETAAN ALUSTAVA NÄKYMÄ, JOSSA TEHDÄÄN VALINNAT
import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import Radiobutton from './Radiobutton';

export default function Home() {
    const [option, setOption] = useState(null);

    // TÄHÄN DATAAN TULISI TYÖPAIKAN TIEDOT: HEADER, COMPANY,URL
    const data = [
        { value: 'Siili Solutions' },
        { value: 'Tietoevry' },
        { value: 'Reaktor' },
    ];

    return (

        <View>
            <Text style={styles.paragraph}>Choose your favorite company: </Text>
            <Radiobutton data={data} onSelect={(value) => setOption(value)} />
            {/* //TÄTÄ SEURAAVAA EI EHKÄ TARVIS TÄSSÄ, KERTOO PAINALLUKSEN TULOKSEN */}
            <Text> Your option: {option}</Text>

            {/* // TÄHÄN TULIS SUBMIT JOKA NAVIGOISI RESULTS KOMPONENTTIIN JOSSA NÄKYISI HAKUTULOKSET */}

        </View>

    );
}
const styles = StyleSheet.create({
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});