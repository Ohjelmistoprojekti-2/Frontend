
import { View } from "react-native";
import * as Colorthemes from "./styles";

const colorthemes = Colorthemes.colorthemes;

export default function RenderItem({ item }) {


    return (

        <View style={colorthemes.resultStyles.items}>
            <Text style={colorthemes.resultStyles.job}>
                {item._values.header}
            </Text>
            <Text style={colorthemes.resultStyles.coname}>
                {item._values.company}
            </Text>
            <TouchableOpacity
                styles={colorthemes.resultStyles.button}
                onPress={() => Linking.openURL(`${item._values.url}`)}>
                <Text
                    style={colorthemes.resultStyles.buttonText}
                >See more
                </Text>
            </TouchableOpacity>
        </View>

    )
}