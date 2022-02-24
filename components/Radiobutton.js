//TÄNNE RADIOBUTTONIN MUOTOILUT
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';

// PROPSINA HOME KOMPONENTISTA DATA ARRAYN VAIHTOEHDOT JA ONSELECT JO KÄYTTÄJÄ TEKEE VALINNAN
export default function Radiobutton({ data, onSelect }) {
    const [userOption, setUserOption] = useState(null);

    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    };
    return (
        <View>
            {data.map((item) => {
                return (
                    // PRESSABLE KOMPONENTTI NÄYTTÄÄ SEN VALINTAPAINIKKEEN SISÄLLÖN, MITÄ KÄYTTÄJÄ PAINAA
                    <Pressable
                        // We are first checking whether the user has clicked on a particular element.
                        // If this condition is met, React Native will use the selected style.
                        //Otherwise, the unselected style will be applied
                        style={
                            item.value === userOption ? styles.selected : styles.unselected
                        }
                        onPress={() => selectHandler(item.value)}>
                        <Text style={styles.option}> {item.value}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}