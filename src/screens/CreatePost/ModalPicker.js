import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import styles from "./styles";

const OPTIONS  = ['Everyone', 'Only Me', 'Friends']
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = (props) => {
    const onPressItem = (option) => {
        console.log("Option Pressed")
        props.changeModalVisibility(false);
        props.setData(option)
    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => onPressItem(item)}>
                    <Text style={styles.optionsText}>
                        {item}
                    </Text>

            </TouchableOpacity>
        )
    })
    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.modalContainer}
            >
                <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT/3}]}>
                    <ScrollView>
                        {option}
                    </ScrollView>
                </View>

        </TouchableOpacity>
    )
}



export {ModalPicker}