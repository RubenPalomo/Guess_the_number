import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { PlaySound } from "./PlaySound";

interface propsAppButton {
    text: string;
    function: () => void;
}

export default function AppButton(props: propsAppButton) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                onPress={props.function}
                onPressIn={() => {
                    PlaySound(require("../assets/sounds/press-in.mp3"), false);
                }}
                android_ripple={{ color: "grey" }}
            >
                <Text style={styles.buttonText}>{props.text}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: "center",
        alignContent: "center",
        margin: 1,
        overflow: "hidden",
        borderRadius: 15,
    },
    buttonText: {
        color: "gold",
        fontSize: 50,
        borderWidth: 3,
        borderColor: "gold",
        borderRadius: 15,
        textAlign: "center",
        textAlignVertical: "center",
    },
});
